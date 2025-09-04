# PostHog API - Batch Exports

## Batch exports

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/organizations/:organization_id/batch_exports/` |
|---|---|
`POST`| `/api/organizations/:organization_id/batch_exports/`
| `GET` | `/api/organizations/:organization_id/batch_exports/:id/` |
| `PATCH` | `/api/organizations/:organization_id/batch_exports/:id/` |
| `DELETE` | `/api/organizations/:organization_id/batch_exports/:id/` |
| `POST` | `/api/organizations/:organization_id/batch_exports/:id/backfill/` |
| `GET` | `/api/organizations/:organization_id/batch_exports/:id/logs/` |
| `POST` | `/api/organizations/:organization_id/batch_exports/:id/pause/` |
| `POST` | `/api/organizations/:organization_id/batch_exports/:id/run_test_step/` |
| `POST` | `/api/organizations/:organization_id/batch_exports/:id/unpause/` |
| `POST` | `/api/organizations/:organization_id/batch_exports/run_test_step_new/` |
| `GET` | `/api/organizations/:organization_id/batch_exports/test/` |
| `GET` | `/api/projects/:project_id/batch_exports/` |
| `POST` | `/api/projects/:project_id/batch_exports/` |
| `GET` | `/api/projects/:project_id/batch_exports/:batch_export_id/backfills/` |
| `POST` | `/api/projects/:project_id/batch_exports/:batch_export_id/backfills/` |
| `GET` | `/api/projects/:project_id/batch_exports/:batch_export_id/backfills/:id/` |
| `POST` | `/api/projects/:project_id/batch_exports/:batch_export_id/backfills/:id/cancel/` |
| `GET` | `/api/projects/:project_id/batch_exports/:batch_export_id/runs/` |

## List all batch exports

#### Required API key scopes

`batch_export:read`

---

#### Path parameters

* **organization_id**
* Type: string

* **limit**

---

#### Query parameters

integer

Number of results to return per page.

* **offset**
* Type: integer

* **organization_id**

The initial index from which to return the results.

---

#### Response

Show response

#### Request

`GET ``/api/organizations/:organization_id/batch_exports`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/

#### Response

##### Status 200

RESPONSE

    {

      "count": 123,

      "next": "http://api.example.org/accounts/?offset=400&limit=100",

      "previous": "http://api.example.org/accounts/?offset=200&limit=100",

      "results": [

        {

          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

          "team_id": 0,

          "name": "string",

          "model": "events",

          "destination": {

            "type": "S3",

            "config": null

          },

          "interval": "hour",

          "paused": true,

          "created_at": "2019-08-24T14:15:22Z",

          "last_updated_at": "2019-08-24T14:15:22Z",

          "last_paused_at": "2019-08-24T14:15:22Z",

          "start_at": "2019-08-24T14:15:22Z",

          "end_at": "2019-08-24T14:15:22Z",

          "latest_runs": [

            {

              "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

              "status": "Cancelled",

              "records_completed": -2147483648,

              "latest_error": "string",

              "data_interval_start": "2019-08-24T14:15:22Z",

              "data_interval_end": "2019-08-24T14:15:22Z",

              "cursor": "string",

              "created_at": "2019-08-24T14:15:22Z",

              "finished_at": "2019-08-24T14:15:22Z",

              "last_updated_at": "2019-08-24T14:15:22Z",

              "records_total_count": -2147483648,

              "bytes_exported": -9223372036854776000,

              "batch_export": "0fa0a8a1-f280-4977-8bb4-bc7801a6902f",

              "backfill": "4f806519-f4aa-4807-bea5-95595ab1adf0"

            }

          ],

          "hogql_query": "string",

          "schema": null,

          "filters": null

        }

      ]

    }

---

## Create batch exports

#### Required API key scopes

`batch_export:write`

---

#### Path parameters

string

---

#### Request parameters

* **name**
* Type: string

* **model**

A human-readable name for this BatchExport.

Which model this BatchExport is exporting.

    * `events` \- Events
    * `persons` \- Persons
    * `sessions` \- Sessions

* **destination**

* **interval**

* **paused**
* Type: boolean

* **last_paused_at**

Whether this BatchExport is paused or not.

string

The timestamp at which this BatchExport was last paused.

* **start_at**
* Type: string

* **end_at**

Time before which any Batch Export runs won't be triggered.

string

Time after which any Batch Export runs won't be triggered.

* **hogql_query**
* Type: string

* **filters**

---

#### Response

Show response

#### Request

`POST ``/api/organizations/:organization_id/batch_exports`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/\

    	-d name="string",\

    	-d destination=undefined,\

    	-d interval=undefined

#### Response

##### Status 201

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "team_id": 0,

      "name": "string",

      "model": "events",

      "destination": {

        "type": "S3",

        "config": null

      },

      "interval": "hour",

      "paused": true,

      "created_at": "2019-08-24T14:15:22Z",

      "last_updated_at": "2019-08-24T14:15:22Z",

      "last_paused_at": "2019-08-24T14:15:22Z",

      "start_at": "2019-08-24T14:15:22Z",

      "end_at": "2019-08-24T14:15:22Z",

      "latest_runs": [

        {

          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

          "status": "Cancelled",

          "records_completed": -2147483648,

          "latest_error": "string",

          "data_interval_start": "2019-08-24T14:15:22Z",

          "data_interval_end": "2019-08-24T14:15:22Z",

          "cursor": "string",

          "created_at": "2019-08-24T14:15:22Z",

          "finished_at": "2019-08-24T14:15:22Z",

          "last_updated_at": "2019-08-24T14:15:22Z",

          "records_total_count": -2147483648,

          "bytes_exported": -9223372036854776000,

          "batch_export": "0fa0a8a1-f280-4977-8bb4-bc7801a6902f",

          "backfill": "4f806519-f4aa-4807-bea5-95595ab1adf0"

        }

      ],

      "hogql_query": "string",

      "schema": null,

      "filters": null

    }

---

## Retrieve batch exports

#### Required API key scopes

`batch_export:read`

---

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this batch export.

string

---

#### Response

Show response

#### Request

`GET ``/api/organizations/:organization_id/batch_exports/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "team_id": 0,

      "name": "string",

      "model": "events",

      "destination": {

        "type": "S3",

        "config": null

      },

      "interval": "hour",

      "paused": true,

      "created_at": "2019-08-24T14:15:22Z",

      "last_updated_at": "2019-08-24T14:15:22Z",

      "last_paused_at": "2019-08-24T14:15:22Z",

      "start_at": "2019-08-24T14:15:22Z",

      "end_at": "2019-08-24T14:15:22Z",

      "latest_runs": [

        {

          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

          "status": "Cancelled",

          "records_completed": -2147483648,

          "latest_error": "string",

          "data_interval_start": "2019-08-24T14:15:22Z",

          "data_interval_end": "2019-08-24T14:15:22Z",

          "cursor": "string",

          "created_at": "2019-08-24T14:15:22Z",

          "finished_at": "2019-08-24T14:15:22Z",

          "last_updated_at": "2019-08-24T14:15:22Z",

          "records_total_count": -2147483648,

          "bytes_exported": -9223372036854776000,

          "batch_export": "0fa0a8a1-f280-4977-8bb4-bc7801a6902f",

          "backfill": "4f806519-f4aa-4807-bea5-95595ab1adf0"

        }

      ],

      "hogql_query": "string",

      "schema": null,

      "filters": null

    }

