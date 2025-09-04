import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema,
  ListToolsRequestSchema 
} from '@modelcontextprotocol/sdk/types.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
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
  private allTools: Record<string, any> = {};

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
    // Collect all tools from categories
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

    // Merge all tools into a single object
    for (const tools of toolCategories) {
      Object.assign(this.allTools, tools);
    }

    // Register the list tools handler
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: Object.entries(this.allTools).map(([name, tool]) => ({
        name,
        description: tool.description,
        inputSchema: zodToJsonSchema(tool.inputSchema),
      })),
    }));

    // Register the call tool handler
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const toolName = request.params.name;
      const tool = this.allTools[toolName];

      if (!tool) {
        throw new Error(`Tool not found: ${toolName}`);
      }

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
    });
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