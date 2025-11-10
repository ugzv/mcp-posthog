# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PostHog MCP Server is a Model Context Protocol (MCP) server implementation that enables AI assistants to interact with PostHog analytics platform. It provides comprehensive access to PostHog's API through structured MCP tools for analytics queries, user management, feature flags, dashboards, event tracking, and more.

## Development Commands

### Build & Run
```bash
npm run build        # Build TypeScript to dist/
npm run dev          # Run in development mode with tsx
npm start            # Run built version from dist/
```

### Quality Checks
```bash
npm run typecheck    # Type check without emitting files
npm run lint         # Lint with ESLint
npm test             # Run Jest tests
```

### Installation
```bash
npm install          # Install dependencies
npm link             # Link for local development (makes posthog-mcp command available)
```

## Architecture

### Core Components

**Entry Point** (`src/index.ts`):
- CLI entry point with `#!/usr/bin/env node` shebang
- Handles command-line arguments (`--init`, `--help`)
- Loads configuration and initializes server
- Handles graceful shutdown on SIGINT/SIGTERM

**MCP Server** (`src/server.ts`):
- `PostHogMCPServer` class manages MCP protocol communication
- Uses `@modelcontextprotocol/sdk` (v1.21.1) for MCP protocol implementation
- Communicates via `StdioServerTransport` for stdin/stdout
- Registers all tools from tool modules
- Converts Zod schemas to JSON Schema for MCP using `zodToJsonSchema`
- Centralized error handling for `PostHogAPIError` and generic errors

**PostHog Client** (`src/client/posthog-client.ts`):
- `PostHogClient` class wraps axios for all PostHog API interactions
- Implements dual-key authentication pattern:
  - **Personal API Key** (`phx_*`): For management operations (queries, dashboards, flags)
  - **Project API Key** (`phc_*`): For event capture only
- Handles project-scoped API keys automatically via `getProjectUrl()` helper
- Custom `PostHogAPIError` class for structured error handling
- Response interceptor transforms axios errors into `PostHogAPIError`

