import { z } from 'zod/v3';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PostHogClient } from '../client/posthog-client';
import { readOnly, textResult } from './_helpers';

export const queryHogqlSchema = z.object({
  query: z.string().describe('HogQL query'),
  variables: z.record(z.any()).optional(),
  limit: z.number().min(1).max(10000).default(100),
  project_id: z.string().optional(),
});

export const queryExportSchema = z.object({
  query: z.string(),
  format: z.enum(['csv', 'json']).default('json'),
  project_id: z.string().optional(),
});

export function registerQueryTools(server: McpServer, client: PostHogClient): void {
  server.registerTool(
    'query_hogql',
    {
      title: 'Run HogQL query',
      description:
        'Execute a HogQL query against the PostHog events/persons store. ' +
        'HogQL placeholder syntax: {name} (plain braces, no type annotation) bound from the variables argument. ' +
        'Schema note for $exception events: properties use plural ARRAY names — ' +
        '$exception_types, $exception_values, $exception_sources, $exception_stack_trace_raw ' +
        '(and scalar $exception_fingerprint). The singular $exception_type / $exception_message ' +
        'do not exist; querying them returns NULL silently. Read via arrayElement(field, 1). ' +
        'If a field returns all NULL, run SELECT JSONExtractKeys(properties) ... LIMIT 1 first.',
      inputSchema: queryHogqlSchema.shape,
      annotations: readOnly,
    },
    async (input) => {
      const result = await client.executeHogQL(input.query, input.variables, input.limit, input.project_id);
      return textResult(result);
    },
  );

  server.registerTool(
    'query_export',
    {
      title: 'Export query results',
      description: 'Run a HogQL query and return results as CSV or JSON',
      inputSchema: queryExportSchema.shape,
      annotations: readOnly,
    },
    async (input) => {
      const result = await client.executeHogQL(input.query, undefined, 10000, input.project_id);

      if (input.format === 'csv' && result.columns && result.results) {
        const csv = [
          result.columns.join(','),
          ...result.results.map((row: unknown[]) =>
            row
              .map((cell) => {
                if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
                  return `"${cell.replace(/"/g, '""')}"`;
                }
                return cell;
              })
              .join(','),
          ),
        ].join('\n');
        return textResult(csv);
      }
      return textResult(result);
    },
  );
}
