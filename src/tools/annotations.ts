import { z } from 'zod/v3';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PostHogClient } from '../client/posthog-client';
import { readOnly, create, update, destroy, textResult } from './_helpers';

export const annotationsListSchema = z.object({
  limit: z.number().min(1).max(1000).default(100),
  offset: z.number().min(0).default(0),
  search: z.string().optional(),
  project_id: z.string().optional(),
});

export const annotationsCreateSchema = z.object({
  content: z.string().describe('Annotation content/message'),
  date_marker: z.string().describe('ISO 8601 timestamp this annotation refers to'),
  scope: z.enum(['organization', 'project', 'dashboard_item']).optional(),
  dashboard_item: z.number().optional().describe('Dashboard tile ID if scope=dashboard_item'),
  tags: z.array(z.string()).optional(),
  project_id: z.string().optional(),
});

export const annotationsRetrieveSchema = z.object({
  annotation_id: z.number(),
  project_id: z.string().optional(),
});

export const annotationsUpdateSchema = z.object({
  annotation_id: z.number(),
  content: z.string().optional(),
  date_marker: z.string().optional(),
  scope: z.enum(['organization', 'project', 'dashboard_item']).optional(),
  dashboard_item: z.number().optional(),
  deleted: z.boolean().optional(),
  project_id: z.string().optional(),
});

export const annotationsDeleteSchema = z.object({
  annotation_id: z.number(),
  project_id: z.string().optional(),
});

export function registerAnnotationsTools(server: McpServer, client: PostHogClient): void {
  server.registerTool(
    'annotations_list',
    { title: 'List annotations', description: 'List project annotations', inputSchema: annotationsListSchema.shape, annotations: readOnly },
    async (input) => textResult(await client.listAnnotations(input.limit, input.offset, input.search, input.project_id)),
  );

  server.registerTool(
    'annotations_create',
    { title: 'Create annotation', description: 'Create an annotation marker', inputSchema: annotationsCreateSchema.shape, annotations: create },
    async (input) => {
      const { project_id, ...params } = input;
      return textResult(await client.createAnnotation(params, project_id));
    },
  );

  server.registerTool(
    'annotations_retrieve',
    { title: 'Get annotation', description: 'Get an annotation by id', inputSchema: annotationsRetrieveSchema.shape, annotations: readOnly },
    async (input) => textResult(await client.getAnnotation(input.annotation_id, input.project_id)),
  );

  server.registerTool(
    'annotations_update',
    { title: 'Update annotation', description: 'Update an annotation', inputSchema: annotationsUpdateSchema.shape, annotations: update },
    async (input) => {
      const { annotation_id, project_id, ...updates } = input;
      return textResult(await client.updateAnnotation(annotation_id, updates, project_id));
    },
  );

  server.registerTool(
    'annotations_delete',
    {
      title: 'Delete annotation',
      description: 'Soft-delete an annotation (PATCH deleted=true)',
      inputSchema: annotationsDeleteSchema.shape,
      annotations: destroy,
    },
    async (input) => {
      await client.updateAnnotation(input.annotation_id, { deleted: true }, input.project_id);
      return textResult(`Annotation ${input.annotation_id} marked deleted`);
    },
  );
}
