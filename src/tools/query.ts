import { z } from 'zod';
import { PostHogClient } from '../client/posthog-client';

export const queryHogqlSchema = z.object({
  query: z.string().describe('HogQL query to execute'),
  variables: z.record(z.any()).optional().describe('Query variables'),
  limit: z.number().min(1).max(10000).default(100).describe('Maximum number of results'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const queryExportSchema = z.object({
  query: z.string().describe('Query to export'),
  format: z.enum(['csv', 'json']).default('json').describe('Export format'),
  date_range: z.object({
    date_from: z.string().optional(),
    date_to: z.string().optional()
  }).optional().describe('Date range for the export'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export function registerQueryTools(client: PostHogClient) {
  return {
    query_hogql: {
      description: 'Execute HogQL queries directly',
      inputSchema: queryHogqlSchema,
      handler: async (input: z.infer<typeof queryHogqlSchema>) => {
        const result = await client.executeHogQL(
          input.query,
          input.variables,
          input.limit,
          input.project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(result, null, 2)
          }]
        };
      }
    },

    query_export: {
      description: 'Export query results in various formats',
      inputSchema: queryExportSchema,
      handler: async (input: z.infer<typeof queryExportSchema>) => {
        // Execute the query first
        const result = await client.executeHogQL(
          input.query,
          undefined,
          10000, // Higher limit for exports
          input.project_id
        );

        // Format the results based on requested format
        if (input.format === 'csv') {
          // Convert to CSV format
          if (result.columns && result.results) {
            const csv = [
              result.columns.join(','),
              ...result.results.map((row: any[]) => 
                row.map(cell => 
                  typeof cell === 'string' && cell.includes(',') 
                    ? `"${cell.replace(/"/g, '""')}"` 
                    : cell
                ).join(',')
              )
            ].join('\n');
            
            return {
              content: [{
                type: 'text' as const,
                text: csv
              }]
            };
          }
        }
        
        // Default to JSON format
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