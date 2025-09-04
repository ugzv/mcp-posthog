# PostHog API - Early Access Feature

## Early access features

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/early_access_feature/` |
|---|---|
`POST`| `/api/projects/:project_id/early_access_feature/`
| `GET` | `/api/projects/:project_id/early_access_feature/:id/` |
| `PATCH` | `/api/projects/:project_id/early_access_feature/:id/` |
| `DELETE` | `/api/projects/:project_id/early_access_feature/:id/` |

## List all early access feature

#### Required API key scopes

`early_access_feature:read`

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

* **project_id**

The initial index from which to return the results.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/early_access_feature`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/early_access_feature/

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

          "feature_flag": {

            "id": 0,

            "team_id": 0,

            "name": "string",

            "key": "string",

            "filters": {

              "property1": null,

              "property2": null

            },

            "deleted": true,

            "active": true,

            "ensure_experience_continuity": true,

            "has_encrypted_payloads": true,

            "version": -2147483648,

            "evaluation_runtime": "server"

          },

          "name": "string",

          "description": "string",

          "stage": "draft",

          "documentation_url": "http://example.com",

          "created_at": "2019-08-24T14:15:22Z"

        }

      ]

    }

---

## Create early access feature

#### Required API key scopes

`early_access_feature:write`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **name**
* Type: string

* **description**

string

* **stage**

* **documentation_url**
* Type: string

* **feature_flag_id**

integer

* **_create_in_folder**
* Type: string

* **id**

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/early_access_feature`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/early_access_feature/\

    	-d name="string",\

    	-d stage=undefined

#### Response

##### Status 201

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "name": "string",

      "description": "string",

      "stage": "draft",

      "documentation_url": "http://example.com",

      "created_at": "2019-08-24T14:15:22Z",

      "feature_flag_id": 0,

      "feature_flag": {

        "id": 0,

        "team_id": 0,

        "name": "string",

        "key": "string",

        "filters": {

          "property1": null,

          "property2": null

        },

        "deleted": true,

        "active": true,

        "ensure_experience_continuity": true,

        "has_encrypted_payloads": true,

        "version": -2147483648,

        "evaluation_runtime": "server"

      },

      "_create_in_folder": "string"

    }

---

## Retrieve early access feature

#### Required API key scopes

`early_access_feature:read`

---

#### Path parameters

string

A UUID string identifying this early access feature.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/early_access_feature/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/early_access_feature/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "feature_flag": {

        "id": 0,

        "team_id": 0,

        "name": "string",

        "key": "string",

        "filters": {

          "property1": null,

          "property2": null

        },

        "deleted": true,

        "active": true,

        "ensure_experience_continuity": true,

        "has_encrypted_payloads": true,

        "version": -2147483648,

        "evaluation_runtime": "server"

      },

      "name": "string",

      "description": "string",

      "stage": "draft",

      "documentation_url": "http://example.com",

      "created_at": "2019-08-24T14:15:22Z"

    }

---

## Update early access feature

#### Required API key scopes

`early_access_feature:write`

---

#### Path parameters

string

A UUID string identifying this early access feature.

* **project_id**
* Type: string

* **name**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

* **description**
* Type: string

* **stage**

* **documentation_url**
* Type: string

* **id**

---

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/early_access_feature/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/early_access_feature/:id/\

    	-d feature_flag=undefined

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "feature_flag": {

        "id": 0,

        "team_id": 0,

        "name": "string",

        "key": "string",

        "filters": {

          "property1": null,

          "property2": null

        },

        "deleted": true,

        "active": true,

        "ensure_experience_continuity": true,

        "has_encrypted_payloads": true,

        "version": -2147483648,

        "evaluation_runtime": "server"

      },

      "name": "string",

      "description": "string",

      "stage": "draft",

      "documentation_url": "http://example.com",

      "created_at": "2019-08-24T14:15:22Z"

    }

---

## Delete early access feature

#### Required API key scopes

`early_access_feature:write`

---

#### Path parameters

string

A UUID string identifying this early access feature.

* **project_id**
  HelpfulCould be better
* Type: string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`DELETE ``/api/projects/:project_id/early_access_feature/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/early_access_feature/:id/

#### Response

##### Status 204 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
