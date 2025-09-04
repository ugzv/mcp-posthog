# PostHog API - Insights

## Insights

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/insights/` |
|---|---|
`POST`| `/api/projects/:project_id/insights/`
| `GET` | `/api/projects/:project_id/insights/:insight_id/sharing/` |
| `POST` | `/api/projects/:project_id/insights/:insight_id/sharing/refresh/` |
| `GET` | `/api/projects/:project_id/insights/:id/` |
| `PATCH` | `/api/projects/:project_id/insights/:id/` |
| `DELETE` | `/api/projects/:project_id/insights/:id/` |
| `GET` | `/api/projects/:project_id/insights/:id/activity/` |
| `POST` | `/api/projects/:project_id/insights/:id/viewed/` |
| `GET` | `/api/projects/:project_id/insights/activity/` |
| `POST` | `/api/projects/:project_id/insights/cancel/` |
| `GET` | `/api/projects/:project_id/insights/my_last_viewed/` |

## List all insights

#### Required API key scopes

`insight:read`

---

#### Path parameters

* **project_id**
* Type: string

* **basic**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

boolean

Return basic insight metadata only (no results, faster).

* **created_by**
* Type: integer

* **format**

string

One of: `csv` `json`

* **limit**
* Type: integer

* **offset**

Number of results to return per page.

integer

The initial index from which to return the results.

* **refresh**
      * `'force_cache'` \- return cached data or a cache miss; always completes immediately as it never calculates
* Type: string

Default: `force_cache`

One of: `async` `async_except_on_cache_miss``"blocking"` `force_async``"force_blocking"` `force_cache``"lazy_async"`

Whether to refresh the retrieved insights, how aggresively, and if sync or async:
    * `'blocking'` \- calculate synchronously (returning only when the query is done), UNLESS there are very fresh results in the cache
    * `'async'` \- kick off background calculation (returning immediately with a query status), UNLESS there are very fresh results in the cache
    * `'lazy_async'` \- kick off background calculation, UNLESS there are somewhat fresh results in the cache
    * `'force_blocking'` \- calculate synchronously, even if fresh results are already cached
    * `'force_async'` \- kick off background calculation, even if fresh results are already cached Background calculation can be tracked using the `query_status` response field.

* **short_id**
* Type: string

* **project_id**

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/insights`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/insights/

#### Response

##### Status 200

RESPONSE

    {

      "count": 123,

      "next": "http://api.example.org/accounts/?offset=400&limit=100",

      "previous": "http://api.example.org/accounts/?offset=200&limit=100",

      "results": [

        {

          "id": 0,

          "short_id": "string",

          "name": "string",

          "derived_name": "string",

          "query": {

            "kind": "InsightVizNode",

            "source": {

              "kind": "TrendsQuery",

              "series": [

                {

                  "kind": "EventsNode",

                  "math": "total",

                  "name": "$pageview",

                  "event": "$pageview",

                  "version": 1

                }

              ],

              "version": 1

            },

            "version": 1

          },

          "order": -2147483648,

          "deleted": true,

          "dashboards": [

            0

          ],

          "dashboard_tiles": [

            {

              "id": 0,

              "dashboard_id": 0,

              "deleted": true

            }

          ],

          "last_refresh": "string",

          "cache_target_age": "string",

          "next_allowed_client_refresh": "string",

          "result": "string",

          "hasMore": "string",

          "columns": "string",

          "created_at": "2019-08-24T14:15:22Z",

          "created_by": {

            "id": 0,

            "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

            "distinct_id": "string",

            "first_name": "string",

            "last_name": "string",

            "email": "user@example.com",

            "is_email_verified": true,

            "hedgehog_config": {

              "property1": null,

              "property2": null

            },

            "role_at_organization": "engineering"

          },

          "description": "string",

          "updated_at": "2019-08-24T14:15:22Z",

          "tags": [

            null

          ],

          "favorited": true,

          "last_modified_at": "2019-08-24T14:15:22Z",

          "last_modified_by": {

            "id": 0,

            "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

            "distinct_id": "string",

            "first_name": "string",

            "last_name": "string",

            "email": "user@example.com",

            "is_email_verified": true,

            "hedgehog_config": {

              "property1": null,

              "property2": null

            },

            "role_at_organization": "engineering"

          },

          "is_sample": true,

          "effective_restriction_level": 21,

          "effective_privilege_level": 21,

          "user_access_level": "string",

          "timezone": "string",

          "is_cached": "string",

          "query_status": "string",

          "hogql": "string",

          "types": "string",

          "_create_in_folder": "string",

          "alerts": "string"

        }

      ]

    }

