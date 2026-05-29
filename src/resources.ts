import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PostHogClient } from './client/posthog-client';
import { HOGQL_SCHEMA_FULL } from './hogql';

export function registerResources(server: McpServer, client: PostHogClient): void {
  server.registerResource(
    'hogql_schema',
    'posthog://hogql/schema',
    {
      title: 'HogQL schema reference',
      description: 'HogQL column/property schema, casting rules, and common query pitfalls',
      mimeType: 'text/markdown',
    },
    async (uri) => ({
      contents: [{ uri: uri.href, mimeType: 'text/markdown', text: HOGQL_SCHEMA_FULL }],
    }),
  );

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
