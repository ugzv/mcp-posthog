jest.mock('dotenv', () => ({ config: () => ({ parsed: {} }) }));
import { isPersonalApiKey, isProjectApiKey, loadConfig } from '../src/config';

describe('config', () => {
  it('recognizes personal vs project keys by prefix', () => {
    expect(isPersonalApiKey('phx_abc')).toBe(true);
    expect(isPersonalApiKey('phc_abc')).toBe(false);
    expect(isProjectApiKey('phc_xyz')).toBe(true);
    expect(isProjectApiKey('phx_xyz')).toBe(false);
  });

  it('loadConfig adds https:// to bare hosts', () => {
    const prev = { ...process.env };
    process.env.POSTHOG_HOST = 'eu.posthog.com';
    process.env.POSTHOG_API_KEY = 'phx_test';
    delete process.env.POSTHOG_CONFIG_PATH;
    try {
      const cfg = loadConfig();
      expect(cfg.host).toBe('https://eu.posthog.com');
    } finally {
      process.env = prev;
    }
  });

  it('loadConfig throws when host is missing', () => {
    const prev = { ...process.env };
    delete process.env.POSTHOG_HOST;
    delete process.env.POSTHOG_API_KEY;
    process.env.POSTHOG_CONFIG_PATH = '/no-such-path.json';
    try {
      expect(() => loadConfig()).toThrow(/POSTHOG_HOST is required/);
    } finally {
      process.env = prev;
    }
  });
});
