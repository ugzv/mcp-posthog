# PostHog MCP Server

Connect Claude to PostHog for analytics insights, feature flags, user management, and more.

## Quick Start

### Installation

```bash
git clone https://github.com/ugzv/mcp-posthog.git
cd mcp-posthog
npm install
npm run build
```

### Configuration

You'll need two API keys from PostHog:
- **Personal API Key** (`phx_...`): For queries, dashboards, insights, feature flags
  - Get it from: Account Settings → Personal API Keys
- **Project API Key** (`phc_...`): For event capture (optional)
  - Get it from: Project Settings → API Keys

### Setup with Claude Desktop

Add to your Claude Desktop config file:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

#### PostHog Cloud (US)
```json
{
  "mcpServers": {
    "posthog": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-posthog/dist/index.js"],
      "env": {
        "POSTHOG_HOST": "https://us.posthog.com",
        "POSTHOG_API_KEY": "phx_your_personal_api_key",
        "POSTHOG_PROJECT_API_KEY": "phc_your_project_api_key",
        "POSTHOG_PROJECT_ID": "12345"
      }
    }
  }
}
```

#### PostHog Cloud (EU)
```json
{
  "mcpServers": {
    "posthog": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-posthog/dist/index.js"],
      "env": {
        "POSTHOG_HOST": "https://eu.posthog.com",
        "POSTHOG_API_KEY": "phx_your_personal_api_key",
        "POSTHOG_PROJECT_API_KEY": "phc_your_project_api_key",
        "POSTHOG_PROJECT_ID": "12345"
      }
    }
  }
}
```

#### Self-Hosted PostHog
```json
{
  "mcpServers": {
    "posthog": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-posthog/dist/index.js"],
      "env": {
        "POSTHOG_HOST": "https://posthog.yourcompany.com",
        "POSTHOG_API_KEY": "phx_your_personal_api_key",
        "POSTHOG_PROJECT_API_KEY": "phc_your_project_api_key",
        "POSTHOG_PROJECT_ID": "1"
      }
    }
  }
}
```

**Note**: Replace `/absolute/path/to/mcp-posthog` with the actual path to your cloned repository.

### Setup with Claude Code CLI

#### PostHog Cloud (US)
```bash
claude mcp add posthog \
  --env POSTHOG_HOST=https://us.posthog.com \
  --env POSTHOG_API_KEY=phx_your_personal_api_key \
  --env POSTHOG_PROJECT_API_KEY=phc_your_project_api_key \
  --env POSTHOG_PROJECT_ID=12345 \
  -- node /absolute/path/to/mcp-posthog/dist/index.js
```

#### PostHog Cloud (EU)
```bash
claude mcp add posthog \
  --env POSTHOG_HOST=https://eu.posthog.com \
  --env POSTHOG_API_KEY=phx_your_personal_api_key \
  --env POSTHOG_PROJECT_API_KEY=phc_your_project_api_key \
  --env POSTHOG_PROJECT_ID=12345 \
  -- node /absolute/path/to/mcp-posthog/dist/index.js
```

#### Self-Hosted PostHog
```bash
claude mcp add posthog \
  --env POSTHOG_HOST=https://posthog.yourcompany.com \
  --env POSTHOG_API_KEY=phx_your_personal_api_key \
  --env POSTHOG_PROJECT_API_KEY=phc_your_project_api_key \
  --env POSTHOG_PROJECT_ID=1 \
  -- node /absolute/path/to/mcp-posthog/dist/index.js
```

Verify the connection:
```bash
claude mcp list
```

## What You Can Do

Ask Claude to:
- "Show me pageviews for the last 7 days"
- "Create a feature flag for dark mode with 20% rollout"
- "List all active users who signed up this month"
- "Run a HogQL query to find top events"
- "Create a funnel for signup → activation → purchase"
- "Capture a custom event when users complete onboarding"

## Available Tools

**Analytics**: insights, trends, funnels, retention queries
**Feature Flags**: create, update, and manage flags
**Users**: search, update, merge, and delete person data
**Dashboards**: create and manage analytics dashboards
**Events**: capture custom events and query with HogQL
**Cohorts**: create and manage user segments
**Annotations**: mark deployments and key events on charts
**Actions**: define and track custom user actions

## Development

```bash
npm install           # Install dependencies
npm run build         # Build TypeScript
npm run dev           # Run in development mode
npm run typecheck     # Type check
npm run lint          # Lint code
```

## Troubleshooting

**Connection Issues**
- Verify `POSTHOG_HOST` matches your PostHog instance (US/EU/self-hosted)
- Check that personal API key starts with `phx_`
- Ensure `POSTHOG_PROJECT_ID` is correct (find it in PostHog project settings)

**Event Capture Not Working**
- Add a Project API Key (`phc_...`) from Project Settings → API Keys
- Personal API keys cannot be used for event capture

**Project-Scoped API Keys**
- If your personal key is project-scoped (most common), the MCP handles this automatically
- You can only access data from your configured project

## Links

- [PostHog Documentation](https://posthog.com/docs)
- [MCP Protocol](https://modelcontextprotocol.io)
- [GitHub Issues](https://github.com/ugzv/mcp-posthog/issues)

## License

MIT