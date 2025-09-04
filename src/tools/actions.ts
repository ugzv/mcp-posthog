import { z } from 'zod';
import { PostHogClient } from '../client/posthog-client';

// Schema for action steps
const actionStepSchema = z.object({
  event: z.string().optional().describe('Event name to match'),
  properties: z.array(z.record(z.any())).optional().describe('Properties to match'),
  selector: z.string().optional().describe('CSS selector for element'),
  tag_name: z.string().optional().describe('HTML tag name'),
  text: z.string().optional().describe('Text content to match'),
  text_matching: z.enum(['exact', 'contains', 'regex']).default('contains').describe('How to match text'),
  href: z.string().optional().describe('Link href to match'),
  href_matching: z.enum(['exact', 'contains', 'regex']).default('contains').describe('How to match href'),
  url: z.string().optional().describe('Page URL to match'),
  url_matching: z.enum(['exact', 'contains', 'regex']).default('contains').describe('How to match URL')
});

// Schema for listing actions
export const actionsListSchema = z.object({
  limit: z.number().min(1).max(1000).default(100).describe('Number of results to return'),
  offset: z.number().min(0).default(0).describe('Number of results to skip'),
  format: z.enum(['json', 'csv']).optional().describe('Response format'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

// Schema for creating actions
export const actionsCreateSchema = z.object({
  name: z.string().describe('Name of the action'),
  description: z.string().optional().describe('Description of what this action tracks'),
  steps: z.array(actionStepSchema).min(1).describe('Steps that define this action'),
  tags: z.array(z.string()).optional().describe('Tags for categorization'),
  post_to_slack: z.boolean().default(false).describe('Whether to post to Slack when action occurs'),
  slack_message_format: z.string().optional().describe('Custom Slack message format'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

// Schema for simple action creation
export const actionsCreateSimpleSchema = z.object({
  name: z.string().describe('Name of the action'),
  description: z.string().optional().describe('Description of what this action tracks'),
  event_name: z.string().describe('Event name to track (e.g., "$pageview", "signup", "purchase")'),
  properties: z.record(z.any()).optional().describe('Event properties to match'),
  url: z.string().optional().describe('URL pattern to match (for pageview actions)'),
  url_matching: z.enum(['exact', 'contains', 'regex']).default('contains').describe('How to match URL'),
  selector: z.string().optional().describe('CSS selector for click actions'),
  text: z.string().optional().describe('Button/link text to match'),
  tags: z.array(z.string()).optional().describe('Tags for categorization'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

// Schema for retrieving a single action
export const actionsRetrieveSchema = z.object({
  action_id: z.number().describe('ID of the action to retrieve'),
  format: z.enum(['json', 'csv']).optional().describe('Response format'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

// Schema for updating actions
export const actionsUpdateSchema = z.object({
  action_id: z.number().describe('ID of the action to update'),
  name: z.string().optional().describe('New name'),
  description: z.string().optional().describe('New description'),
  steps: z.array(actionStepSchema).optional().describe('New steps definition'),
  tags: z.array(z.string()).optional().describe('New tags'),
  post_to_slack: z.boolean().optional().describe('Update Slack posting'),
  slack_message_format: z.string().optional().describe('New Slack message format'),
  deleted: z.boolean().optional().describe('Mark as deleted'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

// Schema for deleting actions
export const actionsDeleteSchema = z.object({
  action_id: z.number().describe('ID of the action to delete'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export function registerActionsTools(client: PostHogClient) {
  return {
    actions_list: {
      description: 'List all defined actions',
      inputSchema: actionsListSchema,
      handler: async (input: z.infer<typeof actionsListSchema>) => {
        const { project_id, format, ...params } = input;
        
        const actions = await client.listActions(
          params.limit,
          params.offset,
          format,
          project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(actions, null, 2)
          }]
        };
      }
    },

    actions_create: {
      description: 'Create a new action with custom steps',
      inputSchema: actionsCreateSchema,
      handler: async (input: z.infer<typeof actionsCreateSchema>) => {
        const { project_id, ...params } = input;
        
        const action = await client.createAction(params, project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(action, null, 2)
          }]
        };
      }
    },

    actions_create_simple: {
      description: 'Create a simple action from common patterns',
      inputSchema: actionsCreateSimpleSchema,
      handler: async (input: z.infer<typeof actionsCreateSimpleSchema>) => {
        const { 
          project_id, 
          event_name, 
          properties,
          url,
          url_matching,
          selector,
          text,
          ...params 
        } = input;
        
        // Build steps array based on input
        const steps: any[] = [];
        
        // Create the primary step
        const step: any = {
          event: event_name
        };
        
        // Add properties if specified
        if (properties && Object.keys(properties).length > 0) {
          step.properties = [properties];
        }
        
        // Add URL matching if specified
        if (url) {
          step.url = url;
          step.url_matching = url_matching;
        }
        
        // Add selector if specified (for click tracking)
        if (selector) {
          step.selector = selector;
        }
        
        // Add text matching if specified
        if (text) {
          step.text = text;
          step.text_matching = 'contains';
        }
        
        steps.push(step);
        
        const actionParams = {
          name: params.name,
          description: params.description,
          steps,
          tags: params.tags,
          post_to_slack: false
        };
        
        const action = await client.createAction(actionParams, project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(action, null, 2)
          }]
        };
      }
    },

    actions_retrieve: {
      description: 'Get details of a specific action',
      inputSchema: actionsRetrieveSchema,
      handler: async (input: z.infer<typeof actionsRetrieveSchema>) => {
        const { action_id, format, project_id } = input;
        
        const action = await client.getAction(action_id, format, project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(action, null, 2)
          }]
        };
      }
    },

    actions_update: {
      description: 'Update an existing action',
      inputSchema: actionsUpdateSchema,
      handler: async (input: z.infer<typeof actionsUpdateSchema>) => {
        const { action_id, project_id, ...updates } = input;
        
        const action = await client.updateAction(
          action_id,
          updates,
          project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(action, null, 2)
          }]
        };
      }
    },

    actions_delete: {
      description: 'Delete an action (soft delete by marking as deleted)',
      inputSchema: actionsDeleteSchema,
      handler: async (input: z.infer<typeof actionsDeleteSchema>) => {
        const { action_id, project_id } = input;
        
        // According to API docs, hard delete is not allowed, use PATCH to set deleted=true
        await client.updateAction(
          action_id,
          { deleted: true },
          project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: `Action ${action_id} has been marked as deleted.`
          }]
        };
      }
    }
  };
}