---

## Update batch exports

#### Required API key scopes

`batch_export:write`

---

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this batch export.

string

---

#### Request parameters

* **name**
* Type: string

* **model**

A human-readable name for this BatchExport.

Which model this BatchExport is exporting.

    * `events` \- Events
    * `persons` \- Persons
    * `sessions` \- Sessions

* **destination**

* **interval**

* **paused**
* Type: boolean

* **last_paused_at**

Whether this BatchExport is paused or not.

string

The timestamp at which this BatchExport was last paused.

* **start_at**
* Type: string

* **end_at**

Time before which any Batch Export runs won't be triggered.

string

Time after which any Batch Export runs won't be triggered.

* **hogql_query**
* Type: string

* **filters**

---

#### Response

Show response

#### Request

`PATCH ``/api/organizations/:organization_id/batch_exports/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/:id/\

    	-d team_id="integer"

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "team_id": 0,

      "name": "string",

      "model": "events",

      "destination": {

        "type": "S3",

        "config": null

      },

      "interval": "hour",

      "paused": true,

      "created_at": "2019-08-24T14:15:22Z",

      "last_updated_at": "2019-08-24T14:15:22Z",

      "last_paused_at": "2019-08-24T14:15:22Z",

      "start_at": "2019-08-24T14:15:22Z",

      "end_at": "2019-08-24T14:15:22Z",

      "latest_runs": [

        {

          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

          "status": "Cancelled",

          "records_completed": -2147483648,

          "latest_error": "string",

          "data_interval_start": "2019-08-24T14:15:22Z",

          "data_interval_end": "2019-08-24T14:15:22Z",

          "cursor": "string",

          "created_at": "2019-08-24T14:15:22Z",

          "finished_at": "2019-08-24T14:15:22Z",

          "last_updated_at": "2019-08-24T14:15:22Z",

          "records_total_count": -2147483648,

          "bytes_exported": -9223372036854776000,

          "batch_export": "0fa0a8a1-f280-4977-8bb4-bc7801a6902f",

          "backfill": "4f806519-f4aa-4807-bea5-95595ab1adf0"

        }

      ],

      "hogql_query": "string",

      "schema": null,

      "filters": null

    }

---

## Delete batch exports

#### Required API key scopes

`batch_export:write`

---

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this batch export.

string

---

#### Request

`DELETE ``/api/organizations/:organization_id/batch_exports/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/:id/

