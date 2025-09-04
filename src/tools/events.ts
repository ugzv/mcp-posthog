import { z } from 'zod';
import { PostHogClient } from '../client/posthog-client';

export const eventsCaptureSchema = z.object({
  event_name: z.string().describe('Name of the event'),
  distinct_id: z.string().describe('User distinct ID'),
  properties: z.record(z.any()).optional().describe('Event properties'),
  timestamp: z.string().optional().describe('Event timestamp (ISO 8601 format)'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const eventsQuerySchema = z.object({
  query: z.string().describe('HogQL query to execute'),
  date_range: z.object({
    date_from: z.string().optional(),
    date_to: z.string().optional()
  }).optional().describe('Date range for the query'),
  limit: z.number().min(1).max(10000).default(100).describe('Maximum number of results'),
  variables: z.record(z.any()).optional().describe('Query variables'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export function registerEventsTools(client: PostHogClient) {
  return {
    events_capture: {
      description: 'Send custom events to PostHog',
      inputSchema: eventsCaptureSchema,
      handler: async (input: z.infer<typeof eventsCaptureSchema>) => {
        await client.captureEvent({
          event: input.event_name,
          distinct_id: input.distinct_id,
          properties: input.properties,
          timestamp: input.timestamp
        }, input.project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: `Event "${input.event_name}" captured successfully for user ${input.distinct_id}`
          }]
        };
      }
    },

    events_query: {
      description: 'Query events using PostHog Query Language (HogQL)',
      inputSchema: eventsQuerySchema,
      handler: async (input: z.infer<typeof eventsQuerySchema>) => {
        let query = input.query;
        
        // Add date range to query if provided
        if (input.date_range) {
          const conditions = [];
          if (input.date_range.date_from) {
            conditions.push(`timestamp >= '${input.date_range.date_from}'`);
          }
          if (input.date_range.date_to) {
            conditions.push(`timestamp <= '${input.date_range.date_to}'`);
          }
          
          if (conditions.length > 0) {
            // If the query already has a WHERE clause, add to it
            if (query.toLowerCase().includes('where')) {
              query = query.replace(/where/i, `WHERE (${conditions.join(' AND ')}) AND `);
            } else if (query.toLowerCase().includes('from')) {
              // Add WHERE clause after FROM
              const fromIndex = query.toLowerCase().lastIndexOf('from');
              const afterFrom = query.substring(fromIndex);
              const beforeFrom = query.substring(0, fromIndex);
              const fromMatch = afterFrom.match(/from\s+(\S+)/i);
              if (fromMatch) {
                const tableName = fromMatch[1];
                query = `${beforeFrom}FROM ${tableName} WHERE ${conditions.join(' AND ')} ${afterFrom.substring(fromMatch[0].length)}`;
              }
            }
          }
        }

        const result = await client.queryEvents({
          query,
          variables: input.variables,
          limit: input.limit
        }, input.project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(result, null, 2)
          }]
        };
      }
    }
  };
}