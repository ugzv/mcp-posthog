import { z } from 'zod/v3';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PostHogClient } from '../client/posthog-client';
import { readOnly, create, update, destroy, textResult } from './_helpers';

export const surveysListSchema = z.object({
  limit: z.number().min(1).max(1000).default(100),
  offset: z.number().min(0).default(0),
  search: z.string().optional(),
  project_id: z.string().optional(),
});

export const surveysGetSchema = z.object({
  survey_id: z.string(),
  project_id: z.string().optional(),
});

export const surveysCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  type: z.enum(['popover', 'button', 'email', 'api', 'widget']).default('popover'),
  questions: z.array(z.any()).optional().describe('Survey questions — array of {type, question, ...}'),
  conditions: z.record(z.any()).optional().describe('Targeting conditions'),
  appearance: z.record(z.any()).optional(),
  linked_flag_id: z.number().optional(),
  targeting_flag_filters: z.record(z.any()).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  project_id: z.string().optional(),
});

export const surveysUpdateSchema = z.object({
  survey_id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  questions: z.array(z.any()).optional(),
  conditions: z.record(z.any()).optional(),
  appearance: z.record(z.any()).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  archived: z.boolean().optional(),
  project_id: z.string().optional(),
});

export const surveysDeleteSchema = z.object({
  survey_id: z.string(),
  project_id: z.string().optional(),
});

export const surveysStatsSchema = z.object({
  survey_id: z.string(),
  project_id: z.string().optional(),
});

export function registerSurveysTools(server: McpServer, client: PostHogClient): void {
  server.registerTool(
    'surveys_list',
    { title: 'List surveys', description: 'List surveys', inputSchema: surveysListSchema.shape, annotations: readOnly },
    async (input) => textResult(await client.listSurveys(input.limit, input.offset, input.search, input.project_id)),
  );

  server.registerTool(
    'surveys_get',
    { title: 'Get survey', description: 'Get a survey by id', inputSchema: surveysGetSchema.shape, annotations: readOnly },
    async (input) => textResult(await client.getSurvey(input.survey_id, input.project_id)),
  );

  server.registerTool(
    'surveys_create',
    { title: 'Create survey', description: 'Create a new survey', inputSchema: surveysCreateSchema.shape, annotations: create },
    async (input) => {
      const { project_id, ...params } = input;
      return textResult(await client.createSurvey(params, project_id));
    },
  );

  server.registerTool(
    'surveys_update',
    { title: 'Update survey', description: 'Update a survey', inputSchema: surveysUpdateSchema.shape, annotations: update },
    async (input) => {
      const { survey_id, project_id, ...updates } = input;
      return textResult(await client.updateSurvey(survey_id, updates, project_id));
    },
  );

  server.registerTool(
    'surveys_delete',
    { title: 'Delete survey', description: 'Delete a survey', inputSchema: surveysDeleteSchema.shape, annotations: destroy },
    async (input) => {
      await client.deleteSurvey(input.survey_id, input.project_id);
      return textResult(`Survey ${input.survey_id} deleted`);
    },
  );

  server.registerTool(
    'surveys_stats',
    { title: 'Get survey stats', description: 'Get response stats for a survey', inputSchema: surveysStatsSchema.shape, annotations: readOnly },
    async (input) => textResult(await client.getSurveyStats(input.survey_id, input.project_id)),
  );
}
