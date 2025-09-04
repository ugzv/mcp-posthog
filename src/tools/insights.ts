import { z } from 'zod';
import { PostHogClient } from '../client/posthog-client';
import { RefreshMode } from '../types/posthog';

export const insightsCreateSchema = z.object({
  name: z.string().describe('Name of the insight'),
  description: z.string().optional().describe('Description of the insight'),
  query: z.object({
    kind: z.enum(['TrendsQuery', 'FunnelsQuery', 'RetentionQuery', 'PathsQuery', 'LifecycleQuery', 'StickinessQuery', 'InsightVizNode']).optional(),
    source: z.any().optional(),
    dateRange: z.object({
      date_from: z.string().optional(),
      date_to: z.string().optional()
    }).optional()
  }).optional().describe('PostHog query object structure'),
  events: z.array(z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    order: z.number().optional(),
    math: z.enum(['total', 'dau', 'weekly_active', 'monthly_active', 'unique_group', 'unique_session', 'sum', 'min', 'max', 'avg', 'median']).optional()
  })).optional().describe('Events to analyze'),
  filters: z.record(z.any()).optional().describe('Additional filters (legacy format)'),
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

export const insightsCreateSimpleSchema = z.object({
  name: z.string().describe('Name of the insight'),
  description: z.string().optional().describe('Description of the insight'),
  insight_type: z.enum(['trends', 'funnel', 'retention', 'paths', 'lifecycle', 'stickiness']).default('trends').describe('Type of insight'),
  event: z.string().default('$pageview').describe('Event to track (e.g., "$pageview", "signup", "purchase")'),
  math: z.enum(['total', 'dau', 'weekly_active', 'monthly_active', 'unique_group', 'unique_session', 'sum', 'min', 'max', 'avg', 'median']).default('total').describe('Aggregation method'),
  date_from: z.string().optional().describe('Start date (e.g., "-7d", "-30d", "2024-01-01")'),
  date_to: z.string().optional().describe('End date (e.g., "0d" for today, "2024-01-31")'),
  breakdown_by: z.string().optional().describe('Property to breakdown by (e.g., "$browser", "$os")'),
  dashboards: z.array(z.number()).optional().describe('Dashboard IDs to add insight to'),
  tags: z.array(z.string()).optional().describe('Tags for the insight'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export function registerInsightsTools(client: PostHogClient) {
  return {
    insights_create: {
      description: 'Create a new analytics insight',
      inputSchema: insightsCreateSchema,
      handler: async (input: z.infer<typeof insightsCreateSchema>) => {
        const { project_id, query, events, filters, ...params } = input;
        
        // Build the insight params based on input
        const insightParams: any = {
          name: params.name,
          description: params.description,
          dashboards: params.dashboards,
          tags: params.tags
        };

        // If a query object is provided, use it directly
        if (query) {
          // Build a proper InsightVizNode query structure
          insightParams.query = {
            kind: 'InsightVizNode',
            source: query.source || {
              kind: query.kind || 'TrendsQuery',
              series: events?.map(event => ({
                kind: 'EventsNode',
                event: event.id || event.name || '$pageview',
                name: event.name,
                math: event.math || 'total'
              })) || [{
                kind: 'EventsNode',
                event: '$pageview',
                math: 'total'
              }],
              dateRange: query.dateRange
            }
          };
        } 
        // Otherwise, use the legacy filters format if provided
        else if (filters || events) {
          insightParams.filters = {
            ...filters,
            events: events?.map(event => ({
              id: event.id || event.name,
              name: event.name,
              order: event.order || 0,
              math: event.math || 'total'
            }))
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
    },

    insights_create_simple: {
      description: 'Create a new insight with simplified parameters',
      inputSchema: insightsCreateSimpleSchema,
      handler: async (input: z.infer<typeof insightsCreateSimpleSchema>) => {
        const { 
          project_id, 
          insight_type, 
          event, 
          math,
          date_from,
          date_to,
          breakdown_by,
          ...params 
        } = input;
        
        // Map insight types to PostHog query kinds
        const queryKindMap: Record<string, string> = {
          'trends': 'TrendsQuery',
          'funnel': 'FunnelsQuery',
          'retention': 'RetentionQuery',
          'paths': 'PathsQuery',
          'lifecycle': 'LifecycleQuery',
          'stickiness': 'StickinessQuery'
        };

        // Build the insight params with proper query structure
        const insightParams: any = {
          name: params.name,
          description: params.description,
          dashboards: params.dashboards,
          tags: params.tags,
          query: {
            kind: 'InsightVizNode',
            source: {
              kind: queryKindMap[insight_type] || 'TrendsQuery',
              series: [{
                kind: 'EventsNode',
                event: event,
                math: math
              }],
              dateRange: {
                date_from: date_from,
                date_to: date_to
              }
            }
          }
        };

        // Add breakdown if specified
        if (breakdown_by) {
          insightParams.query.source.breakdownFilter = {
            breakdown: breakdown_by,
            breakdown_type: 'event'
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
    }
  };
}