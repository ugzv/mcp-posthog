#!/usr/bin/env node

import { PostHogMCPServer } from './server';
import { loadConfig, createConfigFile } from './config';

async function main() {
  // Check for initialization command
  if (process.argv.includes('--init')) {
    createConfigFile();
    process.exit(0);
  }

  // Show help
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
PostHog MCP Server

A Model Context Protocol server for PostHog analytics platform.

Usage:
  posthog-mcp              Start the MCP server
  posthog-mcp --init       Create a sample configuration file
  posthog-mcp --help       Show this help message

Environment Variables:
  POSTHOG_HOST            PostHog instance URL (required)
  POSTHOG_API_KEY         Personal API key for authentication (required)
  POSTHOG_PROJECT_ID      Default project ID (optional)
  MCP_SERVER_NAME         Server name (default: posthog-mcp)
  MCP_SERVER_VERSION      Server version (default: 1.0.0)

Configuration File:
  The server looks for posthog-mcp.config.json in the current directory.
  Use --init to create a sample configuration file.

For more information, see: https://github.com/yourusername/mcp-posthog
    `);
    process.exit(0);
  }

  try {
    // Load configuration
    const config = loadConfig();
    
    // Create and start server
    const server = new PostHogMCPServer({
      host: config.host,
      apiKey: config.apiKey,
      projectId: config.projectId,
      serverName: config.serverName,
      serverVersion: config.serverVersion
    });

    await server.start();
    
    // Keep the process running
    process.stdin.resume();
    
  } catch (error) {
    console.error('Failed to start PostHog MCP Server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.error('\n[PostHog MCP Server] Shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('[PostHog MCP Server] Shutting down...');
  process.exit(0);
});

// Start the server
main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});