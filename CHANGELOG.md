# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0]

### Breaking

- Migrated to modern `McpServer.registerTool()` API. Tool module signature is now `register(server, client)` instead of returning a tool map. External code that called `registerInsightsTools(client)` and composed the result must switch to the new shape.
- Removed unused `RATE_LIMIT_MAX_REQUESTS`, `CACHE_ENABLED`, and `CACHE_TTL` config options — they were read but never wired. Replaced by a built-in `429`/`5xx` retry with exponential backoff.

### Added

- **New tool domains**: `surveys`, `experiments`, `session_recordings` (15 new tools) → 55 total.
- **Tool annotations** on every tool: `readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`.
- **MCP resources**: `posthog://project/current` exposes the configured project.
- **MCP prompts**: `hogql_top_events`, `hogql_daily_active_users`, `hogql_funnel_template`.
- **Insights consolidation**: `insights_create` now accepts either simple-path fields (`insight_type` + `event` + `math`) or a raw `raw_query` — `insights_create_simple` was merged in.
- **`insights_delete`**, **`feature_flags_get`**, **`cohorts_get`** tools (previously missing).
- **Automatic retry** on `429` and 5xx responses with exponential backoff (respects `Retry-After`).
- **Jest test suite** using `axios-mock-adapter` (15 passing) covering HTTP client, retry, config, helpers.
- **GitHub Actions CI** running typecheck + lint + tests + build on Node 18/20/22.
- **ESLint 9 flat config**.

### Changed

- Bumped `@modelcontextprotocol/sdk` → `^1.29`, `axios` → `^1.15`, `dotenv` → `^17`, `zod` → `^3.25`.
- Node imports switched to `zod/v3` explicitly to stay aligned with the SDK's v3-based type compat layer and avoid `$ZodType` inference blowups.
- `PostHogClient` gained `getBaseUrl()` (was accessing private `defaults.baseURL`).
- `PostHogAPIError` messages now include status code + response details inline.
- Build: `tsc --noEmit` + esbuild bundle (single `dist/index.js`); dropped stale declaration emit.

### Fixed

- `npm audit` previously flagged 19 vulnerabilities (1 critical, 11 high). Now 0.
- `events_capture` throws early with a clear message when `POSTHOG_PROJECT_API_KEY` isn't set.
- `ts-jest` test config no longer trips over `noUnusedLocals` in test fixtures.

### Removed

- `test/test-*.js` ad-hoc smoke scripts with hardcoded placeholder creds (superseded by `tests/*.test.ts`).
- `feature_flags_evaluate` (unsupported with Personal API Keys — previously removed in `f3b2223`, kept out).

## [1.0.x]

### Changed

- Updated `@modelcontextprotocol/sdk` from 1.0.0 to 1.21.1.
- Fixed PostHog event capture endpoint from `/capture/` to `/i/v0/e`.

## [1.0.0] - 2024

### Added

- Initial release with Insights, Persons, Feature Flags, Dashboards, Events, Cohorts, HogQL, Projects, Annotations, Actions.
- Dual-key authentication (Personal + Project API keys).
- Project-scoped API key support with automatic endpoint handling.
- MCP protocol compliance via the low-level `Server` + `setRequestHandler` API.
