import { PostHogMCPServer } from './server';
import { loadConfig, createConfigFile } from './config';

async function main(): Promise<void> {
  if (process.argv.includes('--init')) {
    createConfigFile();
    process.exit(0);
  }

  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
PostHog MCP Server

Usage:
  posthog-mcp              Start the MCP server (stdio transport)
  posthog-mcp --init       Create a sample posthog-mcp.config.json
  posthog-mcp --help       Show this help message

Required env vars:
  POSTHOG_HOST              PostHog API host (e.g. https://eu.posthog.com)
  POSTHOG_API_KEY           Personal API key (phx_*)

Optional env vars:
  POSTHOG_PROJECT_API_KEY   Project API key (phc_*), needed for events_capture
  POSTHOG_PROJECT_ID        Default project ID
  MCP_SERVER_NAME           Server name (default: posthog-mcp)
  MCP_SERVER_VERSION        Server version
`);
    process.exit(0);
  }

  const config = loadConfig();
  const server = new PostHogMCPServer({
    host: config.host,
    apiKey: config.apiKey,
    projectApiKey: config.projectApiKey,
    projectId: config.projectId,
    serverName: config.serverName,
    serverVersion: config.serverVersion,
  });

  await server.start();
}

const shutdown = (signal: string) => {
  console.error(`[posthog-mcp] ${signal} received, shutting down`);
  process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

main().catch((err) => {
  console.error('Failed to start PostHog MCP Server:', err);
  process.exit(1);
});
