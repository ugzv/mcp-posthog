import { z } from 'zod';
import { PostHogClient } from '../client/posthog-client';

export const projectsListSchema = z.object({});

export const projectsGetSettingsSchema = z.object({
  project_id: z.string().describe('Project ID')
});

export function registerProjectsTools(client: PostHogClient) {
  return {
    projects_list: {
      description: 'List all projects',
      inputSchema: projectsListSchema,
      handler: async () => {
        const projects = await client.listProjects();
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(projects, null, 2)
          }]
        };
      }
    },

    projects_get_settings: {
      description: 'Get project configuration',
      inputSchema: projectsGetSettingsSchema,
      handler: async (input: z.infer<typeof projectsGetSettingsSchema>) => {
        const project = await client.getProject(input.project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(project, null, 2)
          }]
        };
      }
    }
  };
}