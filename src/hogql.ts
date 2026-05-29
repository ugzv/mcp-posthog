/**
 * HogQL authoring guidance and runtime error enrichment.
 *
 * Derived from real query failures observed in production: agents invent
 * columns (`min_timestamp`), aggregate string properties without casting
 * (`avg(properties.$session_duration)`), and use unsupported integer casts.
 * The schema notes below are surfaced in tool descriptions and as an MCP
 * resource; `hogqlErrorHint` turns an opaque PostHog validation error into a
 * one-shot fix so clients self-correct instead of retry-looping.
 */

/** Compact schema notes appended to query tool descriptions (sent every call). */
export const HOGQL_SCHEMA_SHORT =
  'HogQL schema notes: ' +
  'Event columns are queried directly — `event`, `timestamp`, `distinct_id`, `person_id`, `uuid`. ' +
  'There is NO min_timestamp/max_timestamp column; use the aggregates min(timestamp)/max(timestamp). ' +
  'Event properties live under `properties.$name` and are STRINGS — cast before numeric/aggregate use, ' +
  'e.g. avg(toFloat64(properties.$session_duration)). Person props: `person.properties.$name`. ' +
  'Casts: toFloat64(), toString(), toDateTime() — toInt64()/toUInt*() are NOT supported. ' +
  '$exception events use plural ARRAY fields ($exception_types, $exception_values, $exception_sources, ' +
  '$exception_stack_trace_raw) plus scalar $exception_fingerprint; the singular $exception_type/$exception_message ' +
  'do not exist — read via arrayElement(field, 1). Full reference: resource posthog://hogql/schema.';

/** Full HogQL cheat-sheet exposed as the posthog://hogql/schema resource. */
export const HOGQL_SCHEMA_FULL = `# HogQL quick reference

HogQL is PostHog's SQL dialect (ClickHouse under the hood). Common authoring
mistakes and how to avoid them:

## events table — core columns (query directly, NOT under properties)
- event          — event name (e.g. '$pageview', '$exception')
- timestamp      — DateTime of the event
- distinct_id    — user identifier as sent
- person_id      — resolved person UUID
- uuid           — event UUID
- properties     — map of event properties (see below)
- person.properties.<name> — person properties (e.g. person.properties.email)

There is no \`min_timestamp\` / \`max_timestamp\` column. For first/last seen use
the aggregates min(timestamp) / max(timestamp), or group by toDate(timestamp).

## properties are strings — cast before numeric use
Every value under \`properties.*\` is a String. Aggregating one directly fails
with "Illegal type String of argument for aggregate function …". Cast first:
  avg(toFloat64(properties.$session_duration))
  sum(toFloat64(properties.value))
  countIf(toFloat64(properties.$session_duration) > 30)

## supported casts
- toFloat64(x)   — numbers (use this for any numeric property)
- toString(x)    — text
- toDateTime(x)  — timestamps
- toDate(x)      — date bucketing
NOT supported: toInt64() / toInt32() / toUInt*(). Use toFloat64() and round() if
you need an integer.

## sessions
Events carry \`properties.$session_id\`. The dedicated \`sessions\` table exposes
native numeric session fields (no cast needed):
  SELECT session_id, $session_duration, $start_timestamp, $end_timestamp
  FROM sessions
Join from events via session_id when you need per-session aggregates.

## $exception events
Properties are PLURAL arrays:
  $exception_types, $exception_values, $exception_sources, $exception_stack_trace_raw
plus scalar $exception_fingerprint. The singular $exception_type /
$exception_message do NOT exist and return NULL silently. Read array fields with
arrayElement(properties.$exception_values, 1).

## placeholders
Bind parameters with plain braces {name} (no type annotation) from the
\`variables\` argument. events_query also binds {date_from}/{date_to} from
date_range.

## misc
- LIMIT is auto-added if you omit it.
- If a field returns all NULL, inspect available keys first:
  SELECT JSONExtractKeys(properties) FROM events LIMIT 1
`;

interface HintRule {
  test: RegExp;
  hint: string;
}

const HINT_RULES: HintRule[] = [
  {
    // "Unable to resolve field: min_timestamp. Did you mean: timestamp?"
    test: /unable to resolve field|unknown (?:field|column)|did you mean/i,
    hint:
      'That column does not exist. Event columns are queried directly (event, timestamp, ' +
      'distinct_id, person_id, uuid); there is no min_timestamp/max_timestamp (use min(timestamp)/' +
      'max(timestamp)). Event properties live under properties.$name and person fields under ' +
      'person.properties.$name. If unsure, inspect keys with ' +
      'SELECT JSONExtractKeys(properties) FROM events LIMIT 1.',
  },
  {
    // "Illegal type String of argument for aggregate function avg."
    test: /illegal type string.*(?:aggregate|argument)|argument for aggregate function/i,
    hint:
      'properties.* values are strings — cast before aggregating, e.g. ' +
      'avg(toFloat64(properties.$session_duration)). For session metrics consider the native ' +
      'numeric $session_duration on the sessions table instead.',
  },
  {
    // toInt64/toUInt casts are rejected by HogQL
    test: /to(?:int|uint)\d+|unsupported.*(?:cast|function to)/i,
    hint:
      'toInt64()/toUInt*() are not supported in HogQL. Use toFloat64() (and round() for whole ' +
      'numbers) or toString().',
  },
];

/**
 * Return an actionable fix hint for a known HogQL error message, or null when
 * the error is not a recognized authoring mistake.
 */
export function hogqlErrorHint(message: string): string | null {
  if (!message) return null;
  for (const rule of HINT_RULES) {
    if (rule.test.test(message)) return rule.hint;
  }
  return null;
}
