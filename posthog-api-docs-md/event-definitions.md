# PostHog API - Event Definitions

## Event definitions

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/event_definitions/` |
|---|---|
`GET`| `/api/projects/:project_id/event_definitions/:id/`
| `PATCH` | `/api/projects/:project_id/event_definitions/:id/` |
| `DELETE` | `/api/projects/:project_id/event_definitions/:id/` |
| `GET` | `/api/projects/:project_id/event_definitions/:id/metrics/` |

## Retrieve event definitions

#### Required API key scopes

`event_definition:read`

---

#### Path parameters

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/event_definitions`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/event_definitions/

#### Response

##### Status 200 No response body

---

## Retrieve event definitions retrieve

#### Required API key scopes

`event_definition:read`

---

#### Path parameters

string

A UUID string identifying this event definition.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/event_definitions/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/event_definitions/:id/

#### Response

##### Status 200 No response body

---

## Update event definitions

#### Required API key scopes

`event_definition:write`

---

#### Path parameters

string

A UUID string identifying this event definition.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`PATCH ``/api/projects/:project_id/event_definitions/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/event_definitions/:id/

#### Response

##### Status 200 No response body

---

## Delete event definitions

#### Required API key scopes

`event_definition:write`

---

#### Path parameters

string

A UUID string identifying this event definition.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`DELETE ``/api/projects/:project_id/event_definitions/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/event_definitions/:id/

#### Response

##### Status 204 No response body

---

## Retrieve event definitions metrics

#### Path parameters

string

A UUID string identifying this event definition.

* **project_id**
  HelpfulCould be better
* Type: string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/event_definitions/:id/metrics`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/event_definitions/:id/metrics/

#### Response

##### Status 200 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
