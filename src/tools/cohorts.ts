import { z } from 'zod';
import { PostHogClient } from '../client/posthog-client';

export const cohortsListSchema = z.object({
  limit: z.number().min(1).max(1000).default(100).describe('Maximum number of results'),
  offset: z.number().min(0).default(0).describe('Number of results to skip'),
  search: z.string().optional().describe('Search term'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const cohortsCreateSchema = z.object({
  name: z.string().describe('Cohort name'),
  description: z.string().optional().describe('Cohort description'),
  filters: z.record(z.any()).optional().describe('Filters defining the cohort'),
  groups: z.array(z.any()).optional().describe('Groups defining the cohort'),
  is_static: z.boolean().default(false).describe('Whether the cohort is static'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const cohortsGetMembersSchema = z.object({
  cohort_id: z.string().describe('Cohort ID'),
  limit: z.number().min(1).max(1000).default(100).describe('Maximum number of results'),
  offset: z.number().min(0).default(0).describe('Number of results to skip'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export function registerCohortsTools(client: PostHogClient) {
  return {
    cohorts_list: {
      description: 'List available cohorts',
      inputSchema: cohortsListSchema,
      handler: async (input: z.infer<typeof cohortsListSchema>) => {
        const cohorts = await client.listCohorts(
          input.limit,
          input.offset,
          input.search,
          input.project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(cohorts, null, 2)
          }]
        };
      }
    },

    cohorts_create: {
      description: 'Create a new cohort',
      inputSchema: cohortsCreateSchema,
      handler: async (input: z.infer<typeof cohortsCreateSchema>) => {
        const { project_id, ...params } = input;
        const cohort = await client.createCohort(params, project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(cohort, null, 2)
          }]
        };
      }
    },

    cohorts_get_members: {
      description: 'Get members of a cohort',
      inputSchema: cohortsGetMembersSchema,
      handler: async (input: z.infer<typeof cohortsGetMembersSchema>) => {
        const members = await client.getCohortMembers(
          input.cohort_id,
          input.limit,
          input.offset,
          input.project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(members, null, 2)
          }]
        };
      }
    }
  };
}