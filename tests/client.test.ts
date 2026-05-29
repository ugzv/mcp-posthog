import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PostHogClient, PostHogAPIError, computeRetryDelay } from '../src/client/posthog-client';

describe('PostHogClient', () => {
  let client: PostHogClient;
  let mock: MockAdapter;

  beforeEach(() => {
    client = new PostHogClient({
      host: 'https://test.posthog.com',
      apiKey: 'phx_test',
      projectId: '42',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mock = new MockAdapter((client as any).client);
  });

  afterEach(() => mock.restore());

  it('getBaseUrl strips trailing slash', () => {
    const c = new PostHogClient({ host: 'https://x.posthog.com/', apiKey: 'phx_a' });
    expect(c.getBaseUrl()).toBe('https://x.posthog.com');
  });

  it('listInsights calls project-scoped URL', async () => {
    mock.onGet('/api/projects/42/insights/').reply(200, { count: 0, results: [] });
    const result = await client.listInsights(10, 0);
    expect(result.results).toEqual([]);
    expect(mock.history.get[0].params).toMatchObject({ limit: 10, offset: 0 });
  });

  it('getProject hits /api/projects/:id/', async () => {
    mock.onGet('/api/projects/99/').reply(200, { id: 99, name: 'X', organization: 'o', created_at: '', updated_at: '' });
    const p = await client.getProject('99');
    expect(p.id).toBe(99);
  });

  it('translates API errors into PostHogAPIError with status', async () => {
    mock.onGet('/api/projects/42/insights/123/').reply(404, { detail: 'not found' });
    await expect(client.getInsight('123')).rejects.toThrow(PostHogAPIError);
    await expect(client.getInsight('123')).rejects.toThrow(/HTTP 404/);
  });

  it('retries on 429 then succeeds', async () => {
    let calls = 0;
    mock.onGet('/api/projects/42/').reply(() => {
      calls += 1;
      if (calls === 1) return [429, { detail: 'rate limit' }, { 'retry-after': '0' }];
      return [200, { id: 42, name: 'ok', organization: 'o', created_at: '', updated_at: '' }];
    });
    const p = await client.getProject('42');
    expect(calls).toBe(2);
    expect(p.name).toBe('ok');
  });

  it('throws PostHogAPIError if projectId missing for project-scoped endpoint', async () => {
    const noProj = new PostHogClient({ host: 'https://x.posthog.com', apiKey: 'phx_a' });
    await expect(noProj.listInsights()).rejects.toThrow(/Project ID is required/);
  });

  it('captureEvent requires project API key', async () => {
    await expect(
      client.captureEvent({ event: 'x', distinct_id: 'u' }),
    ).rejects.toThrow(/project API key/);
  });

  it('executeHogQL adds LIMIT if missing', async () => {
    mock.onPost('/api/projects/42/query/').reply((config) => {
      const body = JSON.parse(config.data);
      expect(body.query.query).toMatch(/LIMIT 50$/);
      return [200, { results: [] }];
    });
    await client.executeHogQL('SELECT event FROM events', undefined, 50);
  });

  it('executeHogQL keeps existing LIMIT', async () => {
    mock.onPost('/api/projects/42/query/').reply((config) => {
      const body = JSON.parse(config.data);
      expect(body.query.query).toBe('SELECT event FROM events LIMIT 5');
      return [200, { results: [] }];
    });
    await client.executeHogQL('SELECT event FROM events LIMIT 5', undefined, 50);
  });

  it('executeHogQL binds variables inside query.values (NOT top-level)', async () => {
    mock.onPost('/api/projects/42/query/').reply((config) => {
      const body = JSON.parse(config.data);
      expect(body).not.toHaveProperty('values');
      expect(body).not.toHaveProperty('variables');
      expect(body.query.values).toEqual({ date_from: '2025-04-01' });
      expect(body.query.query).toMatch(/\{date_from\}/);
      return [200, { results: [] }];
    });
    await client.executeHogQL(
      'SELECT count() FROM events WHERE timestamp >= {date_from}',
      { date_from: '2025-04-01' },
      50,
    );
  });

  it('executeHogQL omits values when variables is empty', async () => {
    mock.onPost('/api/projects/42/query/').reply((config) => {
      const body = JSON.parse(config.data);
      expect(body.query).not.toHaveProperty('values');
      return [200, { results: [] }];
    });
    await client.executeHogQL('SELECT 1 LIMIT 1', {}, 50);
  });

  it('appends a HogQL fix hint to recognized query errors', async () => {
    mock.onPost('/api/projects/42/query/').reply(400, {
      detail: 'Unable to resolve field: min_timestamp. Did you mean: timestamp?',
    });
    await expect(client.executeHogQL('SELECT min_timestamp FROM events', undefined, 50)).rejects.toThrow(
      /Hint:.*min\(timestamp\)/s,
    );
  });

  it('leaves unrecognized query errors unhinted', async () => {
    mock.onPost('/api/projects/42/query/').reply(500, { detail: 'internal server error' });
    await expect(client.queryEvents({ query: 'SELECT 1', limit: 1 })).rejects.not.toThrow(/Hint:/);
  });
});

describe('computeRetryDelay', () => {
  it('uses exponential backoff when no Retry-After', () => {
    expect(computeRetryDelay(undefined, 1)).toBe(500);
    expect(computeRetryDelay(undefined, 2)).toBe(1000);
    expect(computeRetryDelay(undefined, 3)).toBe(2000);
  });

  it('honors Retry-After in seconds (RFC 7231 delta-seconds)', () => {
    expect(computeRetryDelay('3', 1)).toBe(3000);
    expect(computeRetryDelay('0', 1)).toBe(0);
  });

  it('honors Retry-After as HTTP-date', () => {
    const now = Date.UTC(2025, 0, 1, 12, 0, 0);
    const inFiveSec = new Date(now + 5000).toUTCString();
    expect(computeRetryDelay(inFiveSec, 1, now)).toBe(5000);
  });

  it('clamps past HTTP-date to 0', () => {
    const now = Date.UTC(2025, 0, 1, 12, 0, 0);
    const pastDate = new Date(now - 60_000).toUTCString();
    expect(computeRetryDelay(pastDate, 1, now)).toBe(0);
  });

  it('falls back to backoff on unparseable Retry-After', () => {
    expect(computeRetryDelay('soon-please', 2)).toBe(1000);
  });
});
