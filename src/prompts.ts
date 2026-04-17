import { z } from 'zod/v3';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const daysArg = { days: z.string().optional().describe('Lookback window (e.g. 7, 30, 90). Default 7') };

export function registerPrompts(server: McpServer): void {
  server.registerPrompt(
    'hogql_top_events',
    {
      title: 'Top events (HogQL)',
      description: 'HogQL query template: top events in the last N days',
      argsSchema: daysArg,
    },
    ({ days }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text:
              `Run this HogQL via query_hogql:\n\n` +
              `SELECT event, count() AS cnt\n` +
              `FROM events\n` +
              `WHERE timestamp > now() - interval ${days ?? '7'} day\n` +
              `GROUP BY event\n` +
              `ORDER BY cnt DESC\n` +
              `LIMIT 20`,
          },
        },
      ],
    }),
  );

  server.registerPrompt(
    'hogql_daily_active_users',
    {
      title: 'Daily active users (HogQL)',
      description: 'HogQL query template: daily active users over the last N days',
      argsSchema: daysArg,
    },
    ({ days }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text:
              `Run this HogQL via query_hogql:\n\n` +
              `SELECT toDate(timestamp) AS day, uniq(distinct_id) AS dau\n` +
              `FROM events\n` +
              `WHERE timestamp > now() - interval ${days ?? '7'} day\n` +
              `GROUP BY day\n` +
              `ORDER BY day`,
          },
        },
      ],
    }),
  );

  server.registerPrompt(
    'hogql_funnel_template',
    {
      title: 'Funnel template (HogQL)',
      description: 'HogQL query template: simple 3-step conversion funnel',
      argsSchema: {
        step1_event: z.string().describe('Event name for step 1'),
        step2_event: z.string().describe('Event name for step 2'),
        step3_event: z.string().describe('Event name for step 3'),
        days: z.string().optional().describe('Lookback window in days (default 30)'),
      },
    },
    ({ step1_event, step2_event, step3_event, days }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text:
              `Run this HogQL via query_hogql:\n\n` +
              `SELECT\n` +
              `  count() FILTER (WHERE event = '${step1_event}') AS step1,\n` +
              `  count() FILTER (WHERE event = '${step2_event}') AS step2,\n` +
              `  count() FILTER (WHERE event = '${step3_event}') AS step3\n` +
              `FROM events\n` +
              `WHERE timestamp > now() - interval ${days ?? '30'} day\n` +
              `  AND event IN ('${step1_event}', '${step2_event}', '${step3_event}')`,
          },
        },
      ],
    }),
  );
}
