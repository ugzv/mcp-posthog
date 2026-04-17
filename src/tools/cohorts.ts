import { z } from 'zod/v3';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PostHogClient } from '../client/posthog-client';
import { readOnly, create, textResult } from './_helpers';

export const cohortsListSchema = z.object({
  limit: z.number().min(1).max(1000).default(100),
  offset: z.number().min(0).default(0),
  search: z.string().optional(),
  project_id: z.string().optional(),
});

export const cohortsGetSchema = z.object({
  cohort_id: z.string(),
  project_id: z.string().optional(),
});

export const cohortsCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  filters: z.record(z.any()).optional(),
  groups: z.array(z.any()).optional(),
  is_static: z.boolean().default(false),
  project_id: z.string().optional(),
});

export const cohortsGetMembersSchema = z.object({
  cohort_id: z.string(),
  limit: z.number().min(1).max(1000).default(100),
  offset: z.number().min(0).default(0),
  project_id: z.string().optional(),
});

export function registerCohortsTools(server: McpServer, client: PostHogClient): void {
  server.registerTool(
    'cohorts_list',
    { title: 'List cohorts', description: 'List cohorts', inputSchema: cohortsListSchema.shape, annotations: readOnly },
    async (input) => textResult(await client.listCohorts(input.limit, input.offset, input.search, input.project_id)),
  );

  server.registerTool(
    'cohorts_get',
    { title: 'Get cohort', description: 'Get a cohort by id', inputSchema: cohortsGetSchema.shape, annotations: readOnly },
    async (input) => textResult(await client.getCohort(input.cohort_id, input.project_id)),
  );

  server.registerTool(
    'cohorts_create',
    { title: 'Create cohort', description: 'Create a new cohort', inputSchema: cohortsCreateSchema.shape, annotations: create },
    async (input) => {
      const { project_id, ...params } = input;
      return textResult(await client.createCohort(params, project_id));
    },
  );

  server.registerTool(
    'cohorts_get_members',
    { title: 'Get cohort members', description: 'List members of a cohort', inputSchema: cohortsGetMembersSchema.shape, annotations: readOnly },
    async (input) => textResult(await client.getCohortMembers(input.cohort_id, input.limit, input.offset, input.project_id)),
  );
}
