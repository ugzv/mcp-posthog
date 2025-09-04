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
- PostHog Personal API Key (required for management operations)
- PostHog Project API Key (optional for event capture)

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
  "projectApiKey": "phc_your_project_api_key",
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
POSTHOG_PROJECT_API_KEY=phc_your_project_api_key
POSTHOG_PROJECT_ID=1
```

### API Keys Configuration

PostHog MCP supports **dual-key authentication** for maximum flexibility:

#### 1. Personal API Key (Required)
- **Purpose**: Management operations (queries, dashboards, insights, feature flags)
- **Format**: Starts with `phx_`
- **Location**: Account Settings → Personal API Keys
- **Scopes**: Project-scoped keys work perfectly (no need for organization-level access)

#### 2. Project API Key (Optional)
- **Purpose**: Event capture/ingestion only
- **Format**: Starts with `phc_`
- **Location**: Project Settings → API Keys
- **When needed**: Only if you want to capture/send events to PostHog

**Important Notes**:
- Personal API keys that are project-scoped (most common) work seamlessly
- The MCP automatically handles project-scoped limitations
- Event capture is disabled if no project API key is provided (with helpful error messages)

## Usage

### With Claude Desktop

1. Add to your Claude Desktop configuration:
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "posthog-mcp": {
      "command": "node",
      "args": ["C:/path/to/mcp-posthog/dist/index.js"],
      "env": {
        "POSTHOG_HOST": "https://posthog.myteam.network",
        "POSTHOG_API_KEY": "phx_your_personal_api_key",
        "POSTHOG_PROJECT_API_KEY": "phc_your_project_api_key",
        "POSTHOG_PROJECT_ID": "1"
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

## Configuration Examples

### Full Configuration (All Features)
```json
{
  "host": "https://posthog.myteam.network",
  "apiKey": "phx_abc123...",          // Personal API key
  "projectApiKey": "phc_xyz789...",    // Project API key
  "projectId": "1"
}
```

### Query-Only Configuration (No Event Capture)
```json
{
  "host": "https://posthog.myteam.network",
  "apiKey": "phx_abc123...",          // Personal API key only
  "projectId": "1"
}
```

## Available Tools

### Analytics & Insights

- `insights_create` - Create new analytics insights with full query control
- `insights_create_simple` - Create insights with simplified parameters
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

### Annotations

- `annotations_list` - List all annotations
- `annotations_create` - Create annotations for important events
- `annotations_retrieve` - Get annotation details
- `annotations_update` - Update existing annotations
- `annotations_delete` - Delete annotations (soft delete)

### Actions

- `actions_list` - List all defined actions
- `actions_create` - Create custom actions with steps
- `actions_create_simple` - Create simple actions from common patterns
- `actions_retrieve` - Get action details
- `actions_update` - Update action configuration
- `actions_delete` - Delete actions (soft delete)

## Examples

### Creating an Insight

#### Simple Insight Creation

```javascript
{
  "tool": "insights_create_simple",
  "arguments": {
    "name": "Weekly Active Users",
    "insight_type": "trends",
    "event": "$pageview",
    "math": "dau",
    "date_from": "-7d",
    "date_to": "0d",
    "breakdown_by": "$browser"
  }
}
```

#### Advanced Insight Creation

```javascript
{
  "tool": "insights_create",
  "arguments": {
    "name": "Custom Funnel Analysis",
    "description": "Conversion funnel from signup to purchase",
    "query": {
      "kind": "FunnelsQuery",
      "source": {
        "kind": "FunnelsQuery",
        "series": [
          {"kind": "EventsNode", "event": "signup", "name": "User Signup"},
          {"kind": "EventsNode", "event": "add_to_cart", "name": "Add to Cart"},
          {"kind": "EventsNode", "event": "purchase", "name": "Purchase"}
        ],
        "dateRange": {
          "date_from": "-30d",
          "date_to": "0d"
        }
      }
    },
    "dashboards": [123],
    "tags": ["conversion", "funnel"]
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

### Creating an Annotation

```javascript
{
  "tool": "annotations_create",
  "arguments": {
    "content": "Deployed v2.5.0 - New checkout flow",
    "date_marker": "2024-01-15T14:30:00Z",
    "scope": "project"
  }
}
```

### Creating a Simple Action

```javascript
{
  "tool": "actions_create_simple",
  "arguments": {
    "name": "Signup Button Click",
    "event_name": "$autocapture",
    "selector": "button#signup-btn",
    "text": "Sign Up Now",
    "tags": ["conversion", "funnel"]
  }
}
```

### Creating a Complex Action

```javascript
{
  "tool": "actions_create",
  "arguments": {
    "name": "Premium Feature Usage",
    "description": "Track when premium features are used",
    "steps": [{
      "event": "feature_used",
      "properties": [{
        "feature_tier": "premium",
        "user_plan": "pro"
      }]
    }],
    "post_to_slack": true,
    "slack_message_format": "Premium feature used: ${properties.feature_name}"
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

### Common Issues

#### "API keys with scoped projects" Error
- **Cause**: Your personal API key is project-scoped (this is normal)
- **Solution**: Already handled! The MCP automatically uses project-specific endpoints
- **Note**: You can only access your configured project, not all organization projects

#### Connection Issues
1. Verify your PostHog instance URL is correct
2. Check API key validity (personal key starts with `phx_`)
3. Ensure network connectivity to PostHog

#### Event Capture Not Working
1. Ensure you have configured a Project API Key (`phc_`)
2. Project API keys are separate from Personal API keys
3. Check Project Settings → API Keys in PostHog

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