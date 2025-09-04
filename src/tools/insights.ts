import { z } from 'zod';
import { PostHogClient } from '../client/posthog-client';
import { RefreshMode } from '../types/posthog';

export const insightsCreateSchema = z.object({
  name: z.string().describe('Name of the insight'),
  description: z.string().optional().describe('Description of the insight'),
  query_type: z.enum(['trends', 'funnel', 'retention', 'paths', 'lifecycle', 'stickiness']).optional().describe('Type of query'),
  filters: z.record(z.any()).optional().describe('Query filters'),
  date_range: z.object({
    date_from: z.string().optional(),
    date_to: z.string().optional()
  }).optional().describe('Date range for the query'),
  dashboards: z.array(z.number()).optional().describe('Dashboard IDs to add insight to'),
  tags: z.array(z.string()).optional().describe('Tags for the insight'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const insightsRetrieveSchema = z.object({
  insight_id: z.string().describe('Insight ID or short ID'),
  refresh_mode: z.enum(['force_cache', 'blocking', 'async', 'force_blocking', 'force_async']).optional().describe('How to refresh the data'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const insightsListSchema = z.object({
  limit: z.number().min(1).max(1000).default(100).describe('Maximum number of results'),
  offset: z.number().min(0).default(0).describe('Number of results to skip'),
  search: z.string().optional().describe('Search term'),
  dashboard_id: z.number().optional().describe('Filter by dashboard ID'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const insightsUpdateSchema = z.object({
  insight_id: z.string().describe('Insight ID to update'),
  name: z.string().optional().describe('New name'),
  description: z.string().optional().describe('New description'),
  query: z.record(z.any()).optional().describe('Updated query'),
  filters: z.record(z.any()).optional().describe('Updated filters'),
  tags: z.array(z.string()).optional().describe('Updated tags'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export function registerInsightsTools(client: PostHogClient) {
  return {
    insights_create: {
      description: 'Create a new analytics insight',
      inputSchema: insightsCreateSchema,
      handler: async (input: z.infer<typeof insightsCreateSchema>) => {
        const { project_id, date_range, query_type, ...params } = input;
        
        // Build query or filters based on input
        const insightParams: any = {
          name: params.name,
          description: params.description,
          dashboards: params.dashboards,
          tags: params.tags
        };

        if (query_type || date_range || params.filters) {
          insightParams.filters = {
            ...params.filters,
            insight: query_type,
            date_from: date_range?.date_from,
            date_to: date_range?.date_to
          };
        }

        const insight = await client.createInsight(insightParams, project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(insight, null, 2)
          }]
        };
      }
    },

    insights_retrieve: {
      description: 'Retrieve an existing insight or execute a query',
      inputSchema: insightsRetrieveSchema,
      handler: async (input: z.infer<typeof insightsRetrieveSchema>) => {
        const refreshMode = input.refresh_mode as RefreshMode | undefined;
        const insight = await client.getInsight(input.insight_id, refreshMode, input.project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(insight, null, 2)
          }]
        };
      }
    },

    insights_list: {
      description: 'List available insights',
      inputSchema: insightsListSchema,
      handler: async (input: z.infer<typeof insightsListSchema>) => {
        const insights = await client.listInsights(
          input.limit,
          input.offset,
          input.search,
          input.dashboard_id,
          input.project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(insights, null, 2)
          }]
        };
      }
    },

    insights_update: {
      description: 'Update an existing insight',
      inputSchema: insightsUpdateSchema,
      handler: async (input: z.infer<typeof insightsUpdateSchema>) => {
        const { insight_id, project_id, ...updates } = input;
        const insight = await client.updateInsight(insight_id, updates, project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(insight, null, 2)
          }]
        };
      }
    }
  };
}