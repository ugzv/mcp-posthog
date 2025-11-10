# Claude Code CLI Setup Guide for PostHog MCP Server

This guide explains how to properly configure the PostHog MCP server with Claude Code CLI.

## Prerequisites

- Claude Code CLI installed (`npm install -g @anthropic-ai/claude-code`)
- Node.js 18+ installed
- PostHog account with API access

## Installation Steps

### 1. Clone and Build the MCP Server

```bash
# Clone the repository
git clone https://github.com/ugzv/mcp-posthog.git
cd mcp-posthog

# Install dependencies
npm install

# Build the server
npm run build
```

This creates the compiled server at `dist/index.js`.

### 2. Configure the MCP Server with Claude Code

Claude Code CLI uses the `claude mcp add` command to register MCP servers. There are three scope levels:

- **Local** (default): Available only in the current project directory
- **Project**: Shared via `.mcp.json` file (version controlled)
- **User**: Available across all your projects

#### Option A: Local Scope (Recommended for Testing)

```bash
claude mcp add --transport stdio posthog \
  --env POSTHOG_HOST=https://eu.posthog.com \
  --env POSTHOG_API_KEY=your_personal_api_key \
  --env POSTHOG_PROJECT_ID=your_project_id \
  -- node /absolute/path/to/mcp-posthog/dist/index.js
```

Example:
```bash
claude mcp add --transport stdio posthog \
  --env POSTHOG_HOST=https://eu.posthog.com \
  --env POSTHOG_API_KEY=phx_OqSpWAAV2MMZYXQ0df8NXGhlwFPAMfKjdYHBWh4JrYogaOd \
  --env POSTHOG_PROJECT_ID=67581 \
  -- node /Users/urosgazvoda/dev/mcp-posthog/dist/index.js
```

#### Option B: Project Scope (For Teams)

Add `--scope project` to share the configuration:

```bash
claude mcp add --scope project --transport stdio posthog \
  --env POSTHOG_HOST=https://eu.posthog.com \
  --env POSTHOG_API_KEY=phx_OqSpWAAV2MMZYXQ0df8NXGhlwFPAMfKjdYHBWh4JrYogaOd \
  --env POSTHOG_PROJECT_ID=67581 \
  -- node /Users/urosgazvoda/dev/mcp-posthog/dist/index.js
```

This creates a `.mcp.json` file in your project that can be committed to version control.

#### Option C: User Scope (Global)

Add `--scope user` to make it available everywhere:

```bash
claude mcp add --scope user --transport stdio posthog \
  --env POSTHOG_HOST=https://eu.posthog.com \
  --env POSTHOG_API_KEY=phx_OqSpWAAV2MMZYXQ0df8NXGhlwFPAMfKjdYHBWh4JrYogaOd \
  --env POSTHOG_PROJECT_ID=67581 \
  -- node /Users/urosgazvoda/dev/mcp-posthog/dist/index.js
```

### 3. Verify Installation

```bash
# List all configured MCP servers
claude mcp list
```

You should see:
```
Checking MCP server health...

posthog: node /path/to/mcp-posthog/dist/index.js - ✓ Connected
```

### 4. Test in Claude Code CLI

Start Claude Code in your project directory:

```bash
cd /path/to/your/project
claude
```

Type `/mcp` to see available MCP servers. The PostHog server should be listed.

## Configuration Details

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `POSTHOG_HOST` | Your PostHog instance URL | `https://eu.posthog.com` or `https://us.posthog.com` |
| `POSTHOG_API_KEY` | Personal API key (starts with `phx_`) | `phx_OqSpWAAV2MMZYXQ0df8NXGhlwFPAMfKjdYHBWh4JrYogaOd` |
| `POSTHOG_PROJECT_ID` | Your PostHog project ID | `67581` |

### Optional Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `POSTHOG_PROJECT_API_KEY` | Project API key for event capture (starts with `phc_`) | `phc_xxx` |

### How to Get Your Credentials

1. **PostHog Host**: Check your PostHog URL (EU: `https://eu.posthog.com`, US: `https://us.posthog.com`)
2. **Project ID**: Found in your PostHog project URL: `https://eu.posthog.com/project/{PROJECT_ID}/`
3. **Personal API Key**:
   - Go to PostHog Settings → Personal API Keys
   - Create a new key with required permissions
   - Starts with `phx_`
4. **Project API Key** (optional, for event capture):
   - Go to Project Settings → Project API Key
   - Starts with `phc_`

## Storage Locations

Claude Code stores MCP configurations in:

- **Local scope**: `~/.claude.json` under the project path
- **Project scope**: `.mcp.json` in project root (can be committed)
- **User scope**: `~/.claude.json` at the user level

