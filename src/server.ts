import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { PostHogClient, PostHogAPIError } from './client/posthog-client';
import { registerInsightsTools } from './tools/insights';
import { registerPersonsTools } from './tools/persons';
import { registerFeatureFlagsTools } from './tools/feature-flags';
import { registerDashboardsTools } from './tools/dashboards';
import { registerEventsTools } from './tools/events';
import { registerCohortsTools } from './tools/cohorts';
import { registerProjectsTools } from './tools/projects';
import { registerQueryTools } from './tools/query';

export interface ServerConfig {
  host: string;
  apiKey: string;
  projectId?: string;
  serverName?: string;
  serverVersion?: string;
}

export class PostHogMCPServer {
  private server: Server;
  private client: PostHogClient;

  constructor(config: ServerConfig) {
    // Initialize PostHog client
    this.client = new PostHogClient({
      host: config.host,
      apiKey: config.apiKey,
      projectId: config.projectId
    });

    // Initialize MCP server
    this.server = new Server(
      {
        name: config.serverName || 'posthog-mcp',
        version: config.serverVersion || '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.registerTools();
    this.setupErrorHandling();
  }

  private registerTools() {
    // Register all tool categories
    const toolCategories = [
      registerInsightsTools(this.client),
      registerPersonsTools(this.client),
      registerFeatureFlagsTools(this.client),
      registerDashboardsTools(this.client),
      registerEventsTools(this.client),
      registerCohortsTools(this.client),
      registerProjectsTools(this.client),
      registerQueryTools(this.client)
    ];

    // Register each tool with the server
    for (const tools of toolCategories) {
      for (const [name, tool] of Object.entries(tools)) {
        this.server.setRequestHandler(`tools/list`, async () => ({
          tools: Object.entries(tools).map(([toolName, toolDef]) => ({
            name: toolName,
            description: toolDef.description,
            inputSchema: toolDef.inputSchema._def,
          })),
        }));

        this.server.setRequestHandler(`tools/call`, async (request: any) => {
          if (request.params.name === name) {
            try {
              const validated = tool.inputSchema.parse(request.params.arguments);
              return await tool.handler(validated);
            } catch (error) {
              if (error instanceof PostHogAPIError) {
                return {
                  content: [{
                    type: 'text' as const,
                    text: `PostHog API Error: ${error.message}${error.details ? `\nDetails: ${JSON.stringify(error.details)}` : ''}`
                  }],
                  isError: true
                };
              }
              
              if (error instanceof Error) {
                return {
                  content: [{
                    type: 'text' as const,
                    text: `Error: ${error.message}`
                  }],
                  isError: true
                };
              }
              
              return {
                content: [{
                  type: 'text' as const,
                  text: `Unknown error occurred: ${error}`
                }],
                isError: true
              };
            }
          }
        });
      }
    }
  }

  private setupErrorHandling() {
    // Global error handling
    this.server.onerror = (error) => {
      console.error('[PostHog MCP Server Error]', error);
    };
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    console.error('[PostHog MCP Server] Started successfully');
    console.error(`[PostHog MCP Server] Connected to ${this.client['client'].defaults.baseURL}`);
  }
}