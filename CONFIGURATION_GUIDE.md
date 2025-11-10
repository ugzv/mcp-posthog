# PostHog MCP Configuration Guide

This guide explains how to configure the PostHog MCP server, where to put your configuration, and what access levels you get with different API key setups.

## Table of Contents

1. [Configuration Locations](#configuration-locations)
2. [API Key Types & Access Levels](#api-key-types--access-levels)
3. [Configuration Methods](#configuration-methods)
4. [Access Matrix](#access-matrix)
5. [Common Scenarios](#common-scenarios)
6. [Security Best Practices](#security-best-practices)

---

## Configuration Locations

The PostHog MCP server supports multiple configuration methods, loaded in this order of precedence:

### 1. Environment Variables (Highest Priority)
Set environment variables in your shell or in a `.env` file:

```bash
POSTHOG_HOST=https://app.posthog.com
POSTHOG_API_KEY=phx_abc123...
POSTHOG_PROJECT_API_KEY=phc_xyz789...
POSTHOG_PROJECT_ID=12345
```

### 2. Configuration File
Create `posthog-mcp.config.json` in your working directory:

```bash
posthog-mcp --init
```

This creates:
```json
{
  "host": "https://posthog.myteam.network",
  "apiKey": "phx_your_personal_api_key",
  "projectApiKey": "phc_your_project_api_key",
  "projectId": "1"
}
```

### 3. Claude Desktop Configuration
For Claude Desktop, configure in the MCP settings:

**Location:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**Example:**
```json
{
  "mcpServers": {
    "posthog-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-posthog/dist/index.js"],
      "env": {
        "POSTHOG_HOST": "https://app.posthog.com",
        "POSTHOG_API_KEY": "phx_your_personal_api_key",
        "POSTHOG_PROJECT_API_KEY": "phc_your_project_api_key",
        "POSTHOG_PROJECT_ID": "12345"
      }
    }
  }
}
```

### 4. Claude Code CLI Configuration
For Claude Code, add via MCP command:

```bash
claude mcp add --transport stdio posthog \
  --env POSTHOG_HOST=https://app.posthog.com \
  --env POSTHOG_API_KEY=phx_your_personal_api_key \
  --env POSTHOG_PROJECT_API_KEY=phc_your_project_api_key \
  --env POSTHOG_PROJECT_ID=12345 \
  -- node /absolute/path/to/mcp-posthog/dist/index.js
```

---

## API Key Types & Access Levels

PostHog has **two different types of API keys** with distinct purposes:

### 1. Personal API Key (Required)

**Format**: Starts with `phx_` (e.g., `phx_abc123xyz...`)

**Where to Get It**:
- PostHog → Account Settings → Personal API Keys
- Click "Create Personal API Key"

**Scopes**:
- **Project-Scoped** (Most Common): Limited to specific project(s)
- **Organization-Level** (Rare): Access to all projects in organization

**What It Does**:
- ✅ Query analytics data (insights, trends, funnels)
- ✅ Manage dashboards
- ✅ Create and manage feature flags
- ✅ Search and manage persons (users)
- ✅ Create and manage cohorts
- ✅ Execute HogQL queries
- ✅ Manage annotations
- ✅ Manage actions
- ❌ **Cannot** capture events (needs Project API Key)

### 2. Project API Key (Optional)

**Format**: Starts with `phc_` (e.g., `phc_xyz789abc...`)

**Where to Get It**:
- PostHog → Project Settings → API Keys
- Copy the "Project API Key"

**What It Does**:
- ✅ Capture/send events to PostHog
- ❌ **Cannot** do anything else (no queries, no management)

**When You Need It**:
- Only if you want to **send events** using `events_capture` tool
- Not needed for read-only analytics or dashboard management

---

## Access Matrix

Here's what you can do with different API key configurations:

| Feature | Personal API Key Only | Personal + Project API Keys |
|---------|----------------------|----------------------------|
| **Analytics & Insights** | ✅ Full Access | ✅ Full Access |
| **Dashboards** | ✅ Full Access | ✅ Full Access |
| **Feature Flags** | ✅ Full Access | ✅ Full Access |
| **Persons Management** | ✅ Full Access | ✅ Full Access |
| **Cohorts** | ✅ Full Access | ✅ Full Access |
| **HogQL Queries** | ✅ Full Access | ✅ Full Access |
| **Event Queries** | ✅ Full Access | ✅ Full Access |
| **Event Capture** | ❌ **Disabled** | ✅ **Enabled** |
| **Annotations** | ✅ Full Access | ✅ Full Access |
| **Actions** | ✅ Full Access | ✅ Full Access |
| **Projects List** | ✅ Access to scoped project(s) | ✅ Access to scoped project(s) |

### Project-Scoped vs Organization-Level Personal Keys

| Feature | Project-Scoped Personal Key | Organization-Level Personal Key |
|---------|---------------------------|--------------------------------|
| **Your Project Data** | ✅ Full Access | ✅ Full Access |
| **Other Projects** | ❌ No Access | ✅ Full Access |
| **Most Use Cases** | ✅ **Recommended** | ⚠️ Rarely Needed |
| **Security** | 🔒 More Secure (limited scope) | ⚠️ Broader access |

> **Note**: Most users have project-scoped personal API keys, and this is perfectly fine! The MCP server automatically handles project-scoped keys.

---

## Common Scenarios

### Scenario 1: Analytics Dashboard Creation (Read-Only)

**What You Need**:
- ✅ Personal API Key (project-scoped is fine)
- ❌ No Project API Key needed

**Configuration**:
```json
{
  "host": "https://app.posthog.com",
  "apiKey": "phx_your_personal_api_key",
  "projectId": "12345"
}
```

**What You Can Do**:
- Query analytics data
- Create insights and dashboards
- Manage feature flags
- Search users
- Execute HogQL queries

**What You Cannot Do**:
- Send new events to PostHog

---

### Scenario 2: Full Access (Analytics + Event Capture)

**What You Need**:
- ✅ Personal API Key (project-scoped is fine)
- ✅ Project API Key

**Configuration**:
```json
{
  "host": "https://app.posthog.com",
  "apiKey": "phx_your_personal_api_key",
  "projectApiKey": "phc_your_project_api_key",
  "projectId": "12345"
}
```

**What You Can Do**:
- Everything from Scenario 1, PLUS:
- Send custom events using `events_capture` tool

---

### Scenario 3: Multi-Project Organization

**What You Need**:
- ✅ Organization-level Personal API Key (rare)
- ✅ Optional: Project API Key for event capture

**Configuration**:
```json
{
  "host": "https://app.posthog.com",
  "apiKey": "phx_your_org_level_api_key"
}
```

**What You Can Do**:
- Access multiple projects
- Use `projects_list` to see all projects
- Switch between projects using `project_id` parameter in tools

**Note**: Most users don't need this! Project-scoped keys are more secure and sufficient for most use cases.

---

### Scenario 4: Claude Desktop Integration

**Best Practice Configuration**:

1. Open Claude Desktop config:
   ```bash
   # macOS
   code ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

2. Add PostHog MCP:
   ```json
   {
     "mcpServers": {
       "posthog-mcp": {
         "command": "node",
         "args": ["/Users/you/dev/mcp-posthog/dist/index.js"],
         "env": {
           "POSTHOG_HOST": "https://app.posthog.com",
           "POSTHOG_API_KEY": "phx_abc123...",
           "POSTHOG_PROJECT_API_KEY": "phc_xyz789...",
           "POSTHOG_PROJECT_ID": "12345"
         }
       }
     }
   }
   ```

3. Restart Claude Desktop

4. Test with: "Show me the top 10 events from last week"

---

## Security Best Practices

### 1. Never Commit API Keys

Add to `.gitignore`:
```
.env
posthog-mcp.config.json
**/claude_desktop_config.json
```

### 2. Use Project-Scoped Keys

Unless you specifically need organization-level access, always use project-scoped personal API keys:
- ✅ More secure (limited scope)
- ✅ Easier to rotate
- ✅ Reduces blast radius of key compromise

### 3. Rotate Keys Regularly

PostHog allows creating multiple personal API keys:
1. Create a new key
2. Update your configuration
3. Test the new key
4. Delete the old key

### 4. Use Environment Variables in Production

For production deployments, prefer environment variables over config files:
```bash
# Secure
export POSTHOG_API_KEY="phx_..."

# Less secure
echo '{"apiKey": "phx_..."}' > config.json
```

### 5. Minimal Permissions Principle

Only configure the Project API Key if you need event capture:
- Read-only analytics? → Personal API Key only
- Need to send events? → Add Project API Key

---

## Configuration Validation

### Check Your Configuration

Run the server with:
```bash
posthog-mcp
```

Look for startup messages:
```
[PostHog MCP Server] Started successfully
[PostHog MCP Server] Connected to https://app.posthog.com
```

### Test Personal API Key

Try listing insights:
```javascript
// In Claude Desktop or Claude Code
"List my PostHog insights"
```

### Test Project API Key

Try capturing an event:
```javascript
// In Claude Desktop or Claude Code
"Capture a test event with name 'mcp_test' for user 'test_user_123'"
```

If Project API Key is missing:
```
Failed to capture event: ...
Note: Event capture requires a project API key to be configured.
```

---

## Troubleshooting

### Error: "POSTHOG_HOST is required"

**Solution**: Set the host in one of:
1. Environment variable: `export POSTHOG_HOST=https://app.posthog.com`
2. Config file: `{"host": "https://app.posthog.com"}`

### Error: "POSTHOG_API_KEY is required"

**Solution**: Set your personal API key:
1. Get it from PostHog → Account Settings → Personal API Keys
2. Set: `export POSTHOG_API_KEY=phx_...`

### Error: "API keys with scoped projects"

**This is NOT an error!** It's informational:
- ✅ Your key works fine
- ✅ It's project-scoped (normal and secure)
- ✅ You can only access your configured project
- ℹ️ Use `projects_list` to see which project you have access to

### Event Capture Returns Error

**Solution**: Configure Project API Key:
1. Get it from PostHog → Project Settings → API Keys
2. Set: `export POSTHOG_PROJECT_API_KEY=phc_...`

### Wrong Project Data

**Solution**: Set the correct project ID:
1. Find your project ID in PostHog URL: `app.posthog.com/project/12345`
2. Set: `export POSTHOG_PROJECT_ID=12345`

---

## What's Next?

After configuration, see:
- **[README.md](./README.md)** - Full feature list and examples
- **[CLAUDE_CODE_SETUP.md](./CLAUDE_CODE_SETUP.md)** - Claude Code specific setup
- **[CLAUDE.md](./CLAUDE.md)** - Architecture and development guide

## Questions?

- GitHub Issues: https://github.com/yourusername/mcp-posthog/issues
- PostHog Docs: https://posthog.com/docs/api
- MCP Docs: https://modelcontextprotocol.io
