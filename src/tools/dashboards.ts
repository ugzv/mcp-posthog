import { z } from 'zod/v3';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PostHogClient } from '../client/posthog-client';
import { readOnly, create, update, destroy, textResult } from './_helpers';

export const dashboardsListSchema = z.object({
  limit: z.number().min(1).max(1000).default(100),
  offset: z.number().min(0).default(0),
  search: z.string().optional(),
  pinned_only: z.boolean().default(false),
  project_id: z.string().optional(),
});

export const dashboardsGetSchema = z.object({
  dashboard_id: z.string(),
  project_id: z.string().optional(),
});

export const dashboardsCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  tiles: z.array(z.any()).optional(),
  filters: z.record(z.any()).optional(),
  variables: z.record(z.any()).optional(),
  tags: z.array(z.string()).optional(),
  project_id: z.string().optional(),
});

export const dashboardsUpdateSchema = z.object({
  dashboard_id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  tiles: z.array(z.any()).optional(),
  filters: z.record(z.any()).optional(),
  variables: z.record(z.any()).optional(),
  tags: z.array(z.string()).optional(),
  project_id: z.string().optional(),
});

export const dashboardsDeleteSchema = z.object({
  dashboard_id: z.string(),
  project_id: z.string().optional(),
});

export function registerDashboardsTools(server: McpServer, client: PostHogClient): void {
  server.registerTool(
    'dashboards_list',
    {
      title: 'List dashboards',
      description: 'List dashboards with optional search and pinned filter',
      inputSchema: dashboardsListSchema.shape,
      annotations: readOnly,
    },
    async (input) => {
      const dashboards = await client.listDashboards(input.limit, input.offset, input.search, input.pinned_only, input.project_id);
      return textResult(dashboards);
    },
  );

  server.registerTool(
    'dashboards_get',
    {
      title: 'Get dashboard',
      description: 'Get dashboard with all tiles/insights',
      inputSchema: dashboardsGetSchema.shape,
      annotations: readOnly,
    },
    async (input) => {
      const dashboard = await client.getDashboard(input.dashboard_id, input.project_id);
      return textResult(dashboard);
    },
  );

  server.registerTool(
    'dashboards_create',
    {
      title: 'Create dashboard',
      description: 'Create a new dashboard',
      inputSchema: dashboardsCreateSchema.shape,
      annotations: create,
    },
    async (input) => {
      const { project_id, ...params } = input;
      const dashboard = await client.createDashboard(params, project_id);
      return textResult(dashboard);
    },
  );

  server.registerTool(
    'dashboards_update',
    {
      title: 'Update dashboard',
      description: 'Update dashboard configuration',
      inputSchema: dashboardsUpdateSchema.shape,
      annotations: update,
    },
    async (input) => {
      const { dashboard_id, project_id, ...updates } = input;
      const dashboard = await client.updateDashboard(dashboard_id, updates, project_id);
      return textResult(dashboard);
    },
  );

  server.registerTool(
    'dashboards_delete',
    {
      title: 'Delete dashboard',
      description: 'Delete a dashboard',
      inputSchema: dashboardsDeleteSchema.shape,
      annotations: destroy,
    },
    async (input) => {
      await client.deleteDashboard(input.dashboard_id, input.project_id);
      return textResult(`Dashboard ${input.dashboard_id} deleted`);
    },
  );
}
