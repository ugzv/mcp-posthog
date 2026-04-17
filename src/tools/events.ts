import { z } from 'zod/v3';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PostHogClient } from '../client/posthog-client';
import { readOnly, create, textResult } from './_helpers';

export const eventsCaptureSchema = z.object({
  event_name: z.string().describe('Event name'),
  distinct_id: z.string().describe('User distinct ID'),
  properties: z.record(z.any()).optional(),
  timestamp: z.string().optional().describe('ISO 8601 timestamp'),
});

export const eventsQuerySchema = z.object({
  query: z.string().describe('HogQL query'),
  date_range: z.object({
    date_from: z.string().optional(),
    date_to: z.string().optional(),
  }).optional().describe('Injected as timestamp filter'),
  limit: z.number().min(1).max(10000).default(100),
  variables: z.record(z.any()).optional(),
  project_id: z.string().optional(),
});

export function registerEventsTools(server: McpServer, client: PostHogClient): void {
  server.registerTool(
    'events_capture',
    {
      title: 'Capture event',
      description: 'Send a custom event to PostHog (requires project API key)',
      inputSchema: eventsCaptureSchema.shape,
      annotations: create,
    },
    async (input) => {
      await client.captureEvent({
        event: input.event_name,
        distinct_id: input.distinct_id,
        properties: input.properties,
        timestamp: input.timestamp,
      });
      return textResult(`Event "${input.event_name}" captured for ${input.distinct_id}`);
    },
  );

  server.registerTool(
    'events_query',
    {
      title: 'Query events (HogQL)',
      description: 'Run a HogQL query with optional date_range injected as a timestamp filter',
      inputSchema: eventsQuerySchema.shape,
      annotations: readOnly,
    },
    async (input) => {
      let query = input.query;
      const variables = { ...(input.variables ?? {}) };

      if (input.date_range) {
        const conditions: string[] = [];
        if (input.date_range.date_from) {
          conditions.push('timestamp >= {date_from:DateTime}');
          variables.date_from = input.date_range.date_from;
        }
        if (input.date_range.date_to) {
          conditions.push('timestamp <= {date_to:DateTime}');
          variables.date_to = input.date_range.date_to;
        }

        if (conditions.length > 0) {
          if (/where/i.test(query)) {
            query = query.replace(/where/i, `WHERE (${conditions.join(' AND ')}) AND `);
          } else {
            const fromMatch = query.match(/from\s+\S+/i);
            if (fromMatch) {
              const idx = query.toLowerCase().lastIndexOf(fromMatch[0].toLowerCase());
              query = `${query.slice(0, idx + fromMatch[0].length)} WHERE ${conditions.join(' AND ')}${query.slice(idx + fromMatch[0].length)}`;
            }
          }
        }
      }

      const result = await client.queryEvents({ query, variables, limit: input.limit }, input.project_id);
      return textResult(result);
    },
  );
}