## Managing MCP Servers

```bash
# List all servers
claude mcp list

# Get details about a specific server
claude mcp get posthog

# Remove a server
claude mcp remove posthog

# Enable/disable servers (in conversation)
# Type: /mcp
# Or @mention: @posthog to toggle
```

## Troubleshooting

### "No MCP servers configured"

This means the server wasn't added or is in a different scope. Run:
```bash
claude mcp list
```

If empty, re-run the `claude mcp add` command.

### Server shows "✗ Failed" in `claude mcp list`

1. **Check the build**: Ensure `dist/index.js` exists
   ```bash
   ls -la /path/to/mcp-posthog/dist/index.js
   ```

2. **Test the server directly**:
   ```bash
   node /path/to/mcp-posthog/dist/index.js --help
   ```

3. **Verify environment variables**: Check API key and host are correct

4. **Check logs**: When Claude Code starts, it logs MCP server connection issues

### "Tool names must be unique" error

This occurs when multiple MCP servers expose tools with the same name. Disable conflicting servers:
```bash
# In conversation, type:
/mcp
# Then toggle off the conflicting server
```

### Permission denied errors

Ensure the PostHog API key has the required permissions for the operations you're attempting.

## Available Tools

Once configured, you'll have access to these PostHog tools:

### Analytics & Insights
- `insights_create` - Create analytics insights (trends, funnels, retention)
- `insights_list` - List all insights
- `insights_get` - Get insight details
- `insights_update` - Update an insight
- `insights_delete` - Delete an insight

### Person Management
- `persons_search` - Search for users
- `persons_get` - Get person details
- `persons_delete` - Delete person data (GDPR)

### Feature Flags
- `feature_flags_list` - List feature flags
- `feature_flags_create` - Create feature flags
- `feature_flags_update` - Update feature flags
- `feature_flags_delete` - Delete feature flags

### Dashboards
- `dashboards_list` - List dashboards
- `dashboards_create` - Create dashboards
- `dashboards_update` - Update dashboards
- `dashboards_delete` - Delete dashboards

### Events
- `events_capture` - Capture custom events
- `events_query` - Query events

### HogQL Queries
- `query_execute` - Execute HogQL queries
- `query_export` - Export query results

### Cohorts
- `cohorts_list` - List user cohorts
- `cohorts_create` - Create cohorts
- `cohorts_update` - Update cohorts

### Annotations
- `annotations_list` - List annotations
- `annotations_create` - Create annotations

### Actions
- `actions_list` - List actions
- `actions_create` - Create actions

### Projects
- `projects_list` - List projects

## Example Usage

Once configured, you can ask Claude Code:

```
"Show me the top 10 most active users from the last 7 days"
"Create a funnel insight for signup to first purchase"
"What's the retention rate for users who signed up last month?"
"List all active feature flags"
"Create a cohort of users who visited in the last 30 days"
```

## Best Practices

1. **Never commit API keys** - Use local or user scope, not project scope with hardcoded keys
2. **Use project-scoped API keys** when possible for better security
3. **Test with `claude mcp list`** after making changes
4. **Rebuild after code changes**: Run `npm run build` after modifying the server code
5. **Use absolute paths** in the `claude mcp add` command to avoid path resolution issues

## Updating the Server

```bash
cd /path/to/mcp-posthog
git pull
npm install
npm run build

# Server will automatically use the updated version
# No need to re-run `claude mcp add`
```

## Differences from Claude Desktop

Claude Desktop uses a different configuration file (`claude_desktop_config.json`), while Claude Code CLI uses:
- `~/.claude.json` for local/user scopes
- `.mcp.json` for project scope

You can import Claude Desktop MCP servers:
```bash
claude mcp add-from-claude-desktop
```

## Security Considerations

- **API Key Safety**: Never commit personal API keys to version control
- **Scope Selection**: Use local scope for personal keys, project scope only for shared/limited keys
- **Rate Limits**: Be aware of PostHog API rate limits (see README.md)
- **Third-party Risk**: "Use third party MCP servers at your own risk" - verify server code before use

## Further Reading

- [Claude Code MCP Documentation](https://code.claude.com/docs/en/mcp.md)
- [PostHog API Documentation](https://posthog.com/docs/api)
- [Model Context Protocol Specification](https://modelcontextprotocol.io)
- [MCP Server Directory](https://github.com/modelcontextprotocol/servers)

## Getting Help

If you encounter issues:

1. Check `claude mcp list` to verify the server is connected
2. Run `claude doctor` to diagnose common issues
3. Review the [PostHog MCP README](./README.md) for server-specific details
4. Open an issue on the [GitHub repository](https://github.com/ugzv/mcp-posthog/issues)
