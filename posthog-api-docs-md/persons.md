# PostHog API - Persons

## Persons

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

This endpoint is meant for reading and deleting persons. To create or update persons, we recommend using the [capture API](https://posthog.com/docs/api/capture), the `$set` and `$unset` [properties](https://posthog.com/docs/product-analytics/user-properties), or one of our SDKs.

---

### Endpoints

| `GET` | `/api/projects/:project_id/persons/` |
|---|---|
`GET`| `/api/projects/:project_id/persons/:id/`
| `PATCH` | `/api/projects/:project_id/persons/:id/` |
| `DELETE` | `/api/projects/:project_id/persons/:id/` |
| `GET` | `/api/projects/:project_id/persons/:id/activity/` |
| `POST` | `/api/projects/:project_id/persons/:id/delete_events/` |
| `POST` | `/api/projects/:project_id/persons/:id/delete_property/` |
| `GET` | `/api/projects/:project_id/persons/:id/properties_timeline/` |
| `POST` | `/api/projects/:project_id/persons/:id/split/` |
| `POST` | `/api/projects/:project_id/persons/:id/update_property/` |
| `GET` | `/api/projects/:project_id/persons/activity/` |
| `POST` | `/api/projects/:project_id/persons/bulk_delete/` |
| `GET` | `/api/projects/:project_id/persons/cohorts/` |
| `GET` | `/api/projects/:project_id/persons/funnel/` |
| `POST` | `/api/projects/:project_id/persons/funnel/` |
| `GET` | `/api/projects/:project_id/persons/funnel/correlation/` |
| `POST` | `/api/projects/:project_id/persons/funnel/correlation/` |
| `GET` | `/api/projects/:project_id/persons/lifecycle/` |
| `POST` | `/api/projects/:project_id/persons/reset_person_distinct_id/` |

## List all persons

You can also use the [query endpoint](/docs/api/queries) to retrieve persons. It enables you to use SQL to query the [`persons` table](/docs/data-warehouse/sources/posthog#persons).

---

#### Required API key scopes

`person:read`

---

#### Path parameters

* **project_id**
* Type: string

* **distinct_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

Filter list by distinct id.

* **email**
* Type: string

* **format**

Filter persons by email (exact match)

string

One of: `csv` `json`

* **limit**
* Type: integer

* **offset**

Number of results to return per page.

integer

The initial index from which to return the results.

* **properties**
* Type: array

* **search**

Filter Persons by person properties.

string

Search persons, either by email (full text search) or distinct_id (exact match).

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/persons`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/

#### Response

##### Status 200

RESPONSE

    {

      "next": "https://app.posthog.com/api/projects/{project_id}/accounts/?offset=400&limit=100",

      "previous": "https://app.posthog.com/api/projects/{project_id}/accounts/?offset=400&limit=100",

      "count": 400,

      "results": [

        {

          "id": 0,

          "name": "string",

          "distinct_ids": [

            "string"

          ],

          "properties": null,

          "created_at": "2019-08-24T14:15:22Z",

          "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f"

        }

      ]

    }

---

## Retrieve persons

#### Required API key scopes

`person:read`

---

#### Path parameters

* **id**
* Type: integer

* **project_id**

A unique integer value identifying this person.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **format**
* Type: string

* **id**

One of: `csv` `json`

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/persons/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "name": "string",

      "distinct_ids": [

        "string"

      ],

      "properties": null,

      "created_at": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f"

    }

---

## Update persons

It is better to use the [capture API](/docs/api/capture) to update person properties.

This endpoint functionally captures a `$set` event with a `$set` property key along with the property values you want to update.

---

#### Required API key scopes

`person:write`

---

#### Path parameters

integer

A unique integer value identifying this person.

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

* **properties**
* Type: ---

* **id**

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/persons/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/:id/\

    	-d name="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "name": "string",

      "distinct_ids": [

        "string"

      ],

      "properties": null,

      "created_at": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f"

    }

---

## Delete persons

This is the main way to delete data in PostHog.

To learn more, see our [data deletion docs](/docs/privacy/data-deletion).

---

Use this endpoint to delete individual persons. For bulk deletion, use the bulk_delete endpoint instead.

#### Required API key scopes

`person:write`

---

#### Path parameters

integer

A unique integer value identifying this person.

* **project_id**
* Type: string

* **delete_events**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

boolean

Default: `false`

If true, a task to delete all events associated with this person will be created and queued. The task does not run immediately and instead is batched together and at 5AM UTC every Sunday

* **format**
* Type: string

* **id**

One of: `csv` `json`

---

#### Request

`DELETE ``/api/projects/:project_id/persons/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/:id/

#### Response

##### Status 204 No response body

---

## Retrieve persons activity retrieve

#### Required API key scopes

`activity_log:read`

---

#### Path parameters

integer

A unique integer value identifying this person.

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

`GET ``/api/projects/:project_id/persons/:id/activity`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/:id/activity/

#### Response

##### Status 200 No response body

---

## Create persons delete events

Queue deletion of all events associated with this person. The task runs during non-peak hours.

#### Required API key scopes

`person:write`

---

#### Path parameters

* **id**
* Type: integer

* **project_id**

A unique integer value identifying this person.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **format**
* Type: string

* **properties**

One of: `csv` `json`

---

#### Request parameters

---

#### Request

`POST ``/api/projects/:project_id/persons/:id/delete_events`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/:id/delete_events/\

    	-d name="string"

#### Response

##### Status 200 No response body

---

## Create persons delete property

It is better to use the [capture API](/docs/api/capture) to change person properties.

This endpoint functionally captures a `$delete_person_property` event with an `$unset` property key along with the property value you want to delete.

---

#### Required API key scopes

`person:write`

---

#### Path parameters

* **id**
* Type: integer

* **project_id**

A unique integer value identifying this person.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **$unset**
* Type: string

* **format**

Specify the property key to delete

string

One of: `csv` `json`

---

#### Request parameters

* **properties**
* Type: ---

* **id**

#### Request

`POST ``/api/projects/:project_id/persons/:id/delete_property`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/:id/delete_property/\

    	-d name="string"

#### Response

##### Status 200 No response body

---

## Retrieve persons properties timeline

#### Path parameters

integer

A unique integer value identifying this person.

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

`GET ``/api/projects/:project_id/persons/:id/properties_timeline`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/:id/properties_timeline/

#### Response

##### Status 200 No response body

---

## Create persons split

#### Required API key scopes

`person:write`

---

#### Path parameters

* **id**
* Type: integer

* **project_id**

A unique integer value identifying this person.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **format**
* Type: string

* **properties**

One of: `csv` `json`

---

#### Request parameters

---

#### Request

`POST ``/api/projects/:project_id/persons/:id/split`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/:id/split/\

    	-d name="string"

#### Response

##### Status 200 No response body

---

## Create persons update property

It is better to use the [capture API](/docs/api/capture) to update person properties.

This endpoint functionally captures a `$set` event with a `$set` property key along with the property value you want to update.

---

#### Required API key scopes

`person:write`

---

#### Path parameters

* **id**
* Type: integer

* **project_id**

A unique integer value identifying this person.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **format**
* Type: string

* **key**

One of: `csv` `json`

string

Specify the property key

* **value**
* Type: Specify the property value

* **properties**

---

#### Request parameters

---

#### Request

`POST ``/api/projects/:project_id/persons/:id/update_property`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/:id/update_property/\

    	-d name="string"

#### Response

##### Status 200 No response body

---

## Retrieve persons activity

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

`GET ``/api/projects/:project_id/persons/activity`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/activity/

#### Response

##### Status 200 No response body

---

## Create persons bulk delete

This endpoint allows you to bulk delete persons, either by the PostHog person IDs or by distinct IDs. You can pass in a maximum of 1000 IDs per call.

#### Required API key scopes

`person:write`

---

#### Path parameters

* **project_id**
* Type: string

* **delete_events**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

boolean

Default: `false`

If true, a task to delete all events associated with this person will be created and queued. The task does not run immediately and instead is batched together and at 5AM UTC every Sunday

* **distinct_ids**
* Type: object

* **format**

A list of distinct IDs, up to 1000 of them. We'll delete all persons associated with those distinct IDs.

string

One of: `csv` `json`

* **ids**
* Type: object

* **properties**

A list of PostHog person IDs, up to 1000 of them. We'll delete all the persons listed.

---

#### Request parameters

---

#### Request

`POST ``/api/projects/:project_id/persons/bulk_delete`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/bulk_delete/\

    	-d name="string"

#### Response

##### Status 200 No response body

---

## Retrieve persons cohorts

#### Required API key scopes

`person:read``cohort:read`

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

`GET ``/api/projects/:project_id/persons/cohorts`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/cohorts/

#### Response

##### Status 200 No response body

---

## Retrieve persons funnel

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

`GET ``/api/projects/:project_id/persons/funnel`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/funnel/

#### Response

##### Status 200 No response body

---

## Create persons funnel

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

* **properties**
* Type: ---

* **project_id**

#### Request

`POST ``/api/projects/:project_id/persons/funnel`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/funnel/\

    	-d name="string"

#### Response

##### Status 200 No response body

---

## Retrieve persons funnel correlation

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **format**
* Type: string

* **project_id**

One of: `csv` `json`

---

#### Request

`GET ``/api/projects/:project_id/persons/funnel/correlation`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/funnel/correlation/

#### Response

##### Status 200 No response body

---

## Create persons funnel correlation

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **format**
* Type: string

* **properties**

One of: `csv` `json`

---

#### Request parameters

---

#### Request

`POST ``/api/projects/:project_id/persons/funnel/correlation`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/funnel/correlation/\

    	-d name="string"

#### Response

##### Status 200 No response body

---

## Retrieve persons lifecycle

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

`GET ``/api/projects/:project_id/persons/lifecycle`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/lifecycle/

#### Response

##### Status 200 No response body

---

## Create persons reset person distinct id

Reset a distinct_id for a deleted person. This allows the distinct_id to be used again.

#### Required API key scopes

`person:write`

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

#### Request parameters

* **properties**
  HelpfulCould be better
* Type: ---

#### Request

`POST ``/api/projects/:project_id/persons/reset_person_distinct_id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/persons/reset_person_distinct_id/\

    	-d name="string"

#### Response

##### Status 200 No response body

---

[Next page →](/docs/api/persons-2)

### Community questions

Ask a questionLogin

### Was this page useful?
