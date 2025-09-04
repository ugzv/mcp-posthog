# PostHog API - Events

## Events

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

> **⚠️ Warning:** These endpoints are effectively deprecated and kept only for backwards compatibility.

---

        This endpoint allows you to list and filter events.
        It is effectively deprecated and is kept only for backwards compatibility.
        If you ever ask about it you will be advised to not use it...
        If you want to ad-hoc list or aggregate events, use the Query endpoint instead.
        If you want to export all events or many pages of events you should use our CDP/Batch Exports products instead.

---

### Endpoints

| `GET` | `/api/projects/:project_id/events/` |
|---|---|
`GET`| `/api/projects/:project_id/events/:id/`
| `GET` | `/api/projects/:project_id/events/values/` |

## List all events

#### Required API key scopes

`query:read`

---

#### Path parameters

* **project_id**
* Type: string

* **after**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

Only return events with a timestamp after this time.

* **before**
* Type: string

* **distinct_id**

Only return events with a timestamp before this time.

integer

Filter list by distinct id.

* **event**
* Type: string

* **format**

Filter list by event. For example `user sign up` or `$pageview`.

string

One of: `csv` `json`

* **limit**
* Type: integer

* **offset**

The maximum number of results to return

integer

The initial index from which to return the results.

* **person_id**
* Type: integer

* **properties**

Filter list by person id.

array

Filter events by event property, person property, cohort, groups and more.

* **select**
* Type: array

* **where**

(Experimental) JSON-serialized array of HogQL expressions to return

array

(Experimental) JSON-serialized array of HogQL expressions that must pass

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/events`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/events/

#### Response

##### Status 200

RESPONSE

    {

      "next": "http://api.example.org/accounts/?offset=400&limit=100",

      "results": [

        {

          "id": "string",

          "distinct_id": "string",

          "properties": "string",

          "event": "string",

          "timestamp": "string",

          "person": "string",

          "elements": "string",

          "elements_chain": "string"

        }

      ]

    }

---

## Retrieve events

#### Required API key scopes

`query:read`

---

#### Path parameters

* **id**
* Type: string

* **project_id**

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **format**
* Type: string

* **project_id**

One of: `csv` `json`

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/events/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/events/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": "string",

      "distinct_id": "string",

      "properties": "string",

      "event": "string",

      "timestamp": "string",

      "person": "string",

      "elements": "string",

      "elements_chain": "string"

    }

---

## Retrieve events values

#### Required API key scopes

`query:read`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **format**
  HelpfulCould be better
* Type: string

One of: `csv` `json`

---

#### Request

`GET ``/api/projects/:project_id/events/values`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/events/values/

#### Response

##### Status 200 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
