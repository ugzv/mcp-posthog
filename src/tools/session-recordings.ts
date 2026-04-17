import { z } from 'zod/v3';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { PostHogClient } from '../client/posthog-client';
import { readOnly, destroy, textResult } from './_helpers';

export const sessionRecordingsListSchema = z.object({
  limit: z.number().min(1).max(500).default(50),
  offset: z.number().min(0).default(0),
  distinct_id: z.string().optional().describe('Filter by user distinct ID'),
  date_from: z.string().optional().describe('Start date (e.g. -7d or ISO)'),
  date_to: z.string().optional(),
  project_id: z.string().optional(),
});

export const sessionRecordingsGetSchema = z.object({
  recording_id: z.string(),
  project_id: z.string().optional(),
});

export const sessionRecordingsDeleteSchema = z.object({
  recording_id: z.string(),
  project_id: z.string().optional(),
});

export function registerSessionRecordingsTools(server: McpServer, client: PostHogClient): void {
  server.registerTool(
    'session_recordings_list',
    {
      title: 'List session recordings',
      description: 'List session recordings with optional user/date filters',
      inputSchema: sessionRecordingsListSchema.shape,
      annotations: readOnly,
    },
    async (input) =>
      textResult(
        await client.listSessionRecordings(
          input.limit,
          input.offset,
          input.distinct_id,
          input.date_from,
          input.date_to,
          input.project_id,
        ),
      ),
  );

  server.registerTool(
    'session_recordings_get',
    {
      title: 'Get session recording metadata',
      description: 'Get metadata for a session recording. Raw replay JSON is not returned by the API.',
      inputSchema: sessionRecordingsGetSchema.shape,
      annotations: readOnly,
    },
    async (input) => textResult(await client.getSessionRecording(input.recording_id, input.project_id)),
  );

  server.registerTool(
    'session_recordings_delete',
    {
      title: 'Delete session recording',
      description: 'Delete a session recording',
      inputSchema: sessionRecordingsDeleteSchema.shape,
      annotations: destroy,
    },
    async (input) => {
      await client.deleteSessionRecording(input.recording_id, input.project_id);
      return textResult(`Recording ${input.recording_id} deleted`);
    },
  );
}
