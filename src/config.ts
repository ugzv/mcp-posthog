import * as fs from 'fs';
import * as path from 'path';
import { config as dotenv } from 'dotenv';

export interface Config {
  host: string;
  apiKey: string;
  projectId?: string;
  serverName?: string;
  serverVersion?: string;
  rateLimit?: {
    maxRequestsPerMinute?: number;
  };
  cache?: {
    enabled?: boolean;
    ttl?: number;
  };
}

export function loadConfig(): Config {
  // Load environment variables
  dotenv();

  // Check for config file
  const configPath = process.env.POSTHOG_CONFIG_PATH || path.join(process.cwd(), 'posthog-mcp.config.json');
  
  let fileConfig: Partial<Config> = {};
  if (fs.existsSync(configPath)) {
    try {
      const configContent = fs.readFileSync(configPath, 'utf-8');
      fileConfig = JSON.parse(configContent);
    } catch (error) {
      console.error(`Failed to parse config file at ${configPath}:`, error);
    }
  }

  // Environment variables take precedence over config file
  const config: Config = {
    host: process.env.POSTHOG_HOST || fileConfig.host || '',
    apiKey: process.env.POSTHOG_API_KEY || fileConfig.apiKey || '',
    projectId: process.env.POSTHOG_PROJECT_ID || fileConfig.projectId,
    serverName: process.env.MCP_SERVER_NAME || fileConfig.serverName || 'posthog-mcp',
    serverVersion: process.env.MCP_SERVER_VERSION || fileConfig.serverVersion || '1.0.0',
    rateLimit: {
      maxRequestsPerMinute: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '') || 
                            fileConfig.rateLimit?.maxRequestsPerMinute || 200
    },
    cache: {
      enabled: process.env.CACHE_ENABLED === 'true' || fileConfig.cache?.enabled || false,
      ttl: parseInt(process.env.CACHE_TTL || '') || fileConfig.cache?.ttl || 300
    }
  };

  // Validate required fields
  if (!config.host) {
    throw new Error('POSTHOG_HOST is required. Set it via environment variable or config file.');
  }

  if (!config.apiKey) {
    throw new Error('POSTHOG_API_KEY is required. Set it via environment variable or config file.');
  }

  // Ensure host is properly formatted
  if (!config.host.startsWith('http://') && !config.host.startsWith('https://')) {
    config.host = `https://${config.host}`;
  }

  return config;
}

export function validateApiKey(apiKey: string): boolean {
  // Personal API keys typically start with 'phx_' or similar patterns
  // Project API keys are typically shorter
  return apiKey.length > 0;
}

export function createConfigFile(outputPath?: string): void {
  const configPath = outputPath || path.join(process.cwd(), 'posthog-mcp.config.json');
  
  const sampleConfig = {
    host: "https://posthog.myteam.network",
    apiKey: "<your_personal_api_key>",
    projectId: "<optional_default_project_id>",
    serverName: "posthog-mcp",
    serverVersion: "1.0.0",
    rateLimit: {
      maxRequestsPerMinute: 200
    },
    cache: {
      enabled: true,
      ttl: 300
    }
  };

  fs.writeFileSync(configPath, JSON.stringify(sampleConfig, null, 2));
  console.log(`Sample configuration file created at: ${configPath}`);
  console.log('Please edit this file with your PostHog credentials.');
}