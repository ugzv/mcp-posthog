import * as fs from 'fs';
import * as path from 'path';
import { config as dotenv } from 'dotenv';

export interface Config {
  host: string;
  apiKey: string;
  projectApiKey?: string;
  projectId?: string;
  serverName?: string;
  serverVersion?: string;
}

export function loadConfig(): Config {
  dotenv();

  const configPath = process.env.POSTHOG_CONFIG_PATH ?? path.join(process.cwd(), 'posthog-mcp.config.json');
  let fileConfig: Partial<Config> = {};
  if (fs.existsSync(configPath)) {
    try {
      fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8')) as Partial<Config>;
    } catch (err) {
      console.error(`Failed to parse config file at ${configPath}:`, err);
    }
  }

  const config: Config = {
    host: process.env.POSTHOG_HOST ?? fileConfig.host ?? '',
    apiKey: process.env.POSTHOG_API_KEY ?? fileConfig.apiKey ?? '',
    projectApiKey: process.env.POSTHOG_PROJECT_API_KEY ?? fileConfig.projectApiKey,
    projectId: process.env.POSTHOG_PROJECT_ID ?? fileConfig.projectId,
    serverName: process.env.MCP_SERVER_NAME ?? fileConfig.serverName ?? 'posthog-mcp',
    serverVersion: process.env.MCP_SERVER_VERSION ?? fileConfig.serverVersion ?? '2.0.0',
  };

  if (!config.host) {
    throw new Error('POSTHOG_HOST is required (set env var or configure in posthog-mcp.config.json)');
  }
  if (!config.apiKey) {
    throw new Error('POSTHOG_API_KEY is required (set env var or configure in posthog-mcp.config.json)');
  }

  if (!/^https?:\/\//.test(config.host)) {
    config.host = `https://${config.host}`;
  }

  return config;
}

export function isPersonalApiKey(apiKey: string): boolean {
  return apiKey.startsWith('phx_');
}

export function isProjectApiKey(apiKey: string): boolean {
  return apiKey.startsWith('phc_');
}

export function createConfigFile(outputPath?: string): void {
  const configPath = outputPath ?? path.join(process.cwd(), 'posthog-mcp.config.json');
  const sampleConfig = {
    host: 'https://eu.posthog.com',
    apiKey: '<your_personal_api_key>',
    projectApiKey: '<your_project_api_key>',
    projectId: '<default_project_id>',
    serverName: 'posthog-mcp',
    serverVersion: '2.0.0',
  };
  fs.writeFileSync(configPath, JSON.stringify(sampleConfig, null, 2));
  console.log(`Sample configuration file created at: ${configPath}`);
}
