import { z } from 'zod/v3';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PostHogClient } from '../client/posthog-client';
import { readOnly, create, update, destroy, textResult } from './_helpers';

export const featureFlagsListSchema = z.object({
  active_only: z.boolean().default(false),
  search: z.string().optional(),
  limit: z.number().min(1).max(1000).default(100),
  offset: z.number().min(0).default(0),
  project_id: z.string().optional(),
});

export const featureFlagsGetSchema = z.object({
  flag_id: z.string().describe('Feature flag ID'),
  project_id: z.string().optional(),
});

export const featureFlagsCreateSchema = z.object({
  key: z.string().describe('Unique flag key'),
  name: z.string().describe('Display name'),
  filters: z.record(z.any()).optional().describe('Targeting filters'),
  rollout_percentage: z.number().min(0).max(100).optional(),
  active: z.boolean().default(true),
  ensure_experience_continuity: z.boolean().optional(),
  project_id: z.string().optional(),
});

export const featureFlagsUpdateSchema = z.object({
  flag_id: z.string(),
  active: z.boolean().optional(),
  filters: z.record(z.any()).optional(),
  rollout_percentage: z.number().min(0).max(100).optional(),
  name: z.string().optional(),
  ensure_experience_continuity: z.boolean().optional(),
  project_id: z.string().optional(),
});

export const featureFlagsDeleteSchema = z.object({
  flag_id: z.string(),
  project_id: z.string().optional(),
});

export function registerFeatureFlagsTools(server: McpServer, client: PostHogClient): void {
  server.registerTool(
    'feature_flags_list',
    {
      title: 'List feature flags',
      description: 'List all feature flags',
      inputSchema: featureFlagsListSchema.shape,
      annotations: readOnly,
    },
    async (input) => {
      const flags = await client.listFeatureFlags(input.active_only, input.search, input.limit, input.offset, input.project_id);
      return textResult(flags);
    },
  );

  server.registerTool(
    'feature_flags_get',
    {
      title: 'Get feature flag',
      description: 'Get a single feature flag by id',
      inputSchema: featureFlagsGetSchema.shape,
      annotations: readOnly,
    },
    async (input) => {
      const flag = await client.getFeatureFlag(input.flag_id, input.project_id);
      return textResult(flag);
    },
  );

  server.registerTool(
    'feature_flags_create',
    {
      title: 'Create feature flag',
      description: 'Create a new feature flag',
      inputSchema: featureFlagsCreateSchema.shape,
      annotations: create,
    },
    async (input) => {
      const { project_id, ...params } = input;
      const flag = await client.createFeatureFlag(params, project_id);
      return textResult(flag);
    },
  );

  server.registerTool(
    'feature_flags_update',
    {
      title: 'Update feature flag',
      description: 'Update an existing feature flag',
      inputSchema: featureFlagsUpdateSchema.shape,
      annotations: update,
    },
    async (input) => {
      const { flag_id, project_id, ...updates } = input;
      const flag = await client.updateFeatureFlag(flag_id, updates, project_id);
      return textResult(flag);
    },
  );

  server.registerTool(
    'feature_flags_delete',
    {
      title: 'Delete feature flag',
      description: 'Delete a feature flag',
      inputSchema: featureFlagsDeleteSchema.shape,
      annotations: destroy,
    },
    async (input) => {
      await client.deleteFeatureFlag(input.flag_id, input.project_id);
      return textResult(`Feature flag ${input.flag_id} deleted`);
    },
  );
}