#### Response

##### Status 204 No response body

---

## Create batch exports backfill

Trigger a backfill for a BatchExport.

Note: This endpoint is deprecated. Please use POST /batch_exports/<id>/backfills/ instead.

#### Required API key scopes

`batch_export:write`

---

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this batch export.

string

---

#### Request parameters

* **name**
* Type: string

* **model**

A human-readable name for this BatchExport.

Which model this BatchExport is exporting.

    * `events` \- Events
    * `persons` \- Persons
    * `sessions` \- Sessions

* **destination**

* **interval**

* **paused**
* Type: boolean

* **last_paused_at**

Whether this BatchExport is paused or not.

string

The timestamp at which this BatchExport was last paused.

* **start_at**
* Type: string

* **end_at**

Time before which any Batch Export runs won't be triggered.

string

Time after which any Batch Export runs won't be triggered.

* **hogql_query**
* Type: string

* **filters**

---

#### Request

`POST ``/api/organizations/:organization_id/batch_exports/:id/backfill`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/:id/backfill/\

    	-d name="string",\

    	-d destination=undefined,\

    	-d interval=undefined

#### Response

##### Status 200 No response body

---

## Retrieve batch exports logs

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this batch export.

string

---

#### Request

`GET ``/api/organizations/:organization_id/batch_exports/:id/logs`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/:id/logs/

#### Response

##### Status 200 No response body

---

## Create batch exports pause

Pause a BatchExport.

#### Required API key scopes

`batch_export:write`

---

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this batch export.

string

---

#### Request parameters

* **name**
* Type: string

* **model**

A human-readable name for this BatchExport.

Which model this BatchExport is exporting.

    * `events` \- Events
    * `persons` \- Persons
    * `sessions` \- Sessions

* **destination**

* **interval**

* **paused**
* Type: boolean

* **last_paused_at**

Whether this BatchExport is paused or not.

string

The timestamp at which this BatchExport was last paused.

* **start_at**
* Type: string

* **end_at**

Time before which any Batch Export runs won't be triggered.

string

Time after which any Batch Export runs won't be triggered.

* **hogql_query**
* Type: string

* **filters**

---

#### Request

`POST ``/api/organizations/:organization_id/batch_exports/:id/pause`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/:id/pause/\

    	-d name="string",\

    	-d destination=undefined,\

    	-d interval=undefined

#### Response

##### Status 200 No response body

---

## Create batch exports run test step

#### Required API key scopes

`INTERNAL`

---

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this batch export.

string

---

#### Request parameters

* **name**
* Type: string

* **model**

A human-readable name for this BatchExport.

Which model this BatchExport is exporting.

    * `events` \- Events
    * `persons` \- Persons
    * `sessions` \- Sessions

* **destination**

* **interval**

* **paused**
* Type: boolean

* **last_paused_at**

Whether this BatchExport is paused or not.

string

The timestamp at which this BatchExport was last paused.

* **start_at**
* Type: string

* **end_at**

Time before which any Batch Export runs won't be triggered.

string

Time after which any Batch Export runs won't be triggered.

* **hogql_query**
* Type: string

* **filters**

---

#### Request

`POST ``/api/organizations/:organization_id/batch_exports/:id/run_test_step`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/:id/run_test_step/\

    	-d name="string",\

    	-d destination=undefined,\

    	-d interval=undefined

