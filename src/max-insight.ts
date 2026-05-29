/**
 * Parsing for PostHog's max_tools/create_and_query_insight endpoint ("Max AI").
 *
 * The endpoint takes a plain-English question and returns a stream of messages:
 * an `ai/viz` message carrying the generated, runnable query (in `data.answer`),
 * an `ai/artifact`, and a `tool` message with a human-readable answer that
 * includes the computed data. We drop ack noise and surface just the runnable
 * query plus the summary so callers don't have to author HogQL by hand.
 */

export interface MaxInsightResult {
  /** The generated, runnable PostHog query object (TrendsQuery / HogQLQuery / …), if present. */
  generatedQuery: unknown;
  /** Human-readable answer including the computed results, if present. */
  summary: string;
  /** Number of non-ack messages returned. */
  messageCount: number;
}

function isAckMessage(m: unknown): boolean {
  const data = (m as { type?: string; data?: { type?: string } })?.data;
  return (m as { type?: string })?.type === 'message' && data?.type === 'ack';
}

export function extractMaxInsight(messages: unknown): MaxInsightResult {
  const arr = (Array.isArray(messages) ? messages : []).filter((m) => !isAckMessage(m));

  let generatedQuery: unknown;
  let summary = '';
  for (const m of arr) {
    const data = (m as { data?: { type?: string; answer?: unknown; content?: unknown } })?.data;
    if (!data) continue;
    if (generatedQuery === undefined && data.answer !== undefined) generatedQuery = data.answer;
    if (typeof data.content === 'string' && (data.type === 'tool' || !summary)) summary = data.content;
  }

  return { generatedQuery, summary, messageCount: arr.length };
}
