# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What this is

A PostHog MCP server (v2.x) exposing 55 tools, 3 prompt templates, and 1 resource via the Model Context Protocol over stdio. Built on `@modelcontextprotocol/sdk@^1.29`.

## Commands

```bash
npm install         # install deps
npm run dev         # run with tsx (no build)
npm run build       # typecheck + esbuild bundle → dist/index.js
npm start           # run built version
npm run typecheck   # tsc --noEmit
npm run lint        # eslint (flat config)
npm test            # jest (mocked, no network)
npm link            # install globally as `posthog-mcp`
```

## Layout

```
src/
├── index.ts                  # CLI entrypoint, handles --init/--help, graceful shutdown
├── server.ts                 # PostHogMCPServer class — composes McpServer + registers all tools/resources/prompts
├── config.ts                 # loadConfig() — env vars + optional posthog-mcp.config.json
├── resources.ts              # MCP resources (posthog://project/current)
├── prompts.ts                # MCP prompts (HogQL templates)
├── client/
│   └── posthog-client.ts     # axios wrapper with retry on 429/5xx, PostHogAPIError
├── tools/
│   ├── _helpers.ts           # annotation presets (readOnly/create/update/destroy), textResult()
│   ├── insights.ts           # 5 tools: create/retrieve/list/update/delete
│   ├── persons.ts            # 5 tools
│   ├── feature-flags.ts      # 5 tools
│   ├── dashboards.ts         # 5 tools
│   ├── events.ts             # 2 tools: capture, query
│   ├── cohorts.ts            # 4 tools
│   ├── projects.ts           # 2 tools
│   ├── query.ts              # 2 tools: hogql, export
│   ├── annotations.ts        # 5 tools
│   ├── actions.ts            # 5 tools
│   ├── surveys.ts            # 6 tools
│   ├── experiments.ts        # 7 tools
│   └── session-recordings.ts # 3 tools
└── types/posthog.ts          # Shared API types
tests/                        # Jest unit tests w/ axios-mock-adapter
```

## Tool module pattern

```ts
import { z } from 'zod/v3';                                    // CRITICAL: zod/v3 (not 'zod')
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { readOnly, create, update, destroy, textResult } from './_helpers';

export const fooListSchema = z.object({ limit: z.number().default(100) });

export function registerFooTools(server: McpServer, client: PostHogClient): void {
  server.registerTool(
    'foo_list',
    {
      title: 'List foos',
      description: '...',
      inputSchema: fooListSchema.shape,   // pass shape, not the ZodObject
      annotations: readOnly,              // from _helpers
    },
    async (input) => textResult(await client.listFoos(input.limit)),
  );
}
```

**Why `zod/v3` not `zod`?** The MCP SDK's `ZodRawShapeCompat` type is anchored on `zod/v3` internals. Importing from the top-level `zod` package causes TypeScript to also explore the v4 preview types (`$ZodType`), which combined with the SDK's complex generics triggers "type instantiation is excessively deep" and OOMs the compiler.

## Registering new tool domains

1. Create `src/tools/{domain}.ts` following the pattern above.
2. Add required client methods to `src/client/posthog-client.ts`.
3. Wire it in `src/server.ts` — add the import and call `registerFooTools(this.server, this.client)` in `registerAll()`.

## Annotation conventions

- `readOnly` — GETs / searches / retrieves.
- `create` — POSTs that create new entities.
- `update` — PATCHes / merges / archives.
- `destroy` — deletes (hard or soft).

## PostHog API quirks

- **Host**: API lives at `https://eu.posthog.com` / `https://us.posthog.com`. The `*.i.posthog.com` hosts are **ingestion only** — personal API keys won't work there.
- **Project-scoped keys**: If `phx_*` is scoped to one project, `/api/projects/` returns 403. `listProjects()` works around this by returning just the configured project.
- **Event capture**: Uses `/i/v0/e` with `api_key` in body (project key, not personal).
- **HogQL**: Wrapped in `{ query: { kind: 'HogQLQuery', query: '...' } }`. Must have `LIMIT` — auto-injected by client if missing.
- **Insights**: Use `InsightVizNode` wrapper around `TrendsQuery`/`FunnelsQuery`/etc. `insights_create` supports both simple (`insight_type` + `event` + `math`) and advanced (`raw_query`) paths.
- **Annotations & actions**: Hard delete not allowed — tools PATCH `deleted: true`.
- **Retries**: client auto-retries up to 2× on `429` (honoring `Retry-After`) and 5xx with exponential backoff.

## Testing

- `jest` + `ts-jest` + `axios-mock-adapter`. No network.
- `jest.mock('dotenv', ...)` is needed in `config.test.ts` to prevent real `.env` from leaking in.
- When adding a new client method, add at least one happy-path test in `tests/client.test.ts`.

## Config precedence

Env vars > `posthog-mcp.config.json` > defaults.

Required: `POSTHOG_HOST`, `POSTHOG_API_KEY`.
Optional: `POSTHOG_PROJECT_API_KEY` (for capture), `POSTHOG_PROJECT_ID`, `MCP_SERVER_NAME`, `MCP_SERVER_VERSION`.

## Transport

stdio only. Server logs go to stderr (`console.error`) to avoid corrupting the stdout JSON-RPC stream.