---

## Create insights

#### Required API key scopes

`insight:write`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **format**
* Type: string

* **name**

One of: `csv` `json`

---

#### Request parameters

string

* **derived_name**
* Type: string

* **query**

object

* **order**
* Type: integer

* **deleted**

boolean

* **dashboards**
* Type: array

* **description**

        DEPRECATED. Will be removed in a future release. Use dashboard_tiles instead.
            A dashboard ID for each of the dashboards that this insight is displayed on.

string

* **tags**
* Type: array

* **favorited**

boolean

* **_create_in_folder**
* Type: string

* **insight_id**

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/insights`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/insights/\

    	-d name="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": 0,

      "short_id": "string",

      "name": "string",

      "derived_name": "string",

      "query": {

        "kind": "InsightVizNode",

        "source": {

          "kind": "TrendsQuery",

          "series": [

            {

              "kind": "EventsNode",

              "math": "total",

              "name": "$pageview",

              "event": "$pageview",

              "version": 1

            }

          ],

          "version": 1

        },

        "version": 1

      },

      "order": -2147483648,

      "deleted": true,

      "dashboards": [

        0

      ],

      "dashboard_tiles": [

        {

          "id": 0,

          "dashboard_id": 0,

          "deleted": true

        }

      ],

      "last_refresh": "string",

      "cache_target_age": "string",

      "next_allowed_client_refresh": "string",

      "result": "string",

      "hasMore": "string",

      "columns": "string",

      "created_at": "2019-08-24T14:15:22Z",

      "created_by": {

        "id": 0,

        "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

        "distinct_id": "string",

        "first_name": "string",

        "last_name": "string",

        "email": "user@example.com",

        "is_email_verified": true,

        "hedgehog_config": {

          "property1": null,

          "property2": null

        },

        "role_at_organization": "engineering"

      },

      "description": "string",

      "updated_at": "2019-08-24T14:15:22Z",

      "tags": [

        null

      ],

      "favorited": true,

      "last_modified_at": "2019-08-24T14:15:22Z",

      "last_modified_by": {

        "id": 0,

        "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

        "distinct_id": "string",

        "first_name": "string",

        "last_name": "string",

        "email": "user@example.com",

        "is_email_verified": true,

        "hedgehog_config": {

          "property1": null,

          "property2": null

        },

        "role_at_organization": "engineering"

      },

      "is_sample": true,

      "effective_restriction_level": 21,

      "effective_privilege_level": 21,

      "user_access_level": "string",

      "timezone": "string",

      "is_cached": "string",

      "query_status": "string",

      "hogql": "string",

      "types": "string",

      "_create_in_folder": "string",

      "alerts": "string"

    }

---

## List all insights sharing

#### Required API key scopes

`sharing_configuration:read`

---

#### Path parameters

integer

* **project_id**
* Type: string

* **insight_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/insights/:insight_id/sharing`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/insights/:insight_id/sharing/

#### Response

##### Status 200

RESPONSE

    {

      "created_at": "2019-08-24T14:15:22Z",

      "enabled": true,

      "access_token": "string",

      "settings": null

    }

---

## Create insights sharing refresh

#### Required API key scopes

`sharing_configuration:write`

---

#### Path parameters

integer

* **project_id**
* Type: string

* **enabled**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

boolean

* **settings**
* Type: ---

