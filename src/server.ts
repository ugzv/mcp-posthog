import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { PostHogClient } from './client/posthog-client';
import { registerInsightsTools } from './tools/insights';
import { registerPersonsTools } from './tools/persons';
import { registerFeatureFlagsTools } from './tools/feature-flags';
import { registerDashboardsTools } from './tools/dashboards';
import { registerEventsTools } from './tools/events';
import { registerCohortsTools } from './tools/cohorts';
import { registerProjectsTools } from './tools/projects';
import { registerQueryTools } from './tools/query';
import { registerAnnotationsTools } from './tools/annotations';
import { registerActionsTools } from './tools/actions';
import { registerSurveysTools } from './tools/surveys';
import { registerExperimentsTools } from './tools/experiments';
import { registerSessionRecordingsTools } from './tools/session-recordings';
import { registerResources } from './resources';
import { registerPrompts } from './prompts';

export interface ServerConfig {
  host: string;
  apiKey: string;
  projectApiKey?: string;
  projectId?: string;
  serverName?: string;
  serverVersion?: string;
}

export class PostHogMCPServer {
  private readonly server: McpServer;
  private readonly client: PostHogClient;

  constructor(config: ServerConfig) {
    this.client = new PostHogClient({
      host: config.host,
      apiKey: config.apiKey,
      projectApiKey: config.projectApiKey,
      projectId: config.projectId,
    });

    this.server = new McpServer({
      name: config.serverName ?? 'posthog-mcp',
      version: config.serverVersion ?? '2.0.0',
    });

    this.registerAll();

    this.server.server.onerror = (err) => {
      console.error('[posthog-mcp] server error:', err);
    };
  }

  private registerAll(): void {
    registerProjectsTools(this.server, this.client);
    registerInsightsTools(this.server, this.client);
    registerDashboardsTools(this.server, this.client);
    registerQueryTools(this.server, this.client);
    registerEventsTools(this.server, this.client);
    registerPersonsTools(this.server, this.client);
    registerCohortsTools(this.server, this.client);
    registerFeatureFlagsTools(this.server, this.client);
    registerAnnotationsTools(this.server, this.client);
    registerActionsTools(this.server, this.client);
    registerSurveysTools(this.server, this.client);
    registerExperimentsTools(this.server, this.client);
    registerSessionRecordingsTools(this.server, this.client);

    registerResources(this.server, this.client);
    registerPrompts(this.server);
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(`[posthog-mcp] connected to ${this.client.getBaseUrl()}`);
  }
}
