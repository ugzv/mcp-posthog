# PostHog MCP Server

A Model Context Protocol (MCP) server that enables AI assistants like Claude to interact with PostHog analytics data. This server provides comprehensive access to PostHog's API through structured MCP tools, allowing for analytics queries, user management, feature flag operations, and dashboard management.

## Features

- **Analytics & Insights**: Create, retrieve, and manage analytics insights
- **Person Management**: Search, update, and manage user data with GDPR compliance
- **Feature Flags**: Full lifecycle management of feature flags
- **Dashboards**: Create and manage dashboards and visualizations
- **Event Tracking**: Capture custom events and query event data
- **Cohorts**: Create and manage user segments
- **HogQL Queries**: Execute advanced queries using PostHog Query Language
- **Project Management**: Multi-project support

## Installation

### Prerequisites

- Node.js 18.0.0 or higher
- PostHog instance (cloud or self-hosted)
- PostHog Personal API Key

### From Source

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-posthog.git
cd mcp-posthog

# Install dependencies
npm install

# Build the server
npm run build
```

### Global Installation

```bash
# Install globally
npm install -g @posthog/mcp-server

# Or link for development
npm link
```

## Configuration

### Quick Start

1. Create a configuration file:

```bash
posthog-mcp --init
```

2. Edit `posthog-mcp.config.json` with your PostHog credentials:

```json
{
  "host": "https://posthog.myteam.network",
  "apiKey": "phx_your_personal_api_key",
  "projectId": "1"
}
```

### Environment Variables

Alternatively, use environment variables:

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your credentials
POSTHOG_HOST=https://posthog.myteam.network
POSTHOG_API_KEY=phx_your_personal_api_key
POSTHOG_PROJECT_ID=1
```

### Getting Your API Key

1. Log into your PostHog instance
2. Navigate to Project Settings → Personal API Keys
3. Create a new Personal API Key with appropriate scopes
4. Copy the key (it starts with `phx_`)

## Usage

### With Claude Desktop

1. Add to your Claude Desktop configuration (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "posthog": {
      "command": "posthog-mcp",
      "env": {
        "POSTHOG_HOST": "https://posthog.myteam.network",
        "POSTHOG_API_KEY": "phx_your_api_key"
      }
    }
  }
}
```

2. Restart Claude Desktop

3. Use PostHog tools in your conversations:
   - "Show me user engagement insights from last week"
   - "Create a feature flag for the new dashboard"
   - "List all active users with premium subscription"

### With Claude Code

1. Start the MCP server:

```bash
posthog-mcp
```

2. Claude Code will automatically detect and connect to the server

### Standalone Mode

```bash
# Start with environment variables
POSTHOG_HOST=https://posthog.myteam.network \
POSTHOG_API_KEY=phx_your_api_key \
posthog-mcp

# Or with config file
posthog-mcp
```

## Available Tools

### Analytics & Insights

- `insights_create` - Create new analytics insights
- `insights_retrieve` - Retrieve insights with refresh options
- `insights_list` - List available insights
- `insights_update` - Update insight configuration

### Person Management

- `persons_search` - Search and filter users
- `persons_get` - Get detailed user information
- `persons_update` - Update user properties
- `persons_merge` - Merge duplicate user records
- `persons_delete` - Delete users (GDPR compliance)

### Feature Flags

- `feature_flags_list` - List all feature flags
- `feature_flags_create` - Create new feature flags
- `feature_flags_update` - Update flag configuration
- `feature_flags_evaluate` - Evaluate flags for users
- `feature_flags_delete` - Delete feature flags

### Dashboards

- `dashboards_list` - List dashboards
- `dashboards_get` - Get dashboard details
- `dashboards_create` - Create new dashboards
- `dashboards_update` - Update dashboard configuration
- `dashboards_delete` - Delete dashboards

### Events

- `events_capture` - Send custom events
- `events_query` - Query events with HogQL

### Cohorts

- `cohorts_list` - List user cohorts
- `cohorts_create` - Create new cohorts
- `cohorts_get_members` - Get cohort members

### Projects

- `projects_list` - List all projects
- `projects_get_settings` - Get project settings

### Queries

- `query_hogql` - Execute HogQL queries
- `query_export` - Export query results (CSV/JSON)

## Examples

### Creating an Insight

```javascript
{
  "tool": "insights_create",
  "arguments": {
    "name": "Weekly Active Users",
    "query_type": "trends",
    "date_range": {
      "date_from": "-7d",
      "date_to": "now"
    }
  }
}
```

### Searching for Users

```javascript
{
  "tool": "persons_search",
  "arguments": {
    "search_query": "john@example.com",
    "properties_filter": {
      "subscription": "premium"
    },
    "limit": 10
  }
}
```

### Creating a Feature Flag

```javascript
{
  "tool": "feature_flags_create",
  "arguments": {
    "key": "new-dashboard",
    "name": "New Dashboard Experience",
    "rollout_percentage": 20,
    "active": true
  }
}
```

### Executing HogQL Query

```javascript
{
  "tool": "query_hogql",
  "arguments": {
    "query": "SELECT event, count() FROM events WHERE timestamp > now() - interval 7 day GROUP BY event ORDER BY count() DESC LIMIT 10"
  }
}
```

## Development

### Project Structure

```
mcp-posthog/
├── src/
│   ├── client/          # PostHog API client
│   ├── tools/           # MCP tool implementations
│   ├── types/           # TypeScript type definitions
│   ├── config.ts        # Configuration management
│   ├── server.ts        # MCP server implementation
│   └── index.ts         # Entry point
├── dist/                # Built files
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript configuration
```

### Running in Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Type check
npm run typecheck
```

### Building

```bash
# Build for production
npm run build

# Output will be in dist/
```

## API Rate Limits

The server respects PostHog's API rate limits:

- Analytics endpoints: 240/minute, 1200/hour
- Query endpoint: 1200/hour
- Feature flag evaluation: 600/minute
- CRUD operations: 480/minute, 4800/hour

## Security Considerations

- **API Keys**: Store securely, never commit to version control
- **Permissions**: Use Personal API Keys with minimal required scopes
- **GDPR**: Use person deletion tools for data privacy compliance
- **Audit**: All operations are logged in PostHog's audit log

## Troubleshooting

### Connection Issues

1. Verify your PostHog instance URL is correct
2. Check API key validity and permissions
3. Ensure network connectivity to PostHog

### Authentication Errors

1. Regenerate your Personal API Key
2. Check key has required scopes
3. Verify project ID is correct

### Rate Limiting

1. Implement caching for frequently accessed data
2. Use batch operations where available
3. Add delays between bulk operations

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

- GitHub Issues: [github.com/yourusername/mcp-posthog/issues](https://github.com/yourusername/mcp-posthog/issues)
- PostHog Documentation: [posthog.com/docs](https://posthog.com/docs)
- MCP Documentation: [modelcontextprotocol.io](https://modelcontextprotocol.io)

## API Documentation

The `posthog-api-docs-md` directory contains comprehensive markdown documentation for all PostHog API endpoints, including:

- **Analytics**: Events, Persons, Cohorts, Insights
- **Feature Management**: Feature Flags, Experiments, Surveys
- **Data Management**: Batch Exports, Properties, Queries
- **Organization**: Projects, Teams, Members, Roles
- **Recording**: Session Recordings, Playlists
- **And more...**

## Acknowledgments

Built with the [Model Context Protocol SDK](https://github.com/modelcontextprotocol/typescript-sdk) by Anthropic.