* **id**

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/insights/:insight_id/sharing/refresh`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/insights/:insight_id/sharing/refresh/\

    	-d created_at="string"

#### Response

##### Status 200

RESPONSE

    {

      "created_at": "2019-08-24T14:15:22Z",

      "enabled": true,

      "access_token": "string",

      "settings": null

    }

---

## Retrieve insights

#### Required API key scopes

`insight:read`

---

#### Path parameters

integer

A unique integer value identifying this insight.

* **project_id**
* Type: string

* **format**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

One of: `csv` `json`

* **from_dashboard**
* Type: integer

* **refresh**

Only if loading an insight in the context of a dashboard: The relevant dashboard's ID. When set, the specified dashboard's filters and date range override will be applied.

string

Default: `force_cache`

One of: `async` `async_except_on_cache_miss``"blocking"` `force_async``"force_blocking"` `force_cache``"lazy_async"`

Whether to refresh the insight, how aggresively, and if sync or async:

    * `'force_cache'` \- return cached data or a cache miss; always completes immediately as it never calculates
    * `'blocking'` \- calculate synchronously (returning only when the query is done), UNLESS there are very fresh results in the cache
    * `'async'` \- kick off background calculation (returning immediately with a query status), UNLESS there are very fresh results in the cache
    * `'lazy_async'` \- kick off background calculation, UNLESS there are somewhat fresh results in the cache
    * `'force_blocking'` \- calculate synchronously, even if fresh results are already cached
    * `'force_async'` \- kick off background calculation, even if fresh results are already cached Background calculation can be tracked using the `query_status` response field.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/insights/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/insights/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "short_id": "string",

      "name": "string",

      "derived_name": "string",

      "query": {

        "kind": "InsightVizNode",

        "source": {

          "kind": "TrendsQuery",

          "series": [

            {

              "kind": "EventsNode",

              "math": "total",

              "name": "$pageview",

              "event": "$pageview",

              "version": 1

            }

          ],

          "version": 1

        },

        "version": 1

      },

      "order": -2147483648,

      "deleted": true,

      "dashboards": [

        0

      ],

      "dashboard_tiles": [

        {

          "id": 0,

          "dashboard_id": 0,

          "deleted": true

        }

      ],

      "last_refresh": "string",

      "cache_target_age": "string",

      "next_allowed_client_refresh": "string",

      "result": "string",

      "hasMore": "string",

      "columns": "string",

      "created_at": "2019-08-24T14:15:22Z",

      "created_by": {

        "id": 0,

        "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

        "distinct_id": "string",

        "first_name": "string",

        "last_name": "string",

        "email": "user@example.com",

        "is_email_verified": true,

        "hedgehog_config": {

          "property1": null,

          "property2": null

        },

        "role_at_organization": "engineering"

      },

      "description": "string",

      "updated_at": "2019-08-24T14:15:22Z",

      "tags": [

        null

      ],

      "favorited": true,

      "last_modified_at": "2019-08-24T14:15:22Z",

      "last_modified_by": {

        "id": 0,

        "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

        "distinct_id": "string",

        "first_name": "string",

        "last_name": "string",

        "email": "user@example.com",

        "is_email_verified": true,

        "hedgehog_config": {

          "property1": null,

          "property2": null

        },

        "role_at_organization": "engineering"

      },

      "is_sample": true,

      "effective_restriction_level": 21,

      "effective_privilege_level": 21,

      "user_access_level": "string",

      "timezone": "string",

      "is_cached": "string",

      "query_status": "string",

      "hogql": "string",

      "types": "string",

      "_create_in_folder": "string",

      "alerts": "string"

    }

---

## Update insights

#### Required API key scopes

`insight:write`

---

#### Path parameters

* **id**
* Type: integer

* **project_id**

A unique integer value identifying this insight.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **format**
* Type: string

* **name**

One of: `csv` `json`

---

#### Request parameters

string

* **derived_name**
* Type: string

* **query**

object

* **order**
* Type: integer

* **deleted**

boolean

* **dashboards**
* Type: array

* **description**

        DEPRECATED. Will be removed in a future release. Use dashboard_tiles instead.
            A dashboard ID for each of the dashboards that this insight is displayed on.

string

* **tags**
* Type: array

* **favorited**

boolean

* **_create_in_folder**
* Type: string

* **id**

---

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/insights/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/insights/:id/\

    	-d name="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "short_id": "string",

      "name": "string",

      "derived_name": "string",

      "query": {

        "kind": "InsightVizNode",

        "source": {

          "kind": "TrendsQuery",

          "series": [

            {

              "kind": "EventsNode",

              "math": "total",

              "name": "$pageview",

              "event": "$pageview",

              "version": 1

            }

          ],

          "version": 1

        },

        "version": 1

      },

      "order": -2147483648,

      "deleted": true,

      "dashboards": [

        0

      ],

      "dashboard_tiles": [

        {

          "id": 0,

          "dashboard_id": 0,

          "deleted": true

        }

      ],

      "last_refresh": "string",

      "cache_target_age": "string",

      "next_allowed_client_refresh": "string",

      "result": "string",

      "hasMore": "string",

      "columns": "string",

      "created_at": "2019-08-24T14:15:22Z",

      "created_by": {

        "id": 0,

        "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

        "distinct_id": "string",

        "first_name": "string",

        "last_name": "string",

        "email": "user@example.com",

        "is_email_verified": true,

        "hedgehog_config": {

          "property1": null,

          "property2": null

        },

        "role_at_organization": "engineering"

      },

      "description": "string",

      "updated_at": "2019-08-24T14:15:22Z",

      "tags": [

        null

      ],

      "favorited": true,

      "last_modified_at": "2019-08-24T14:15:22Z",

      "last_modified_by": {

        "id": 0,

        "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

        "distinct_id": "string",

        "first_name": "string",

        "last_name": "string",

        "email": "user@example.com",

        "is_email_verified": true,

        "hedgehog_config": {

          "property1": null,

          "property2": null

        },

        "role_at_organization": "engineering"

      },

      "is_sample": true,

      "effective_restriction_level": 21,

      "effective_privilege_level": 21,

      "user_access_level": "string",

      "timezone": "string",

      "is_cached": "string",

      "query_status": "string",

      "hogql": "string",

      "types": "string",

      "_create_in_folder": "string",

      "alerts": "string"

    }

---

## Delete insights

Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true

#### Required API key scopes

`insight:write`

---

#### Path parameters

integer

A unique integer value identifying this insight.

* **project_id**
* Type: string

* **format**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

One of: `csv` `json`

---

#### Request

`DELETE ``/api/projects/:project_id/insights/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/insights/:id/

