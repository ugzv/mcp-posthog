import { z } from 'zod';
import { PostHogClient } from '../client/posthog-client';

export const personsSearchSchema = z.object({
  search_query: z.string().optional().describe('Search query for person properties or name'),
  properties_filter: z.record(z.any()).optional().describe('Filter by person properties'),
  distinct_id: z.string().optional().describe('Filter by distinct ID'),
  limit: z.number().min(1).max(1000).default(100).describe('Maximum number of results'),
  offset: z.number().min(0).default(0).describe('Number of results to skip'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const personsGetSchema = z.object({
  person_id: z.string().describe('Person ID or UUID to retrieve'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const personsUpdateSchema = z.object({
  person_id: z.string().describe('Person ID to update'),
  properties: z.record(z.any()).describe('Properties to update or add'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const personsMergeSchema = z.object({
  primary_person_id: z.string().describe('Primary person ID to keep'),
  person_ids_to_merge: z.array(z.string()).describe('Person IDs to merge into primary'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export const personsDeleteSchema = z.object({
  person_id: z.string().optional().describe('Person ID to delete'),
  distinct_ids: z.array(z.string()).optional().describe('Distinct IDs of persons to delete'),
  delete_events: z.boolean().default(false).describe('Whether to delete associated events'),
  project_id: z.string().optional().describe('Project ID (uses default if not provided)')
});

export function registerPersonsTools(client: PostHogClient) {
  return {
    persons_search: {
      description: 'Search and filter persons/users',
      inputSchema: personsSearchSchema,
      handler: async (input: z.infer<typeof personsSearchSchema>) => {
        const persons = await client.searchPersons(
          input.search_query,
          input.properties_filter,
          input.distinct_id,
          input.limit,
          input.offset,
          input.project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(persons, null, 2)
          }]
        };
      }
    },

    persons_get: {
      description: 'Get detailed information about a specific person',
      inputSchema: personsGetSchema,
      handler: async (input: z.infer<typeof personsGetSchema>) => {
        const person = await client.getPerson(input.person_id, input.project_id);
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(person, null, 2)
          }]
        };
      }
    },

    persons_update: {
      description: 'Update person properties',
      inputSchema: personsUpdateSchema,
      handler: async (input: z.infer<typeof personsUpdateSchema>) => {
        const person = await client.updatePerson(
          input.person_id,
          { properties: input.properties },
          input.project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(person, null, 2)
          }]
        };
      }
    },

    persons_merge: {
      description: 'Merge multiple person records',
      inputSchema: personsMergeSchema,
      handler: async (input: z.infer<typeof personsMergeSchema>) => {
        const person = await client.mergePersons(
          input.primary_person_id,
          input.person_ids_to_merge,
          input.project_id
        );
        
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(person, null, 2)
          }]
        };
      }
    },

    persons_delete: {
      description: 'Delete person records (GDPR compliance)',
      inputSchema: personsDeleteSchema,
      handler: async (input: z.infer<typeof personsDeleteSchema>) => {
        if (!input.person_id && (!input.distinct_ids || input.distinct_ids.length === 0)) {
          throw new Error('Either person_id or distinct_ids must be provided');
        }

        if (input.person_id) {
          await client.deletePerson(input.person_id, input.delete_events, input.project_id);
          return {
            content: [{
              type: 'text' as const,
              text: `Person ${input.person_id} deleted successfully`
            }]
          };
        }

        // For bulk deletion by distinct_ids, we'd need to first search for persons
        // then delete them individually
        const deletionResults = [];
        if (input.distinct_ids) {
          for (const distinctId of input.distinct_ids) {
            try {
              const searchResult = await client.searchPersons(
                undefined,
                undefined,
                distinctId,
                1,
                0,
                input.project_id
              );
              
              if (searchResult.results.length > 0) {
                await client.deletePerson(
                  searchResult.results[0].id,
                  input.delete_events,
                  input.project_id
                );
                deletionResults.push(`Deleted person with distinct_id: ${distinctId}`);
              } else {
                deletionResults.push(`No person found with distinct_id: ${distinctId}`);
              }
            } catch (error) {
              deletionResults.push(`Error deleting person with distinct_id ${distinctId}: ${error}`);
            }
          }
        }

        return {
          content: [{
            type: 'text' as const,
            text: deletionResults.join('\n')
          }]
        };
      }
    }
  };
}