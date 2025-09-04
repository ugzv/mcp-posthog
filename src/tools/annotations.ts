import { z } from 'zod';
import { PostHogClient } from '../client/posthog-client';

// Schema for listing annotations
export const annotationsListSchema = z.object({
  limit: z.number().min(1).max(1000).default(100).describe('Number of results to return'),
  offset: z.number().min(0).default(0).describe('Number of results to skip'),
  search: z.string().optional().describe('Search term to filter annotations'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

// Schema for creating annotations
export const annotationsCreateSchema = z.object({
  content: z.string().describe('The content/message of the annotation'),
  date_marker: z.string().describe('The date/time this annotation refers to (ISO 8601 format)'),
  scope: z.enum(['organization', 'project', 'dashboard_item']).optional().describe('Scope of the annotation'),
  dashboard_item: z.number().optional().describe('Dashboard tile ID if scope is dashboard_item'),
  tags: z.array(z.string()).optional().describe('Tags for the annotation'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

// Schema for retrieving a single annotation
export const annotationsRetrieveSchema = z.object({
  annotation_id: z.number().describe('ID of the annotation to retrieve'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

// Schema for updating annotations
export const annotationsUpdateSchema = z.object({
  annotation_id: z.number().describe('ID of the annotation to update'),
  content: z.string().optional().describe('New content/message'),
  date_marker: z.string().optional().describe('New date/time (ISO 8601 format)'),
  scope: z.enum(['organization', 'project', 'dashboard_item']).optional().describe('New scope'),
  dashboard_item: z.number().optional().describe('New dashboard tile ID'),
  deleted: z.boolean().optional().describe('Mark as deleted (soft delete)'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

// Schema for deleting annotations
export const annotationsDeleteSchema = z.object({
  annotation_id: z.number().describe('ID of the annotation to delete'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export function registerAnnotationsTools(client: PostHogClient) {
  return {
    annotations_list: {
      description: 'List all annotations for a project',
      inputSchema: annotationsListSchema,
      handler: async (input: z.infer<typeof annotationsListSchema>) => {
        const { project_id, ...params } = input;
        
        const annotations = await client.listAnnotations(
          params.limit,
          params.offset,
          params.search,
          project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(annotations, null, 2)
          }]
        };
      }
    },

    annotations_create: {
      description: 'Create a new annotation to mark important events',
      inputSchema: annotationsCreateSchema,
      handler: async (input: z.infer<typeof annotationsCreateSchema>) => {
        const { project_id, ...params } = input;
        
        const annotation = await client.createAnnotation(params, project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(annotation, null, 2)
          }]
        };
      }
    },

    annotations_retrieve: {
      description: 'Get details of a specific annotation',
      inputSchema: annotationsRetrieveSchema,
      handler: async (input: z.infer<typeof annotationsRetrieveSchema>) => {
        const { annotation_id, project_id } = input;
        
        const annotation = await client.getAnnotation(annotation_id, project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(annotation, null, 2)
          }]
        };
      }
    },

    annotations_update: {
      description: 'Update an existing annotation',
      inputSchema: annotationsUpdateSchema,
      handler: async (input: z.infer<typeof annotationsUpdateSchema>) => {
        const { annotation_id, project_id, ...updates } = input;
        
        const annotation = await client.updateAnnotation(
          annotation_id,
          updates,
          project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(annotation, null, 2)
          }]
        };
      }
    },

    annotations_delete: {
      description: 'Delete an annotation (soft delete by marking as deleted)',
      inputSchema: annotationsDeleteSchema,
      handler: async (input: z.infer<typeof annotationsDeleteSchema>) => {
        const { annotation_id, project_id } = input;
        
        // According to API docs, hard delete is not allowed, use PATCH to set deleted=true
        await client.updateAnnotation(
          annotation_id,
          { deleted: true },
          project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: `Annotation ${annotation_id} has been marked as deleted.`
          }]
        };
      }
    }
  };
}