#### Response

##### Status 200 No response body

---

## Create batch exports unpause

Unpause a BatchExport.

#### Required API key scopes

`batch_export:write`

---

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this batch export.

string

---

#### Request parameters

* **name**
* Type: string

* **model**

A human-readable name for this BatchExport.

Which model this BatchExport is exporting.

    * `events` \- Events
    * `persons` \- Persons
    * `sessions` \- Sessions

* **destination**

* **interval**

* **paused**
* Type: boolean

* **last_paused_at**

Whether this BatchExport is paused or not.

string

The timestamp at which this BatchExport was last paused.

* **start_at**
* Type: string

* **end_at**

Time before which any Batch Export runs won't be triggered.

string

Time after which any Batch Export runs won't be triggered.

* **hogql_query**
* Type: string

* **filters**

---

#### Request

`POST ``/api/organizations/:organization_id/batch_exports/:id/unpause`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/:id/unpause/\

    	-d name="string",\

    	-d destination=undefined,\

    	-d interval=undefined

#### Response

##### Status 200 No response body

---

## Create batch exports run test step new

#### Required API key scopes

`INTERNAL`

---

#### Path parameters

* **organization_id**
* Type: string

* **name**

---

#### Request parameters

string

A human-readable name for this BatchExport.

* **model**
      * `events` \- Events
* Type: Which model this BatchExport is exporting.
    * `persons` \- Persons
    * `sessions` \- Sessions

* **destination**

* **interval**

* **paused**
* Type: boolean

* **last_paused_at**

Whether this BatchExport is paused or not.

string

The timestamp at which this BatchExport was last paused.

* **start_at**
* Type: string

* **end_at**

Time before which any Batch Export runs won't be triggered.

string

Time after which any Batch Export runs won't be triggered.

* **hogql_query**
* Type: string

* **filters**

---

#### Request

`POST ``/api/organizations/:organization_id/batch_exports/run_test_step_new`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/run_test_step_new/\

    	-d name="string",\

    	-d destination=undefined,\

    	-d interval=undefined

#### Response

##### Status 200 No response body

---

## Retrieve batch exports test

#### Required API key scopes

`INTERNAL`

---

#### Path parameters

* **organization_id**
* Type: string

* **project_id**

---

#### Request

`GET ``/api/organizations/:organization_id/batch_exports/test`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/test/

#### Response

##### Status 200 No response body

---

## List all batch exports list

#### Required API key scopes

`batch_export:read`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **limit**
* Type: integer

* **offset**

Number of results to return per page.

integer

The initial index from which to return the results.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/batch_exports`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/batch_exports/

#### Response

##### Status 200

RESPONSE

    {

      "count": 123,

      "next": "http://api.example.org/accounts/?offset=400&limit=100",

      "previous": "http://api.example.org/accounts/?offset=200&limit=100",

      "results": [

        {

          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

          "team_id": 0,

          "name": "string",

          "model": "events",

          "destination": {

            "type": "S3",

            "config": null

          },

          "interval": "hour",

          "paused": true,

          "created_at": "2019-08-24T14:15:22Z",

          "last_updated_at": "2019-08-24T14:15:22Z",

          "last_paused_at": "2019-08-24T14:15:22Z",

          "start_at": "2019-08-24T14:15:22Z",

          "end_at": "2019-08-24T14:15:22Z",

          "latest_runs": [

            {

              "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

              "status": "Cancelled",

              "records_completed": -2147483648,

              "latest_error": "string",

              "data_interval_start": "2019-08-24T14:15:22Z",

              "data_interval_end": "2019-08-24T14:15:22Z",

              "cursor": "string",

              "created_at": "2019-08-24T14:15:22Z",

              "finished_at": "2019-08-24T14:15:22Z",

              "last_updated_at": "2019-08-24T14:15:22Z",

              "records_total_count": -2147483648,

              "bytes_exported": -9223372036854776000,

              "batch_export": "0fa0a8a1-f280-4977-8bb4-bc7801a6902f",

              "backfill": "4f806519-f4aa-4807-bea5-95595ab1adf0"

            }

          ],

          "hogql_query": "string",

          "schema": null,

          "filters": null

        }

      ]

    }

---

## Create batch exports create

#### Required API key scopes

`batch_export:write`

---

#### Path parameters

* **project_id**
* Type: string

* **name**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

A human-readable name for this BatchExport.

* **model**
      * `events` \- Events
* Type: Which model this BatchExport is exporting.
    * `persons` \- Persons
    * `sessions` \- Sessions

* **destination**

* **interval**

* **paused**
* Type: boolean

* **last_paused_at**

Whether this BatchExport is paused or not.

string

The timestamp at which this BatchExport was last paused.

* **start_at**
* Type: string

* **end_at**

Time before which any Batch Export runs won't be triggered.

string

Time after which any Batch Export runs won't be triggered.

* **hogql_query**
* Type: string

* **filters**

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/batch_exports`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/batch_exports/\

    	-d name="string",\

    	-d destination=undefined,\

    	-d interval=undefined

