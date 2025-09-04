import { z } from 'zod';
import { PostHogClient } from '../client/posthog-client';

export const projectsListSchema = z.object({});

export const projectsGetSettingsSchema = z.object({
  project_id: z.string().describe('Project ID')
});

export function registerProjectsTools(client: PostHogClient) {
  return {
    projects_list: {
      description: 'List accessible projects (returns configured project if using scoped API key)',
      inputSchema: projectsListSchema,
      handler: async () => {
        try {
          const projects = await client.listProjects();
          
          return {
            content: [{
              type: 'text' as const,
              text: JSON.stringify(projects, null, 2)
            }]
          };
        } catch (error: any) {
          // Provide helpful context about the error
          return {
            content: [{
              type: 'text' as const,
              text: `Error: ${error.message}\n\nNote: If you're using a project-scoped API key, you can only access the configured project. Use projects_get_settings with your project ID instead.`
            }]
          };
        }
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