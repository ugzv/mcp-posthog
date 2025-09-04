# PostHog API - Queries

Queries

# API queries

Last updated: Sep 01, 2025

|[Edit page](https://github.com/PostHog/posthog.com/tree/master/contents/docs/api/queries.mdx)|

Copy page

On this page

* **Prerequisites**
* **Creating a query**
* **Writing performant queries**
* **1\. Use shorter time ranges**
* **2\. Materialize a view for the data you need**
* **3\. Don't scan the same table multiple times**
* **4\. Other SQL optimizations**
* **Query parameters**
* **Caching and execution modes**
* **Query types**
* **Response structure**
* **Cached responses**
* **Asynchronous queries**
* **Rate limits**
* **Further reading**
* Type: API queries enable you to query your data in PostHog. This is useful for:

* **Building [embedded analytics](/tutorials/embedded-analytics). **
* **Pulling aggregated PostHog data into your own or other apps.**

> **When should you _not_ use API queries?**
>
>   1. When you want to export large amounts of data. Use [batch exports](/docs/cdp/batch-exports) instead.
>   2. When you want to send data to destinations like Slack or webhooks immediately. Use [real-time destinations](/docs/cdp/destinations) instead.
>   3. If you need data from long-running queries with high memory usage at regular intervals. In this case, you should use [materialized views](/docs/data-warehouse/views/materialize) with a schedule instead. You can query these through SQL and get faster results.
>

## Prerequisites

Using API queries requires:

  1. A PostHog project and its project ID which you can get from [your project settings](https://us.posthog.com/settings/project#variables).
  2. A personal API key for your project with the **Query Read** permission. You can create this in [your user settings](https://us.posthog.com/settings/user-api-keys#personal-api-keys).

## Creating a query

To create a query, you make a `POST` request to the `/api/projects/:project_id/query/` endpoint. The body of the request should be a JSON object with a `query` property with a `kind` and `query` property.

For example, to create a query that gets events where the `$current_url` contains blog, you use `kind: HogQLQuery` and SQL like:

Terminal

PythonNode.js

    curl \

      -H 'Content-Type: application/json' \

      -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

      <ph_app_host>/api/projects/:project_id/query/ \

      -d '{

            "query": {

              "kind": "HogQLQuery",

              "query": "select properties.$current_url from events where properties.$current_url like '\''%/blog%'\'' limit 100"

            }

          }'

This is also useful for querying non-event data like persons, data warehouse, session replay metadata, and more. For example, to get a list of all people with the `email` property:

Terminal

PythonNode.js

    curl \

      -H 'Content-Type: application/json' \

      -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

      <ph_app_host>/api/projects/:project_id/query/ \

      -d '{

            "query": {

              "kind": "HogQLQuery",

              "query": "select properties.email from persons where properties.email is not null"

            }

          }'

Every query you run is logged in the [`query_log` table](/docs/data/query-log) along with details like duration, read bytes, read rows, and more.

## Writing performant queries

When writing custom queries, the burden of performance falls onto you. PostHog handles performance for queries we own (for example, in product analytics insights and experiments, etc.), but because performance depends on how queries are structured and written, we can't optimize them for you. Large data sets particularly require extra careful attention to performance.

Here is some advice for making sure your queries are quick and don't read over too much data (which can increase costs):

### 1\. Use shorter time ranges

You should almost always include a time range in your queries, and the shorter the better. There are a variety of SQL features to help you do this including `now()`, `INTERVAL`, and `dateDiff`. See more about these in our [SQL docs](/docs/product-analytics/sql#date-and-time).

Terminal

PythonNode.js

    curl \

      -H 'Content-Type: application/json' \

      -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

      <ph_app_host>/api/projects/:project_id/query/ \

      -d '{

            "query": {

              "kind": "HogQLQuery",

              "query": "SELECT count() FROM events WHERE timestamp >= now() - INTERVAL 7 DAY"

            }

          }'

### 2\. Materialize a view for the data you need

The data warehouse enables you to [save and materialize views](/docs/data-warehouse/views/materialize) of your data. This means that the view is precomputed, which can significantly improve query performance.

To do this, write your query in the [SQL editor](https://us.posthog.com/sql), click **Materialize** , then **Save and materialize** , and give it a name without spaces (I chose `mat_event_count`). You can also schedule to update the view at a specific interval.

Once done, you can query the view like any other table.

Terminal

PythonNode.js

    curl \

      -H 'Content-Type: application/json' \

      -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

      <ph_app_host>/api/projects/:project_id/query/ \

      -d '{

            "query": {

              "kind": "HogQLQuery",

              "query": "SELECT * FROM mat_event_count"

            }

          }'

### 3\. Don't scan the same table multiple times

Reading a large table like `events` or `persons` more than once in the same query multiplies the work PostHog has to do (more I/O, more CPU, more memory). For example, this query is inefficient:

SQL

[Run in PostHog](https://us.posthog.com/sql?open_query=WITH+us_events+AS+%28%0A++++SELECT+*%0A++++FROM+events%0A++++WHERE+properties.%24geoip_country_code+%3D+'US'%0A%29%2C%0Aca_events+AS+%28%0A++++SELECT+*%0A++++FROM+events%0A++++WHERE+properties.%24geoip_country_code+%3D+'CA'%0A%29%0ASELECT+*%0AFROM+us_events%0AUNION+ALL%0ASELECT+*%0AFROM+ca_events)

    WITH us_events AS (

        SELECT *

        FROM events

        WHERE properties.$geoip_country_code = 'US'

    ),

    ca_events AS (

        SELECT *

        FROM events

        WHERE properties.$geoip_country_code = 'CA'

    )

    SELECT *

    FROM us_events

    UNION ALL

    SELECT *

    FROM ca_events

Instead, pull the rows you need **once** , typically in a first CTE, and have every later step reference that CTE like this:

SQL

[Run in PostHog](https://us.posthog.com/sql?open_query=WITH+base_events+AS+%28++++++++++++++--+one+read+only%0A++++SELECT+event%2C+properties.%24geoip_country_code+as+country%0A++++FROM+events%0A++++WHERE+properties.%24geoip_country_code+IN+%28'US'%2C+'CA'%29%0A%29%2C%0Aus_events+AS+%28%0A++++SELECT+event%0A++++FROM+base_events%0A++++WHERE+country+%3D+'US'%0A%29%2C%0Aca_events+AS+%28%0A++++SELECT+event%0A++++FROM+base_events%0A++++WHERE+country+%3D+'CA'%0A%29%0ASELECT+*%0AFROM+us_events%0AUNION+ALL%0ASELECT+*%0AFROM+ca_events)

    WITH base_events AS (              -- one read only

        SELECT event, properties.$geoip_country_code as country

        FROM events

        WHERE properties.$geoip_country_code IN ('US', 'CA')

    ),

    us_events AS (

        SELECT event

        FROM base_events

        WHERE country = 'US'

    ),

    ca_events AS (

        SELECT event

        FROM base_events

        WHERE country = 'CA'

    )

    SELECT *

    FROM us_events

    UNION ALL

    SELECT *

    FROM ca_events

### 4\. Other SQL optimizations

Option 1 and 2 make the most difference, but other generic SQL optimizations work too. See our [SQL docs](/docs/product-analytics/sql) for commands, useful functions, and more to help you with this.

## Query parameters

Top level request parameters include:

* **`query` (required): Specifies what data to retrieve. This must include a `kind` property that defines the query type.**
* **`client_query_id` (optional): A client-provided identifier for tracking the query.**
* **`refresh` (optional): Controls caching behavior and execution mode (sync vs async).**
* **`filters_override` (optional): Dashboard-specific filters to apply.**
* **`variables_override` (optional): Variable overrides for queries that support variables.**
* **`name` (optional): A name for the query to better identify it in the `query_log` table.**
* Type: ### Caching and execution modes

* **`blocking` (default): Executes synchronously unless fresh results exist in cache**

The `refresh` parameter controls the execution mode of the query. It can be one of the following values:
* **`async`: Executes asynchronously unless fresh results exist in cache**
* **`force_blocking`: Always executes synchronously**
* **`force_async`: Always executes asynchronously**
* **`force_cache`: Only returns cached results (never calculates)**
* **`lazy_async`: Use extended cache period before asynchronous calculation**
* **`async_except_on_cache_miss`: Use cache but execute synchronously on cache miss**

> **Tip:** To cancel a running query, send a `DELETE` request to the `/api/projects/:project_id/query/:query_id/` endpoint.

### Query types

The `kind` property in the `query` parameter can be one of the following values.

* **`HogQLQuery`: Queries using [PostHog's version of SQL](/docs/sql).**
* **`EventsQuery`: Raw event data retrieval**
* **`TrendsQuery`: Time-series trend analysis**
* **`FunnelsQuery`: Conversion funnel analysis**
* **`RetentionQuery`: User retention analysis**
* **`PathsQuery`: User journey path analysis**
* Type: Beyond `HogQLQuery`, these are mostly used to power PostHog internally and are not useful for you, but you can see the [frontend query schema](https://github.com/PostHog/posthog/blob/master/frontend/src/queries/schema/schema-general.ts) for a complete list and more details.

* **`results`: The data returned by the query**

## Response structure

The response format depends on the query type, but all responses include:
* **`is_cached` (for cached responses): Indicates the result came from cache**
* **`timings` (when available): Performance metrics for the query execution**
* Type: ### Cached responses

* **`cache_key`: A unique identifier for the cached result**

API queries are cached by default. You can check if a response is cached by checking the `is_cached` property. Responses also contain cache-related details like:
* **`cache_target_age`: The timestamp until which the cached result is considered valid**
* **`last_refresh`: When the data was last computed**
* **`next_allowed_client_refresh`: The earliest time when a client can request a fresh calculation**
* Type: ### Asynchronous queries

* **1200 requests per hour**

For asynchronous queries (like ones with `refresh: async`), the initial response includes a query status with its completion status, query ID, start time, and more:

JSON

    {

      "query_status": {

        "id": "2fbd4b19413342a4ad08c307155187bc",

        "team_id": 123,

        "complete": false

      }

    }

You can then poll the status by sending a `GET` request to the `/api/projects/:project_id/query/:query_id/` endpoint.

Terminal

    curl \

      -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

      <ph_app_host>/api/projects/:project_id/query/$QUERY_ID/

## Rate limits

API queries are limited at the project-level to:
* **120 requests per minute**
* **3 queries running concurrently**
* **80 threads per query**
* **10 seconds of max execution time**
    * applies to query execution time, not HTTP request duration

If you need higher limits than these, [get in touch with our sales team](/talk-to-a-human). We promise they're friendly and technical enough to know what an API is.

If the project's concurrency quota is exhausted, we put the query in queue and wait. The query may wait up to 30 seconds in a queue before executing, being canceled, or timing out.

**Legacy query limits**

Some customers haven't been migrated to the above limit and are on an old limit of 120 queries/hour.

## Further reading

* **[How to set up embedded analytics with PostHog, Next.js, and Recharts](/tutorials/embedded-analytics)**
* **[How to use Recharts to visualize analytics data (with examples)](/tutorials/recharts)**
* **[How Mintlify launched user-facing analytics, powered by PostHog](/customers/mintlify)**
* **[The query endpoint API reference](/docs/api/query)**
* **[The query API endpoint code on GitHub](https://github.com/PostHog/posthog/blob/master/posthog/api/query.py)**
  It's easier than reading through **800 pages of documentation**
* Type: ### Questions? Ask Max AI.

Chat with Max

### Community questions

Ask a questionLogin

### Was this page useful?

### Contributors

### [Ian VanagasTechnical Content Marketer](/community/profiles/29296)### [Pawel SzczurProduct Engineer](/community/profiles/32302)### [Zach WaterfieldGrowth Engineer](/community/profiles/30086)

#### Jump to:

* **Prerequisites**
* **Creating a query**
* **Writing performant queries**
* **1\. Use shorter time ranges**
* **2\. Materialize a view for the data you need**
* **3\. Don't scan the same table multiple times**
* **4\. Other SQL optimizations**
* **Query parameters**
* **Caching and execution modes**
* **Query types**
* **Response structure**
* **Cached responses**
* **Asynchronous queries**
* **Rate limits**
* **Further reading**
* **Questions?**
