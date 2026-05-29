import { extractMaxInsight } from '../src/max-insight';

describe('extractMaxInsight', () => {
  const sample = [
    { type: 'message', data: { type: 'ack' } },
    { type: 'message', data: { type: 'ai/viz', answer: { kind: 'TrendsQuery', series: [] }, query: 'q' } },
    { type: 'message', data: { type: 'ai/artifact', content: 'artifact' } },
    { type: 'message', data: { type: 'tool', content: 'Top events: $pageview (895277)' } },
  ];

  it('drops ack messages from the count', () => {
    expect(extractMaxInsight(sample).messageCount).toBe(3);
  });

  it('extracts the generated runnable query from ai/viz', () => {
    expect(extractMaxInsight(sample).generatedQuery).toEqual({ kind: 'TrendsQuery', series: [] });
  });

  it('prefers the tool message content as the summary', () => {
    expect(extractMaxInsight(sample).summary).toBe('Top events: $pageview (895277)');
  });

  it('is resilient to non-array / empty input', () => {
    expect(extractMaxInsight(undefined)).toEqual({ generatedQuery: undefined, summary: '', messageCount: 0 });
    expect(extractMaxInsight([])).toEqual({ generatedQuery: undefined, summary: '', messageCount: 0 });
  });
});
