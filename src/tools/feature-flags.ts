import { z } from 'zod';
import { PostHogClient } from '../client/posthog-client';

export const featureFlagsListSchema = z.object({
  active_only: z.boolean().default(false).describe('Only show active flags'),
  search: z.string().optional().describe('Search term'),
  limit: z.number().min(1).max(1000).default(100).describe('Maximum number of results'),
  offset: z.number().min(0).default(0).describe('Number of results to skip'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const featureFlagsCreateSchema = z.object({
  key: z.string().describe('Unique key for the feature flag'),
  name: z.string().describe('Display name for the feature flag'),
  filters: z.record(z.any()).optional().describe('Targeting filters'),
  rollout_percentage: z.number().min(0).max(100).optional().describe('Percentage rollout'),
  active: z.boolean().default(true).describe('Whether the flag is active'),
  ensure_experience_continuity: z.boolean().optional().describe('Ensure users see consistent flag values'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const featureFlagsUpdateSchema = z.object({
  flag_id: z.string().describe('Feature flag ID'),
  active: z.boolean().optional().describe('Whether the flag is active'),
  filters: z.record(z.any()).optional().describe('Updated targeting filters'),
  rollout_percentage: z.number().min(0).max(100).optional().describe('Updated rollout percentage'),
  name: z.string().optional().describe('Updated display name'),
  ensure_experience_continuity: z.boolean().optional().describe('Update experience continuity setting'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const featureFlagsEvaluateSchema = z.object({
  distinct_id: z.string().describe('User distinct ID to evaluate flags for'),
  flag_keys: z.array(z.string()).optional().describe('Specific flag keys to evaluate (evaluates all if not provided)'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const featureFlagsDeleteSchema = z.object({
  flag_id: z.string().describe('Feature flag ID to delete'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export function registerFeatureFlagsTools(client: PostHogClient) {
  return {
    feature_flags_list: {
      description: 'List all feature flags with their status',
      inputSchema: featureFlagsListSchema,
      handler: async (input: z.infer<typeof featureFlagsListSchema>) => {
        const flags = await client.listFeatureFlags(
          input.active_only,
          input.search,
          input.limit,
          input.offset,
          input.project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(flags, null, 2)
          }]
        };
      }
    },

    feature_flags_create: {
      description: 'Create a new feature flag',
      inputSchema: featureFlagsCreateSchema,
      handler: async (input: z.infer<typeof featureFlagsCreateSchema>) => {
        const { project_id, ...params } = input;
        const flag = await client.createFeatureFlag(params, project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(flag, null, 2)
          }]
        };
      }
    },

    feature_flags_update: {
      description: 'Update feature flag configuration',
      inputSchema: featureFlagsUpdateSchema,
      handler: async (input: z.infer<typeof featureFlagsUpdateSchema>) => {
        const { flag_id, project_id, ...updates } = input;
        const flag = await client.updateFeatureFlag(flag_id, updates, project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(flag, null, 2)
          }]
        };
      }
    },

    feature_flags_evaluate: {
      description: 'Evaluate feature flags for a specific user',
      inputSchema: featureFlagsEvaluateSchema,
      handler: async (input: z.infer<typeof featureFlagsEvaluateSchema>) => {
        const evaluation = await client.evaluateFeatureFlags(
          input.distinct_id,
          input.flag_keys,
          input.project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(evaluation, null, 2)
          }]
        };
      }
    },

    feature_flags_delete: {
      description: 'Delete a feature flag',
      inputSchema: featureFlagsDeleteSchema,
      handler: async (input: z.infer<typeof featureFlagsDeleteSchema>) => {
        await client.deleteFeatureFlag(input.flag_id, input.project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: `Feature flag ${input.flag_id} deleted successfully`
          }]
        };
      }
    }
  };
}