# PostHog Error Tracking — Event Schema

When error tracking is enabled, PostHog autocaptures exceptions as `$exception` events. The exception payload lives on `properties` as **parallel arrays** (one entry per chained cause), not singular strings.

## Reserved fields on `$exception` events

| Field | Type | Notes |
|-------|------|-------|
| `$exception_types` | `string[]` | e.g. `["TypeError"]`, `["ValueError", "KeyError"]` for chained exceptions |
| `$exception_values` | `string[]` | The message / value for each exception in the chain |
| `$exception_sources` | `string[]` | Source file or package per frame |
| `$exception_stack_trace_raw` | `string[]` | Serialized stack trace JSON per cause |
| `$exception_fingerprint` | `string` | Stable hash used to group identical exceptions into issues |
| `$exception_issue_id` | `string` | Issue grouping ID |
| `$exception_level` | `string` | `error`, `warning`, etc. |
| `$exception_handled` | `boolean` | Whether the exception was caught by user code |
| `$exception_person_url` | `string` | PostHog person URL for the impacted user |

### Common mistakes (read this first)

1. **Do not use `$exception_type` / `$exception_message` (singular)** — those do not exist. SDKs only emit the plural, array-shaped names above. Querying the singular names returns `NULL` for every row with no error surfaced.
2. If every row of a HogQL query returns `NULL` for an exception field, the field name is probably wrong — run `SELECT DISTINCT arrayJoin(JSONExtractKeys(properties)) FROM events WHERE event = '$exception' LIMIT 100` to enumerate the real keys before concluding data is missing.
3. To get a scalar from an array field, use `arrayElement(properties.$exception_types, 1)` (1-indexed in ClickHouse/HogQL).

## HogQL recipes

### Recent errors with type + message

```sql
SELECT
  timestamp,
  distinct_id,
  arrayElement(properties.$exception_types, 1)  AS exception_type,
  arrayElement(properties.$exception_values, 1) AS exception_message,
  properties.$exception_fingerprint             AS fingerprint
FROM events
WHERE event = '$exception'
  AND timestamp > now() - interval 24 hour
ORDER BY timestamp DESC
LIMIT 100
```

### Top error types in the last 7 days

```sql
SELECT
  arrayElement(properties.$exception_types, 1) AS exception_type,
  count() AS occurrences,
  uniq(distinct_id) AS impacted_users
FROM events
WHERE event = '$exception'
  AND timestamp > now() - interval 7 day
GROUP BY exception_type
ORDER BY occurrences DESC
LIMIT 20
```

### Chained exceptions (all causes)

```sql
SELECT
  timestamp,
  arrayJoin(arrayMap((t, v) -> concat(t, ': ', v),
    properties.$exception_types,
    properties.$exception_values)) AS cause
FROM events
WHERE event = '$exception'
  AND timestamp > now() - interval 1 hour
LIMIT 200
```

### Enumerate what fields actually exist on a single row

```sql
SELECT JSONExtractKeys(properties) AS keys
FROM events
WHERE event = '$exception'
LIMIT 1
```

## Related REST endpoints

The `/api/projects/:id/error_tracking/*` endpoints (issue lookup, merging, assignment) are not wrapped as MCP tools yet — use `query_hogql` for analysis and the PostHog UI for triage.
