import { buildInsightQuery } from '../src/tools/insights';

describe('buildInsightQuery', () => {
  it('wraps raw_query in InsightVizNode', () => {
    const q = buildInsightQuery({ raw_query: { kind: 'TrendsQuery', series: [{ kind: 'EventsNode', event: '$pageview' }] } });
    expect(q).toEqual({
      kind: 'InsightVizNode',
      source: { kind: 'TrendsQuery', series: [{ kind: 'EventsNode', event: '$pageview' }] },
    });
  });

  it('preserves legacy query when already an InsightVizNode', () => {
    const full = { kind: 'InsightVizNode', source: { kind: 'TrendsQuery', series: [] } };
    expect(buildInsightQuery({ query: full })).toBe(full);
  });

  it('wraps legacy query.source when present', () => {
    const q = buildInsightQuery({ query: { source: { kind: 'FunnelsQuery', series: [] } } });
    expect(q.source).toEqual({ kind: 'FunnelsQuery', series: [] });
  });

  it('wraps a bare legacy query node as source', () => {
    const q = buildInsightQuery({ query: { kind: 'TrendsQuery', series: [] } });
    expect(q.source).toEqual({ kind: 'TrendsQuery', series: [] });
  });

  it('maps legacy events array to multi-series simple query', () => {
    const q = buildInsightQuery({ events: [{ id: '$pageview', math: 'dau' }, { name: 'signup' }] });
    expect((q.source as { series: unknown[] }).series).toEqual([
      { kind: 'EventsNode', event: '$pageview', math: 'dau' },
      { kind: 'EventsNode', event: 'signup', math: 'total' },
    ]);
  });

  it('simple path defaults to pageview trends', () => {
    const q = buildInsightQuery({});
    expect(q.source).toMatchObject({
      kind: 'TrendsQuery',
      series: [{ kind: 'EventsNode', event: '$pageview', math: 'total' }],
    });
  });

  it('simple path honors insight_type + event + math + date_range + breakdown', () => {
    const q = buildInsightQuery({
      insight_type: 'funnel',
      event: 'signup',
      math: 'unique_session',
      date_from: '-30d',
      date_to: '0d',
      breakdown_by: '$browser',
    });
    expect(q.source).toMatchObject({
      kind: 'FunnelsQuery',
      series: [{ kind: 'EventsNode', event: 'signup', math: 'unique_session' }],
      dateRange: { date_from: '-30d', date_to: '0d' },
      breakdownFilter: { breakdown: '$browser', breakdown_type: 'event' },
    });
  });

  it('raw_query wins over legacy query', () => {
    const q = buildInsightQuery({
      raw_query: { kind: 'A' },
      query: { kind: 'B' },
    });
    expect(q.source).toEqual({ kind: 'A' });
  });

  it('legacy query wins over simple path', () => {
    const q = buildInsightQuery({
      query: { kind: 'FunnelsQuery', series: [] },
      insight_type: 'trends',
      event: '$pageview',
    });
    expect(q.source).toEqual({ kind: 'FunnelsQuery', series: [] });
  });
});