#### Response

##### Status 201

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "team_id": 0,

      "name": "string",

      "model": "events",

      "destination": {

        "type": "S3",

        "config": null

      },

      "interval": "hour",

      "paused": true,

      "created_at": "2019-08-24T14:15:22Z",

      "last_updated_at": "2019-08-24T14:15:22Z",

      "last_paused_at": "2019-08-24T14:15:22Z",

      "start_at": "2019-08-24T14:15:22Z",

      "end_at": "2019-08-24T14:15:22Z",

      "latest_runs": [

        {

          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

          "status": "Cancelled",

          "records_completed": -2147483648,

          "latest_error": "string",

          "data_interval_start": "2019-08-24T14:15:22Z",

          "data_interval_end": "2019-08-24T14:15:22Z",

          "cursor": "string",

          "created_at": "2019-08-24T14:15:22Z",

          "finished_at": "2019-08-24T14:15:22Z",

          "last_updated_at": "2019-08-24T14:15:22Z",

          "records_total_count": -2147483648,

          "bytes_exported": -9223372036854776000,

          "batch_export": "0fa0a8a1-f280-4977-8bb4-bc7801a6902f",

          "backfill": "4f806519-f4aa-4807-bea5-95595ab1adf0"

        }

      ],

      "hogql_query": "string",

      "schema": null,

      "filters": null

    }

---

## List all batch exports backfills

ViewSet for BatchExportBackfill models.

Allows creating and reading backfills, but not updating or deleting them.

#### Required API key scopes

`batch_export:read`

---

#### Path parameters

* **batch_export_id**
* Type: string

* **project_id**

The BatchExport this backfill belongs to.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **cursor**
* Type: string

* **ordering**

The pagination cursor value.

string

Which field to use when ordering the results.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/batch_exports/:batch_export_id/backfills`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/batch_exports/:batch_export_id/backfills/

#### Response

##### Status 200

RESPONSE

    {

      "next": "http://api.example.org/accounts/?cursor=cD00ODY%3D\"",

      "previous": "http://api.example.org/accounts/?cursor=cj0xJnA9NDg3",

      "results": [

        {

          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

          "progress": "string",

          "start_at": "2019-08-24T14:15:22Z",

          "end_at": "2019-08-24T14:15:22Z",

          "status": "Cancelled",

          "created_at": "2019-08-24T14:15:22Z",

          "finished_at": "2019-08-24T14:15:22Z",

          "last_updated_at": "2019-08-24T14:15:22Z",

          "team": 0,

          "batch_export": "0fa0a8a1-f280-4977-8bb4-bc7801a6902f"

        }

      ]

    }

---

## Create batch exports backfills

Create a new backfill for a BatchExport.

#### Required API key scopes

`batch_export:write`

---

#### Path parameters

* **batch_export_id**
* Type: string

* **project_id**

The BatchExport this backfill belongs to.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **start_at**
* Type: string

* **end_at**

The start of the data interval.

string

The end of the data interval.

* **status**
      * `Cancelled` \- Cancelled
* Type: The status of this backfill.
    * `Completed` \- Completed
    * `ContinuedAsNew` \- Continued As New
    * `Failed` \- Failed
    * `FailedRetryable` \- Failed Retryable
    * `Terminated` \- Terminated
    * `TimedOut` \- Timedout
    * `Running` \- Running
    * `Starting` \- Starting

* **finished_at**
* Type: string

* **team**

The timestamp at which this BatchExportBackfill finished, successfully or not.

integer

The team this belongs to.

* **batch_export**
* Type: string

* **batch_export_id**

The BatchExport this backfill belongs to.

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/batch_exports/:batch_export_id/backfills`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/batch_exports/:batch_export_id/backfills/\

    	-d status=undefined,\

    	-d team="integer",\

    	-d batch_export="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "progress": "string",

      "start_at": "2019-08-24T14:15:22Z",

      "end_at": "2019-08-24T14:15:22Z",

      "status": "Cancelled",

      "created_at": "2019-08-24T14:15:22Z",

      "finished_at": "2019-08-24T14:15:22Z",

      "last_updated_at": "2019-08-24T14:15:22Z",

      "team": 0,

      "batch_export": "0fa0a8a1-f280-4977-8bb4-bc7801a6902f"

    }

