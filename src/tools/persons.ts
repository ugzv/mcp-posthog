import { z } from 'zod/v3';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PostHogClient } from '../client/posthog-client';
import { readOnly, update, destroy, textResult } from './_helpers';

export const personsSearchSchema = z.object({
  search_query: z.string().optional().describe('Search across person properties or name'),
  properties_filter: z.record(z.any()).optional().describe('Filter by person properties'),
  distinct_id: z.string().optional().describe('Filter by distinct ID'),
  limit: z.number().min(1).max(1000).default(100),
  offset: z.number().min(0).default(0),
  project_id: z.string().optional(),
});

export const personsGetSchema = z.object({
  person_id: z.string().describe('Person ID or UUID'),
  project_id: z.string().optional(),
});

export const personsUpdateSchema = z.object({
  person_id: z.string().describe('Person ID to update'),
  properties: z.record(z.any()).describe('Properties to update or add'),
  project_id: z.string().optional(),
});

export const personsMergeSchema = z.object({
  primary_person_id: z.string().describe('Primary person ID to keep'),
  person_ids_to_merge: z.array(z.string()).describe('Person IDs to merge into primary'),
  project_id: z.string().optional(),
});

export const personsDeleteSchema = z.object({
  person_id: z.string().optional().describe('Person ID to delete'),
  distinct_ids: z.array(z.string()).optional().describe('Distinct IDs to delete (resolved via search)'),
  delete_events: z.boolean().default(false).describe('Also delete associated events'),
  project_id: z.string().optional(),
});

export function registerPersonsTools(server: McpServer, client: PostHogClient): void {
  server.registerTool(
    'persons_search',
    {
      title: 'Search persons',
      description: 'Search and filter persons/users',
      inputSchema: personsSearchSchema.shape,
      annotations: readOnly,
    },
    async (input) => {
      const persons = await client.searchPersons(
        input.search_query,
        input.properties_filter,
        input.distinct_id,
        input.limit,
        input.offset,
        input.project_id,
      );
      return textResult(persons);
    },
  );

  server.registerTool(
    'persons_get',
    {
      title: 'Get person',
      description: 'Get detailed info about a specific person',
      inputSchema: personsGetSchema.shape,
      annotations: readOnly,
    },
    async (input) => {
      const person = await client.getPerson(input.person_id, input.project_id);
      return textResult(person);
    },
  );

  server.registerTool(
    'persons_update',
    {
      title: 'Update person',
      description: 'Update person properties',
      inputSchema: personsUpdateSchema.shape,
      annotations: update,
    },
    async (input) => {
      const person = await client.updatePerson(input.person_id, { properties: input.properties }, input.project_id);
      return textResult(person);
    },
  );

  server.registerTool(
    'persons_merge',
    {
      title: 'Merge persons',
      description: 'Merge multiple person records into a primary',
      inputSchema: personsMergeSchema.shape,
      annotations: update,
    },
    async (input) => {
      const person = await client.mergePersons(input.primary_person_id, input.person_ids_to_merge, input.project_id);
      return textResult(person);
    },
  );

  server.registerTool(
    'persons_delete',
    {
      title: 'Delete person(s)',
      description: 'Delete person records (GDPR). Either person_id or distinct_ids required.',
      inputSchema: personsDeleteSchema.shape,
      annotations: destroy,
    },
    async (input) => {
      if (!input.person_id && (!input.distinct_ids || input.distinct_ids.length === 0)) {
        throw new Error('Either person_id or distinct_ids must be provided');
      }

      if (input.person_id) {
        await client.deletePerson(input.person_id, input.delete_events, input.project_id);
        return textResult(`Person ${input.person_id} deleted`);
      }

      const results: string[] = [];
      for (const distinctId of input.distinct_ids ?? []) {
        try {
          const { results: [match] = [] } = await client.searchPersons(undefined, undefined, distinctId, 1, 0, input.project_id);
          if (match) {
            await client.deletePerson(match.id, input.delete_events, input.project_id);
            results.push(`Deleted distinct_id: ${distinctId}`);
          } else {
            results.push(`Not found: ${distinctId}`);
          }
        } catch (err) {
          results.push(`Error on ${distinctId}: ${(err as Error).message}`);
        }
      }
      return textResult(results.join('\n'));
    },
  );
}
