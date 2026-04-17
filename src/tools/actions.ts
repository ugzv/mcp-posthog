import { z } from 'zod/v3';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PostHogClient } from '../client/posthog-client';
import { readOnly, create, update, destroy, textResult } from './_helpers';

const matchingEnum = z.enum(['exact', 'contains', 'regex']);

const actionStepSchema = z.object({
  event: z.string().optional(),
  properties: z.array(z.record(z.any())).optional(),
  selector: z.string().optional(),
  tag_name: z.string().optional(),
  text: z.string().optional(),
  text_matching: matchingEnum.default('contains'),
  href: z.string().optional(),
  href_matching: matchingEnum.default('contains'),
  url: z.string().optional(),
  url_matching: matchingEnum.default('contains'),
});

export const actionsListSchema = z.object({
  limit: z.number().min(1).max(1000).default(100),
  offset: z.number().min(0).default(0),
  format: z.enum(['json', 'csv']).optional(),
  project_id: z.string().optional(),
});

export const actionsCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  event_name: z.string().optional().describe('Simple path: event to match (e.g. $pageview). Ignored when steps is set.'),
  properties: z.record(z.any()).optional().describe('Simple path: event properties filter'),
  url: z.string().optional().describe('Simple path: URL to match'),
  url_matching: matchingEnum.default('contains'),
  selector: z.string().optional().describe('Simple path: CSS selector to match'),
  text: z.string().optional().describe('Simple path: button/link text to match'),
  steps: z.array(actionStepSchema).optional().describe('Advanced: full step list (overrides simple-path)'),
  tags: z.array(z.string()).optional(),
  post_to_slack: z.boolean().default(false),
  slack_message_format: z.string().optional(),
  project_id: z.string().optional(),
});

export const actionsRetrieveSchema = z.object({
  action_id: z.number(),
  format: z.enum(['json', 'csv']).optional(),
  project_id: z.string().optional(),
});

export const actionsUpdateSchema = z.object({
  action_id: z.number(),
  name: z.string().optional(),
  description: z.string().optional(),
  steps: z.array(actionStepSchema).optional(),
  tags: z.array(z.string()).optional(),
  post_to_slack: z.boolean().optional(),
  slack_message_format: z.string().optional(),
  deleted: z.boolean().optional(),
  project_id: z.string().optional(),
});

export const actionsDeleteSchema = z.object({
  action_id: z.number(),
  project_id: z.string().optional(),
});

export function registerActionsTools(server: McpServer, client: PostHogClient): void {
  server.registerTool(
    'actions_list',
    { title: 'List actions', description: 'List actions', inputSchema: actionsListSchema.shape, annotations: readOnly },
    async (input) => {
      const { project_id, format, ...params } = input;
      return textResult(await client.listActions(params.limit, params.offset, format, project_id));
    },
  );

  server.registerTool(
    'actions_create',
    {
      title: 'Create action',
      description: 'Create a new action. Provide steps for full control, or event_name + optional url/selector/text for a simple single-step action.',
      inputSchema: actionsCreateSchema.shape,
      annotations: create,
    },
    async (input) => {
      const { project_id, event_name, properties, url, url_matching, selector, text, steps: explicitSteps, ...rest } = input;

      let steps = explicitSteps;
      if (!steps || steps.length === 0) {
        if (!event_name) {
          throw new Error('Either steps or event_name (simple path) must be provided');
        }
        const step: Record<string, unknown> = { event: event_name };
        if (properties && Object.keys(properties).length > 0) step.properties = [properties];
        if (url) { step.url = url; step.url_matching = url_matching; }
        if (selector) step.selector = selector;
        if (text) { step.text = text; step.text_matching = 'contains'; }
        steps = [step as z.infer<typeof actionStepSchema>];
      }

      const action = await client.createAction({ ...rest, steps }, project_id);
      return textResult(action);
    },
  );

  server.registerTool(
    'actions_retrieve',
    { title: 'Get action', description: 'Get an action by id', inputSchema: actionsRetrieveSchema.shape, annotations: readOnly },
    async (input) => textResult(await client.getAction(input.action_id, input.format, input.project_id)),
  );

  server.registerTool(
    'actions_update',
    { title: 'Update action', description: 'Update an action', inputSchema: actionsUpdateSchema.shape, annotations: update },
    async (input) => {
      const { action_id, project_id, ...updates } = input;
      return textResult(await client.updateAction(action_id, updates, project_id));
    },
  );

  server.registerTool(
    'actions_delete',
    {
      title: 'Delete action',
      description: 'Soft-delete an action (PATCH deleted=true)',
      inputSchema: actionsDeleteSchema.shape,
      annotations: destroy,
    },
    async (input) => {
      await client.updateAction(input.action_id, { deleted: true }, input.project_id);
      return textResult(`Action ${input.action_id} marked deleted`);
    },
  );
}
