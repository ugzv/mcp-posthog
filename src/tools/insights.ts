import { z } from 'zod/v3';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PostHogClient } from '../client/posthog-client';
import { RefreshMode } from '../types/posthog';
import { readOnly, create, update, destroy, textResult } from './_helpers';

const insightTypeEnum = z.enum(['trends', 'funnel', 'retention', 'paths', 'lifecycle', 'stickiness']);
const mathEnum = z.enum(['total', 'dau', 'weekly_active', 'monthly_active', 'unique_group', 'unique_session', 'sum', 'min', 'max', 'avg', 'median']);
const refreshEnum = z.enum(['force_cache', 'blocking', 'async', 'force_blocking', 'force_async']);

const queryKindMap: Record<string, string> = {
  trends: 'TrendsQuery',
  funnel: 'FunnelsQuery',
  retention: 'RetentionQuery',
  paths: 'PathsQuery',
  lifecycle: 'LifecycleQuery',
  stickiness: 'StickinessQuery',
};

interface InsightBuildInput {
  raw_query?: Record<string, unknown>;
  query?: Record<string, unknown>;
  events?: Record<string, unknown>[];
  insight_type?: string;
  event?: string;
  math?: string;
  date_from?: string;
  date_to?: string;
  breakdown_by?: string;
}

/**
 * Exported for testing. Builds the PostHog insight `query` payload. Precedence:
 *   raw_query > query (legacy v1) > events[] (legacy v1) > insight_type+event simple path.
 */
export function buildInsightQuery(input: InsightBuildInput): { kind: 'InsightVizNode'; source: Record<string, unknown> } {
  if (input.raw_query) {
    return { kind: 'InsightVizNode', source: input.raw_query };
  }
  if (input.query) {
    const q = input.query;
    if (q.kind === 'InsightVizNode') return q as { kind: 'InsightVizNode'; source: Record<string, unknown> };
    if (q.source) return { kind: 'InsightVizNode', source: q.source as Record<string, unknown> };
    return { kind: 'InsightVizNode', source: q };
  }

  const series = input.events && input.events.length > 0
    ? input.events.map((e) => ({
        kind: 'EventsNode',
        event: (e.id as string | undefined) ?? (e.name as string | undefined) ?? '$pageview',
        math: (e.math as string | undefined) ?? 'total',
      }))
    : [{ kind: 'EventsNode', event: input.event ?? '$pageview', math: input.math ?? 'total' }];

  const source: Record<string, unknown> = {
    kind: queryKindMap[input.insight_type ?? 'trends'],
    series,
    dateRange: { date_from: input.date_from, date_to: input.date_to },
  };
  if (input.breakdown_by) {
    source.breakdownFilter = { breakdown: input.breakdown_by, breakdown_type: 'event' };
  }
  return { kind: 'InsightVizNode', source };
}

export const insightsCreateSchema = z.object({
  name: z.string().describe('Name of the insight'),
  description: z.string().optional().describe('Description'),
  insight_type: insightTypeEnum.optional().describe('Simple path: insight type (trends, funnel, ...). Ignored if raw_query or query is provided.'),
  event: z.string().optional().describe('Simple path: event to track (e.g. $pageview). Default: $pageview'),
  math: mathEnum.optional().describe('Simple path: aggregation method. Default: total'),
  date_from: z.string().optional().describe('Simple path: start date (e.g. -7d)'),
  date_to: z.string().optional().describe('Simple path: end date (e.g. 0d)'),
  breakdown_by: z.string().optional().describe('Simple path: property to breakdown by (e.g. $browser)'),
  raw_query: z.record(z.any()).optional().describe('Advanced: full PostHog query source (TrendsQuery / FunnelsQuery / etc.) — wrapped in InsightVizNode for you'),
  // --- Legacy v1 fields (still accepted so pre-v2 callers keep working) ---
  query: z.record(z.any()).optional().describe('Legacy v1 field: full query object. Passed through as-is. Prefer raw_query.'),
  events: z.array(z.record(z.any())).optional().describe('Legacy v1 field: events array for multi-series. Prefer raw_query for advanced shapes.'),
  dashboards: z.array(z.number()).optional().describe('Dashboard IDs to add insight to'),
  tags: z.array(z.string()).optional().describe('Tags'),
  project_id: z.string().optional().describe('Project ID override'),
});

