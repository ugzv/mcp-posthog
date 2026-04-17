# PostHog MCP Server

Connect Claude (and other MCP clients) to PostHog for analytics, feature flags, surveys, experiments, session recordings, and more.

- **55 tools** across 13 domains with proper MCP annotations (`readOnlyHint`, `destructiveHint`, `idempotentHint`)
- **3 HogQL prompt templates** (top events, DAU, funnels) for quick analytics
- **1 resource** (`posthog://project/current`) exposing project metadata
- Automatic retry on `429` / 5xx with exponential backoff
- stdio transport, built on `@modelcontextprotocol/sdk@^1.29`

## Quick Start

```bash
git clone https://github.com/ugzv/mcp-posthog.git
cd mcp-posthog
npm install
npm run build
```

You'll need two keys from PostHog:

| Key | Prefix | Where | Used for |
|-----|--------|-------|----------|
| Personal API Key | `phx_*` | Account Settings → Personal API Keys | Management API (required) |
| Project API Key | `phc_*` | Project Settings → API Keys | `events_capture` only (optional) |

## Configure

### Claude Desktop

`~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) — replace `/abs/path/` and swap host as appropriate (`https://us.posthog.com`, `https://eu.posthog.com`, or your self-hosted URL):

```json
{
  "mcpServers": {
    "posthog": {
      "command": "node",
      "args": ["/abs/path/mcp-posthog/dist/index.js"],
      "env": {
        "POSTHOG_HOST": "https://eu.posthog.com",
        "POSTHOG_API_KEY": "phx_...",
        "POSTHOG_PROJECT_API_KEY": "phc_...",
        "POSTHOG_PROJECT_ID": "12345"
      }
    }
  }
}
```

### Claude Code CLI

```bash
claude mcp add posthog \
  --env POSTHOG_HOST=https://eu.posthog.com \
  --env POSTHOG_API_KEY=phx_... \
  --env POSTHOG_PROJECT_API_KEY=phc_... \
  --env POSTHOG_PROJECT_ID=12345 \
  -- node /abs/path/mcp-posthog/dist/index.js
```

Verify: `claude mcp list`.

## Tool catalog

| Domain | Tools |
|--------|-------|
| Insights | `insights_create`, `insights_retrieve`, `insights_list`, `insights_update`, `insights_delete` |
| Persons | `persons_search`, `persons_get`, `persons_update`, `persons_merge`, `persons_delete` |
| Feature flags | `feature_flags_list`, `feature_flags_get`, `feature_flags_create`, `feature_flags_update`, `feature_flags_delete` |
| Dashboards | `dashboards_list`, `dashboards_get`, `dashboards_create`, `dashboards_update`, `dashboards_delete` |
| Events | `events_capture`, `events_query` |
| Cohorts | `cohorts_list`, `cohorts_get`, `cohorts_create`, `cohorts_get_members` |
| Projects | `projects_list`, `projects_get` |
| Query (HogQL) | `query_hogql`, `query_export` |
| Annotations | `annotations_list`, `annotations_create`, `annotations_retrieve`, `annotations_update`, `annotations_delete` |
| Actions | `actions_list`, `actions_create`, `actions_retrieve`, `actions_update`, `actions_delete` |
| **Surveys** | `surveys_list`, `surveys_get`, `surveys_create`, `surveys_update`, `surveys_delete`, `surveys_stats` |
| **Experiments** | `experiments_list`, `experiments_get`, `experiments_create`, `experiments_update`, `experiments_delete`, `experiments_duplicate` |
| **Session recordings** | `session_recordings_list`, `session_recordings_get`, `session_recordings_delete` |

Prompts: `hogql_top_events`, `hogql_daily_active_users`, `hogql_funnel_template`.

## Development

```bash
npm install        # install deps (0 vulnerabilities)
npm run dev        # run server with tsx (hot)
npm run build      # typecheck + esbuild bundle to dist/
npm run typecheck  # tsc --noEmit
npm run lint       # eslint (flat config)
npm test           # jest
```

Tests are fully mocked (`axios-mock-adapter`) — no network calls. Coverage includes the HTTP client (retry, errors, project-scoping), helpers, and config loading.

## Environment variables

| Var | Required | Purpose |
|-----|----------|---------|
| `POSTHOG_HOST` | yes | API host (e.g. `https://eu.posthog.com`) |
| `POSTHOG_API_KEY` | yes | Personal API key (`phx_*`) |
| `POSTHOG_PROJECT_API_KEY` | no | Project key (`phc_*`) for event capture |
| `POSTHOG_PROJECT_ID` | no | Default project ID (required for most tools when using a scoped key) |
| `MCP_SERVER_NAME` | no | Override server identity |
| `MCP_SERVER_VERSION` | no | Override reported version |

You can also use a `posthog-mcp.config.json` file (`posthog-mcp --init` creates a template). Env vars take precedence.

## Troubleshooting

- **`401` / `authentication_failed`**: `POSTHOG_HOST` is wrong. Use `https://eu.posthog.com` or `https://us.posthog.com` — **not** the `eu.i.posthog.com` ingestion host.
- **`Project ID is required`**: Set `POSTHOG_PROJECT_ID` or pass `project_id` per-tool.
- **`Event capture requires a project API key`**: Set `POSTHOG_PROJECT_API_KEY` (`phc_*`).
- **Scoped key limitations**: If your personal key is project-scoped (the common case), `projects_list` returns only the configured project.

## Links

- PostHog API docs: https://posthog.com/docs/api
- MCP specification: https://modelcontextprotocol.io
- Issues: https://github.com/ugzv/mcp-posthog/issues

## License

MIT