**Configuration** (`src/config.ts`):
- Loads config from both environment variables and `posthog-mcp.config.json`
- Environment variables take precedence over config file
- Required: `POSTHOG_HOST`, `POSTHOG_API_KEY`
- Optional: `POSTHOG_PROJECT_API_KEY`, `POSTHOG_PROJECT_ID`
- Validates and normalizes configuration (adds https:// if missing)

### Tool Organization

Tools are organized by domain in `src/tools/`:
- `insights.ts` - Analytics insights (trends, funnels, retention)
- `persons.ts` - User/person management and GDPR operations
- `feature-flags.ts` - Feature flag lifecycle management
- `dashboards.ts` - Dashboard creation and management
- `events.ts` - Event capture and querying
- `cohorts.ts` - User cohort/segment management
- `projects.ts` - Multi-project support
- `query.ts` - HogQL query execution and exports
- `annotations.ts` - Chart annotations for deployments/events
- `actions.ts` - Custom action definitions

**Tool Pattern**:
Each tool module exports a `register*Tools()` function that returns an object where:
- Keys are tool names (e.g., `insights_create`)
- Values contain:
  - `description`: Tool description for MCP
  - `inputSchema`: Zod schema for validation
  - `handler`: Async function that uses PostHogClient

Example:
```typescript
export function registerInsightsTools(client: PostHogClient) {
  return {
    insights_create: {
      description: 'Create a new analytics insight',
      inputSchema: insightsCreateSchema,
      handler: async (input) => {
        const result = await client.createInsight(input);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
        };
      }
    }
  };
}
```

### Type System

**TypeScript Configuration**:
- Target: ES2022
- Strict mode enabled with comprehensive type checking flags
- Declaration files and source maps generated
- Output: `dist/` directory

**Type Definitions** (`src/types/posthog.ts`):
Defines all PostHog API types including:
- Configuration: `PostHogConfig`
- Resources: `Person`, `Insight`, `FeatureFlag`, `Dashboard`, `Cohort`, `Project`, `Annotation`, `Action`
- Request params: `*CreateParams`, `*UpdateParams`
- Responses: `PaginatedResponse<T>`, `QueryResponse`
- Enums: `RefreshMode` for insight data refresh strategies

## Key Implementation Details

### Dual-Key Authentication Pattern

The server supports two types of API keys with different purposes:

1. **Personal API Key** (required):
   - Format: `phx_*`
   - Used for all management operations
   - Can be project-scoped (most common) or org-level
   - Configured via `POSTHOG_API_KEY` or `config.apiKey`

2. **Project API Key** (optional):
   - Format: `phc_*`
   - Only for event capture (`events_capture` tool)
   - Configured via `POSTHOG_PROJECT_API_KEY` or `config.projectApiKey`
   - If missing, event capture shows helpful error message

### Project-Scoped API Key Handling

PostHog personal API keys are commonly project-scoped. The client handles this automatically:

- All endpoints use `/api/projects/{projectId}/*` format via `getProjectUrl()`
- `projects_list` endpoint special handling:
  - With project-scoped key: Returns only the configured project
  - Without project config: Attempts `/api/projects/` and provides helpful error if scoped
- Error messages guide users when scoped keys limit functionality

### Query Construction

**Insights**: PostHog uses nested query structures with `InsightVizNode` wrapper:
```typescript
{
  query: {
    kind: 'InsightVizNode',
    source: {
      kind: 'TrendsQuery' | 'FunnelsQuery' | 'RetentionQuery',
      series: [{ kind: 'EventsNode', event: '$pageview', math: 'total' }],
      dateRange: { date_from: '-7d', date_to: '0d' }
    }
  }
}
```

**HogQL Queries**: Executed through `/api/projects/{id}/query/` endpoint:
```typescript
{
  query: {
    kind: 'HogQLQuery',
    query: 'SELECT event, count() FROM events WHERE timestamp > now() - interval 7 day'
  },
  variables: { /* optional query variables */ }
}
```

### Event Capture Endpoint

Event capture uses `/i/v0/e` endpoint (updated from legacy `/capture/`):
- Requires Project API Key, not Personal API Key
- Uses separate axios client without Bearer auth
- API key sent as `api_key` in request body
- See CHANGELOG.md for endpoint migration details

### Error Handling Strategy

1. Custom `PostHogAPIError` includes:
   - User-friendly message
   - HTTP status code
   - API response details

2. Tool handlers catch errors and return MCP-formatted error responses:
```typescript
{
  content: [{ type: 'text', text: `Error: ${message}` }],
  isError: true
}
```

3. Special handling for project-scoped API key limitations with actionable guidance

## Testing Notes

- Test framework: Jest with ts-jest
- No tests currently in repository (see `tsconfig.json` excludes)
- When adding tests, create `*.test.ts` or `*.spec.ts` files
- Tests should mock PostHog API responses using axios mocks

## Build Process

The build uses both TypeScript compiler and a custom `build.js` script:
- `tsc` compiles TypeScript to CommonJS in `dist/`
- `build.js` handles additional build steps (check file for specifics)
- Output is executable via `node dist/index.js` or `posthog-mcp` command

## PostHog API Specifics

### Rate Limits (documented in README.md)
- Analytics endpoints: 240/minute, 1200/hour
- Query endpoint: 1200/hour
- Feature flag evaluation: 600/minute
- CRUD operations: 480/minute, 4800/hour

### Common Gotchas

1. **Insight creation** requires proper nested query structure with `InsightVizNode` wrapper
2. **HogQL queries** must include `LIMIT` clause or pass limit parameter (automatically added by client)
3. **Event capture** needs Project API Key, separate from Personal API Key
4. **Project-scoped keys** can only access configured project, not all org projects
5. **Annotations and Actions** use numeric IDs, not string IDs

## MCP Protocol Integration

This server implements MCP protocol for AI assistant integration:
- Tools exposed via `ListToolsRequestSchema` handler
- Tool execution via `CallToolRequestSchema` handler
- Zod schemas automatically converted to JSON Schema for MCP
- All responses follow MCP content format: `{ content: [{ type: 'text', text: '...' }] }`
- Server runs as stdio transport for integration with Claude Desktop or other MCP clients

## Configuration Files

- `.env` or environment variables for credentials (never commit)
- `posthog-mcp.config.json` for local config (created with `posthog-mcp --init`)
- Configuration precedence: ENV vars > config file > defaults
