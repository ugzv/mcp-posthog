import { z } from 'zod/v3';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PostHogClient } from '../client/posthog-client';
import { readOnly, textResult } from './_helpers';

export function registerProjectsTools(server: McpServer, client: PostHogClient): void {
  server.registerTool(
    'projects_list',
    {
      title: 'List projects',
      description: 'List accessible projects (returns just the configured project when a project-scoped key is used)',
      inputSchema: {},
      annotations: readOnly,
    },
    async () => textResult(await client.listProjects()),
  );

  server.registerTool(
    'projects_get',
    {
      title: 'Get project',
      description: 'Get project configuration',
      inputSchema: { project_id: z.string().describe('Project ID') },
      annotations: readOnly,
    },
    async ({ project_id }) => textResult(await client.getProject(project_id)),
  );
}
