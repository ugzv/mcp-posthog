import { z } from 'zod';
import { PostHogClient } from '../client/posthog-client';

export const dashboardsListSchema = z.object({
  limit: z.number().min(1).max(1000).default(100).describe('Maximum number of results'),
  offset: z.number().min(0).default(0).describe('Number of results to skip'),
  search: z.string().optional().describe('Search term'),
  pinned_only: z.boolean().default(false).describe('Only show pinned dashboards'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const dashboardsGetSchema = z.object({
  dashboard_id: z.string().describe('Dashboard ID'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const dashboardsCreateSchema = z.object({
  name: z.string().describe('Dashboard name'),
  description: z.string().optional().describe('Dashboard description'),
  tiles: z.array(z.any()).optional().describe('Dashboard tiles configuration'),
  filters: z.record(z.any()).optional().describe('Dashboard filters'),
  variables: z.record(z.any()).optional().describe('Dashboard variables'),
  tags: z.array(z.string()).optional().describe('Dashboard tags'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const dashboardsUpdateSchema = z.object({
  dashboard_id: z.string().describe('Dashboard ID to update'),
  name: z.string().optional().describe('Updated name'),
  description: z.string().optional().describe('Updated description'),
  tiles: z.array(z.any()).optional().describe('Updated tiles configuration'),
  filters: z.record(z.any()).optional().describe('Updated filters'),
  variables: z.record(z.any()).optional().describe('Updated variables'),
  tags: z.array(z.string()).optional().describe('Updated tags'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const dashboardsDeleteSchema = z.object({
  dashboard_id: z.string().describe('Dashboard ID to delete'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export function registerDashboardsTools(client: PostHogClient) {
  return {
    dashboards_list: {
      description: 'List available dashboards',
      inputSchema: dashboardsListSchema,
      handler: async (input: z.infer<typeof dashboardsListSchema>) => {
        const dashboards = await client.listDashboards(
          input.limit,
          input.offset,
          input.search,
          input.pinned_only,
          input.project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(dashboards, null, 2)
          }]
        };
      }
    },

    dashboards_get: {
      description: 'Get dashboard with all tiles/insights',
      inputSchema: dashboardsGetSchema,
      handler: async (input: z.infer<typeof dashboardsGetSchema>) => {
        const dashboard = await client.getDashboard(input.dashboard_id, input.project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(dashboard, null, 2)
          }]
        };
      }
    },

    dashboards_create: {
      description: 'Create a new dashboard',
      inputSchema: dashboardsCreateSchema,
      handler: async (input: z.infer<typeof dashboardsCreateSchema>) => {
        const { project_id, ...params } = input;
        const dashboard = await client.createDashboard(params, project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(dashboard, null, 2)
          }]
        };
      }
    },

    dashboards_update: {
      description: 'Update dashboard configuration',
      inputSchema: dashboardsUpdateSchema,
      handler: async (input: z.infer<typeof dashboardsUpdateSchema>) => {
        const { dashboard_id, project_id, ...updates } = input;
        const dashboard = await client.updateDashboard(dashboard_id, updates, project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(dashboard, null, 2)
          }]
        };
      }
    },

    dashboards_delete: {
      description: 'Delete a dashboard',
      inputSchema: dashboardsDeleteSchema,
      handler: async (input: z.infer<typeof dashboardsDeleteSchema>) => {
        await client.deleteDashboard(input.dashboard_id, input.project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: `Dashboard ${input.dashboard_id} deleted successfully`
          }]
        };
      }
    }
  };
}