import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PostHogClient } from './client/posthog-client';

export function registerResources(server: McpServer, client: PostHogClient): void {
  server.registerResource(
    'current_project',
    'posthog://project/current',
    {
      title: 'Current PostHog project',
      description: 'Configuration of the project configured via POSTHOG_PROJECT_ID',
      mimeType: 'application/json',
    },
    async (uri) => {
      const projects = await client.listProjects();
      const project = projects[0];
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify(project, null, 2),
          },
        ],
      };
    },
  );
}