#### Response

##### Status 405 No response body

---

## Retrieve insights activity retrieve

#### Required API key scopes

`activity_log:read`

---

#### Path parameters

* **id**
* Type: integer

* **project_id**

A unique integer value identifying this insight.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **format**
* Type: string

* **id**

One of: `csv` `json`

---

#### Request

`GET ``/api/projects/:project_id/insights/:id/activity`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/insights/:id/activity/

#### Response

##### Status 200 No response body

---

## Create insights viewed

#### Required API key scopes

`insight:read`

---

#### Path parameters

integer

A unique integer value identifying this insight.

* **project_id**
* Type: string

* **format**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

One of: `csv` `json`

---

#### Request parameters

* **name**
* Type: string

* **derived_name**

string

* **query**
* Type: object

* **order**

integer

* **deleted**
* Type: boolean

* **dashboards**

array

        DEPRECATED. Will be removed in a future release. Use dashboard_tiles instead.
            A dashboard ID for each of the dashboards that this insight is displayed on.

* **description**
* Type: string

* **tags**

array

* **favorited**
* Type: boolean

* **_create_in_folder**

string

---

#### Request

`POST ``/api/projects/:project_id/insights/:id/viewed`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/insights/:id/viewed/\

    	-d name="string"

#### Response

##### Status 200 No response body

---

## Retrieve insights activity

#### Required API key scopes

`activity_log:read`

---

#### Path parameters

* **project_id**
* Type: string

* **format**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

One of: `csv` `json`

---

#### Request

`GET ``/api/projects/:project_id/insights/activity`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/insights/activity/

#### Response

##### Status 200 No response body

---

## Create insights cancel

#### Path parameters

* **project_id**
* Type: string

* **format**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

One of: `csv` `json`

---

#### Request parameters

* **name**
* Type: string

* **derived_name**

string

* **query**
* Type: object

* **order**

integer

* **deleted**
* Type: boolean

* **dashboards**

array

        DEPRECATED. Will be removed in a future release. Use dashboard_tiles instead.
            A dashboard ID for each of the dashboards that this insight is displayed on.

* **description**
* Type: string

* **tags**

array

* **favorited**
* Type: boolean

* **_create_in_folder**

string

---

#### Request

`POST ``/api/projects/:project_id/insights/cancel`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/insights/cancel/\

    	-d name="string"

#### Response

##### Status 200 No response body

---

## Retrieve insights my last viewed

Returns basic details about the last 5 insights viewed by this user. Most recently viewed first.

#### Path parameters

* **project_id**
* Type: string

* **format**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

One of: `csv` `json`

---

#### Request

`GET ``/api/projects/:project_id/insights/my_last_viewed`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/insights/my_last_viewed/

#### Response

##### Status 200 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
