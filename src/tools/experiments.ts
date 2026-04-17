import { z } from 'zod/v3';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PostHogClient } from '../client/posthog-client';
import { readOnly, create, update, destroy, textResult } from './_helpers';

export const experimentsListSchema = z.object({
  limit: z.number().min(1).max(1000).default(100),
  offset: z.number().min(0).default(0),
  search: z.string().optional(),
  project_id: z.string().optional(),
});

export const experimentsGetSchema = z.object({
  experiment_id: z.number(),
  project_id: z.string().optional(),
});

export const experimentsCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  feature_flag_key: z.string().optional().describe('Feature flag key to attach (will be created if missing)'),
  parameters: z.record(z.any()).optional().describe('Variant config: {feature_flag_variants: [...]}'),
  filters: z.record(z.any()).optional().describe('Event filters scoping the experiment'),
  metrics: z.array(z.any()).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  project_id: z.string().optional(),
});

export const experimentsUpdateSchema = z.object({
  experiment_id: z.number(),
  name: z.string().optional(),
  description: z.string().optional(),
  parameters: z.record(z.any()).optional(),
  filters: z.record(z.any()).optional(),
  metrics: z.array(z.any()).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  archived: z.boolean().optional(),
  project_id: z.string().optional(),
});

export const experimentsDeleteSchema = z.object({
  experiment_id: z.number(),
  project_id: z.string().optional(),
});

export const experimentsDuplicateSchema = z.object({
  experiment_id: z.number(),
  project_id: z.string().optional(),
});

export function registerExperimentsTools(server: McpServer, client: PostHogClient): void {
  server.registerTool(
    'experiments_list',
    { title: 'List experiments', description: 'List experiments (A/B tests)', inputSchema: experimentsListSchema.shape, annotations: readOnly },
    async (input) => textResult(await client.listExperiments(input.limit, input.offset, input.search, input.project_id)),
  );

  server.registerTool(
    'experiments_get',
    { title: 'Get experiment', description: 'Get experiment details', inputSchema: experimentsGetSchema.shape, annotations: readOnly },
    async (input) => textResult(await client.getExperiment(input.experiment_id, input.project_id)),
  );

  server.registerTool(
    'experiments_create',
    { title: 'Create experiment', description: 'Create an experiment', inputSchema: experimentsCreateSchema.shape, annotations: create },
    async (input) => {
      const { project_id, ...params } = input;
      return textResult(await client.createExperiment(params, project_id));
    },
  );

  server.registerTool(
    'experiments_update',
    { title: 'Update experiment', description: 'Update an experiment', inputSchema: experimentsUpdateSchema.shape, annotations: update },
    async (input) => {
      const { experiment_id, project_id, ...updates } = input;
      return textResult(await client.updateExperiment(experiment_id, updates, project_id));
    },
  );

  server.registerTool(
    'experiments_delete',
    { title: 'Delete experiment', description: 'Delete an experiment', inputSchema: experimentsDeleteSchema.shape, annotations: destroy },
    async (input) => {
      await client.deleteExperiment(input.experiment_id, input.project_id);
      return textResult(`Experiment ${input.experiment_id} deleted`);
    },
  );

  server.registerTool(
    'experiments_duplicate',
    { title: 'Duplicate experiment', description: 'Duplicate an experiment into a new draft', inputSchema: experimentsDuplicateSchema.shape, annotations: create },
    async (input) => textResult(await client.duplicateExperiment(input.experiment_id, input.project_id)),
  );
}