export const insightsRetrieveSchema = z.object({
  insight_id: z.string().describe('Insight ID or short ID'),
  refresh_mode: refreshEnum.optional().describe('How to refresh the data'),
  project_id: z.string().optional().describe('Project ID override'),
});

export const insightsListSchema = z.object({
  limit: z.number().min(1).max(1000).default(100).describe('Max results'),
  offset: z.number().min(0).default(0).describe('Results to skip'),
  search: z.string().optional().describe('Search term'),
  dashboard_id: z.number().optional().describe('Filter by dashboard ID'),
  project_id: z.string().optional().describe('Project ID override'),
});

export const insightsUpdateSchema = z.object({
  insight_id: z.string().describe('Insight ID to update'),
  name: z.string().optional(),
  description: z.string().optional(),
  query: z.record(z.any()).optional().describe('Updated query (raw)'),
  filters: z.record(z.any()).optional().describe('Updated legacy filters'),
  tags: z.array(z.string()).optional(),
  project_id: z.string().optional().describe('Project ID override'),
});

export const insightsDeleteSchema = z.object({
  insight_id: z.string().describe('Insight ID to delete'),
  project_id: z.string().optional().describe('Project ID override'),
});

export function registerInsightsTools(server: McpServer, client: PostHogClient): void {
  server.registerTool(
    'insights_create',
    {
      title: 'Create insight',
      description:
        'Create a PostHog insight. Precedence: raw_query > query (legacy) > events array (legacy) > insight_type+event simple path.',
      inputSchema: insightsCreateSchema.shape,
      annotations: create,
    },
    async (input) => {
      const { project_id, name, description, dashboards, tags, ...rest } = input;
      const insightParams = {
        name,
        description,
        dashboards,
        tags,
        query: buildInsightQuery(rest),
      };
      const insight = await client.createInsight(insightParams, project_id);
      return textResult(insight);
    },
  );

  server.registerTool(
    'insights_retrieve',
    {
      title: 'Get insight',
      description: 'Retrieve an existing insight or execute its query',
      inputSchema: insightsRetrieveSchema.shape,
      annotations: readOnly,
    },
    async (input) => {
      const insight = await client.getInsight(input.insight_id, input.refresh_mode as RefreshMode | undefined, input.project_id);
      return textResult(insight);
    },
  );

  server.registerTool(
    'insights_list',
    {
      title: 'List insights',
      description: 'List insights with optional search and dashboard filter',
      inputSchema: insightsListSchema.shape,
      annotations: readOnly,
    },
    async (input) => {
      const insights = await client.listInsights(input.limit, input.offset, input.search, input.dashboard_id, input.project_id);
      return textResult(insights);
    },
  );

  server.registerTool(
    'insights_update',
    {
      title: 'Update insight',
      description: 'Update an existing insight',
      inputSchema: insightsUpdateSchema.shape,
      annotations: update,
    },
    async (input) => {
      const { insight_id, project_id, ...updates } = input;
      const insight = await client.updateInsight(insight_id, updates, project_id);
      return textResult(insight);
    },
  );

  server.registerTool(
    'insights_delete',
    {
      title: 'Delete insight',
      description: 'Delete an insight',
      inputSchema: insightsDeleteSchema.shape,
      annotations: destroy,
    },
    async (input) => {
      await client.deleteInsight(input.insight_id, input.project_id);
      return textResult(`Insight ${input.insight_id} deleted`);
    },
  );
}
