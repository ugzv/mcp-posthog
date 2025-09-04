# PostHog API - Annotations

## Annotations

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

Create, Read, Update and Delete annotations. [See docs](https://posthog.com/docs/data/annotations) for more information on annotations.

---

### Endpoints

| `GET` | `/api/projects/:project_id/annotations/` |
|---|---|
`POST`| `/api/projects/:project_id/annotations/`
| `GET` | `/api/projects/:project_id/annotations/:id/` |
| `PATCH` | `/api/projects/:project_id/annotations/:id/` |
| `DELETE` | `/api/projects/:project_id/annotations/:id/` |

## List all annotations

#### Required API key scopes

`annotation:read`

---

#### Path parameters

* **project_id**
* Type: string

* **limit**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

integer

Number of results to return per page.

* **offset**
* Type: integer

* **search**

The initial index from which to return the results.

string

A search term.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/annotations`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/annotations/

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

          "content": "string",

          "date_marker": "2019-08-24T14:15:22Z",

          "creation_type": "USR",

          "dashboard_item": 0,

          "dashboard_id": 0,

          "dashboard_name": "string",

          "insight_short_id": "string",

          "insight_name": "string",

          "insight_derived_name": "string",

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

          "created_at": "2019-08-24T14:15:22Z",

          "updated_at": "2019-08-24T14:15:22Z",

          "deleted": true,

          "scope": "dashboard_item"

        }

      ]

    }

---

## Create annotations

#### Required API key scopes

`annotation:write`

---

#### Path parameters

* **project_id**
* Type: string

* **content**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

* **date_marker**
* Type: string

* **creation_type**

* **dashboard_item**
* Type: integer

* **deleted**

boolean

* **scope**
* Type: ---

* **id**

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/annotations`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/annotations/\

    	-d content="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": 0,

      "content": "string",

      "date_marker": "2019-08-24T14:15:22Z",

      "creation_type": "USR",

      "dashboard_item": 0,

      "dashboard_id": 0,

      "dashboard_name": "string",

      "insight_short_id": "string",

      "insight_name": "string",

      "insight_derived_name": "string",

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

      "created_at": "2019-08-24T14:15:22Z",

      "updated_at": "2019-08-24T14:15:22Z",

      "deleted": true,

      "scope": "dashboard_item"

    }

---

## Retrieve annotations

#### Required API key scopes

`annotation:read`

---

#### Path parameters

integer

A unique integer value identifying this annotation.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/annotations/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/annotations/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "content": "string",

      "date_marker": "2019-08-24T14:15:22Z",

      "creation_type": "USR",

      "dashboard_item": 0,

      "dashboard_id": 0,

      "dashboard_name": "string",

      "insight_short_id": "string",

      "insight_name": "string",

      "insight_derived_name": "string",

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

      "created_at": "2019-08-24T14:15:22Z",

      "updated_at": "2019-08-24T14:15:22Z",

      "deleted": true,

      "scope": "dashboard_item"

    }

---

## Update annotations

#### Required API key scopes

`annotation:write`

---

#### Path parameters

integer

A unique integer value identifying this annotation.

* **project_id**
* Type: string

* **content**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

* **date_marker**
* Type: string

* **creation_type**

* **dashboard_item**
* Type: integer

* **deleted**

boolean

* **scope**
* Type: ---

* **id**

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/annotations/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/annotations/:id/\

    	-d content="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "content": "string",

      "date_marker": "2019-08-24T14:15:22Z",

      "creation_type": "USR",

      "dashboard_item": 0,

      "dashboard_id": 0,

      "dashboard_name": "string",

      "insight_short_id": "string",

      "insight_name": "string",

      "insight_derived_name": "string",

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

      "created_at": "2019-08-24T14:15:22Z",

      "updated_at": "2019-08-24T14:15:22Z",

      "deleted": true,

      "scope": "dashboard_item"

    }

---

## Delete annotations

Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true

#### Required API key scopes

`annotation:write`

---

#### Path parameters

integer

A unique integer value identifying this annotation.

* **project_id**
  HelpfulCould be better
* Type: string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`DELETE ``/api/projects/:project_id/annotations/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/annotations/:id/

#### Response

##### Status 405 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
