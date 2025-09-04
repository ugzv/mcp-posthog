# PostHog API - Query

## Query

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `POST` | `/api/projects/:project_id/query/` |
|---|---|
`GET`| `/api/projects/:project_id/query/:id/`
| `DELETE` | `/api/projects/:project_id/query/:id/` |
| `POST` | `/api/projects/:project_id/query/check_auth_for_async/` |
| `GET` | `/api/projects/:project_id/query/draft_sql/` |
| `POST` | `/api/projects/:project_id/query/upgrade/` |

## Create query

This is the main endpoint for querying data from PostHog. You can find all the details on what it does and how you can use it in our [API queries doc](/docs/api/queries).

If you don't want to read that, here's an example of how to use it to get events where the `$current_url` contains blog using the `HogQLQuery` query type and SQL:

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

Again, more details about this endpoint are available in our [API queries doc](/docs/api/queries).

---

#### Required API key scopes

`query:read`

---

#### Path parameters

* **project_id**
* Type: string

* **async**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **client_query_id**
* Type: Client provided query ID. Can be used to retrieve the status or cancel the query.

* **filters_override**

* **query**
  Example payload:
* Type: Submit a JSON string representing a query for PostHog data analysis, for example a HogQL query.

        {"query": {"kind": "HogQLQuery", "query": "select * from events limit 100"}}

For more details on HogQL queries, see the [PostHog HogQL documentation](/docs/hogql#api-access).

* **refresh**
      * `'blocking'` \- calculate synchronously (returning only when the query is done), UNLESS there are very fresh results in the cache
* Type: Default: `blocking`

Whether results should be calculated sync or async, and how much to rely on the cache:
    * `'async'` \- kick off background calculation (returning immediately with a query status), UNLESS there are very fresh results in the cache
    * `'lazy_async'` \- kick off background calculation, UNLESS there are somewhat fresh results in the cache
    * `'force_blocking'` \- calculate synchronously, even if fresh results are already cached
    * `'force_async'` \- kick off background calculation, even if fresh results are already cached
    * `'force_cache'` \- return cached data or a cache miss; always completes immediately as it never calculates Background calculation can be tracked using the `query_status` response field.

* **variables_override**
* Type: ---

* **id**

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/query`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/query/\

    	-d query=undefined

#### Response

##### Status 200

RESPONSE

    {}

---

## Retrieve query

(Experimental)

#### Required API key scopes

`query:read`

---

#### Path parameters

string

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/query/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/query/:id/

#### Response

##### Status 200

RESPONSE

    {

      "query_status": {

        "complete": false,

        "dashboard_id": null,

        "end_time": null,

        "error": false,

        "error_message": null,

        "expiration_time": null,

        "id": "string",

        "insight_id": null,

        "labels": null,

        "pickup_time": null,

        "query_async": true,

        "query_progress": null,

        "results": null,

        "start_time": null,

        "task_id": null,

        "team_id": 0

      }

    }

---

## Delete query

(Experimental)

#### Required API key scopes

`query:read`

---

#### Path parameters

string

* **project_id**
* Type: string

* **project_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`DELETE ``/api/projects/:project_id/query/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/query/:id/

#### Response

##### Status 204 Query cancelled

---

## Create query check auth for async

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`POST ``/api/projects/:project_id/query/check_auth_for_async`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/query/check_auth_for_async/

#### Response

##### Status 200 No response body

---

## Retrieve query draft sql

#### Path parameters

* **project_id**
* Type: string

* **project_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/query/draft_sql`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/query/draft_sql/

#### Response

##### Status 200 No response body

---

## Create query upgrade

Upgrades a query without executing it. Returns a query with all nodes migrated to the latest version.

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **query**
  HelpfulCould be better
* Type: ---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/query/upgrade`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/query/upgrade/\

    	-d query=undefined

#### Response

##### Status 200

RESPONSE

    {

      "query": {

        "custom_name": null,

        "event": null,

        "fixedProperties": null,

        "kind": "EventsNode",

        "limit": null,

        "math": null,

        "math_group_type_index": null,

        "math_hogql": null,

        "math_multiplier": null,

        "math_property": null,

        "math_property_revenue_currency": null,

        "math_property_type": null,

        "name": null,

        "orderBy": null,

        "properties": null,

        "response": null,

        "version": null

      }

    }

### Community questions

Ask a questionLogin

### Was this page useful?