---

## Retrieve batch exports backfills

ViewSet for BatchExportBackfill models.

Allows creating and reading backfills, but not updating or deleting them.

#### Required API key scopes

`batch_export:read`

---

#### Path parameters

string

The BatchExport this backfill belongs to.

* **id**
* Type: string

* **project_id**

A UUID string identifying this batch export backfill.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/batch_exports/:batch_export_id/backfills/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/batch_exports/:batch_export_id/backfills/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "progress": "string",

      "start_at": "2019-08-24T14:15:22Z",

      "end_at": "2019-08-24T14:15:22Z",

      "status": "Cancelled",

      "created_at": "2019-08-24T14:15:22Z",

      "finished_at": "2019-08-24T14:15:22Z",

      "last_updated_at": "2019-08-24T14:15:22Z",

      "team": 0,

      "batch_export": "0fa0a8a1-f280-4977-8bb4-bc7801a6902f"

    }

---

## Create batch exports backfills cancel

Cancel a batch export backfill.

#### Required API key scopes

`batch_export:write`

---

#### Path parameters

* **batch_export_id**
* Type: string

* **id**

The BatchExport this backfill belongs to.

string

A UUID string identifying this batch export backfill.

* **project_id**
* Type: string

* **start_at**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

The start of the data interval.

* **end_at**
* Type: string

* **status**

The end of the data interval.

The status of this backfill.

    * `Cancelled` \- Cancelled
    * `Completed` \- Completed
    * `ContinuedAsNew` \- Continued As New
    * `Failed` \- Failed
    * `FailedRetryable` \- Failed Retryable
    * `Terminated` \- Terminated
    * `TimedOut` \- Timedout
    * `Running` \- Running
    * `Starting` \- Starting

* **finished_at**
* Type: string

* **team**

The timestamp at which this BatchExportBackfill finished, successfully or not.

integer

The team this belongs to.

* **batch_export**
* Type: string

* **batch_export_id**

The BatchExport this backfill belongs to.

---

#### Request

`POST ``/api/projects/:project_id/batch_exports/:batch_export_id/backfills/:id/cancel`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/batch_exports/:batch_export_id/backfills/:id/cancel/\

    	-d status=undefined,\

    	-d team="integer",\

    	-d batch_export="string"

#### Response

##### Status 200 No response body

---

## List all batch exports runs

#### Required API key scopes

`batch_export:read`

---

#### Path parameters

string

The BatchExport this run belongs to.

* **project_id**
* Type: string

* **cursor**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

The pagination cursor value.

* **ordering**
  HelpfulCould be better
* Type: string

Which field to use when ordering the results.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/batch_exports/:batch_export_id/runs`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/batch_exports/:batch_export_id/runs/

#### Response

##### Status 200

RESPONSE

    {

      "next": "http://api.example.org/accounts/?cursor=cD00ODY%3D\"",

      "previous": "http://api.example.org/accounts/?cursor=cj0xJnA9NDg3",

      "results": [

        {

          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

          "status": "Cancelled",

          "records_completed": -2147483648,

          "latest_error": "string",

          "data_interval_start": "2019-08-24T14:15:22Z",

          "data_interval_end": "2019-08-24T14:15:22Z",

          "cursor": "string",

          "created_at": "2019-08-24T14:15:22Z",

          "finished_at": "2019-08-24T14:15:22Z",

          "last_updated_at": "2019-08-24T14:15:22Z",

          "records_total_count": -2147483648,

          "bytes_exported": -9223372036854776000,

          "batch_export": "0fa0a8a1-f280-4977-8bb4-bc7801a6902f",

          "backfill": "4f806519-f4aa-4807-bea5-95595ab1adf0"

        }

      ]

    }

---

[Next page →](/docs/api/batch-exports-2)

### Community questions

Ask a questionLogin

### Was this page useful?
