# PostHog API - Dashboard Templates

## Dashboard templates

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/dashboard_templates/` |
|---|---|
`POST`| `/api/projects/:project_id/dashboard_templates/`
| `GET` | `/api/projects/:project_id/dashboard_templates/:id/` |
| `PATCH` | `/api/projects/:project_id/dashboard_templates/:id/` |
| `DELETE` | `/api/projects/:project_id/dashboard_templates/:id/` |
| `GET` | `/api/projects/:project_id/dashboard_templates/json_schema/` |

## List all dashboard templates

#### Required API key scopes

`dashboard_template:read`

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

`GET ``/api/projects/:project_id/dashboard_templates`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboard_templates/

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

          "template_name": "string",

          "dashboard_description": "string",

          "dashboard_filters": null,

          "tags": [

            "string"

          ],

          "tiles": null,

          "variables": null,

          "deleted": true,

          "created_at": "2019-08-24T14:15:22Z",

          "created_by": 0,

          "image_url": "string",

          "team_id": 0,

          "scope": "team",

          "availability_contexts": [

            "string"

          ]

        }

      ]

    }

---

## Create dashboard templates

#### Required API key scopes

`dashboard_template:write`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **template_name**
* Type: string

* **dashboard_description**

string

* **dashboard_filters**

* **tags**
* Type: array

* **tiles**

* **variables**

* **deleted**
* Type: boolean

* **created_by**

integer

* **image_url**
* Type: string

* **scope**

* **availability_contexts**
* Type: array

* **id**

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/dashboard_templates`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboard_templates/\

    	-d template_name="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "template_name": "string",

      "dashboard_description": "string",

      "dashboard_filters": null,

      "tags": [

        "string"

      ],

      "tiles": null,

      "variables": null,

      "deleted": true,

      "created_at": "2019-08-24T14:15:22Z",

      "created_by": 0,

      "image_url": "string",

      "team_id": 0,

      "scope": "team",

      "availability_contexts": [

        "string"

      ]

    }

---

## Retrieve dashboard templates

#### Required API key scopes

`dashboard_template:read`

---

#### Path parameters

string

A UUID string identifying this dashboard template.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/dashboard_templates/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboard_templates/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "template_name": "string",

      "dashboard_description": "string",

      "dashboard_filters": null,

      "tags": [

        "string"

      ],

      "tiles": null,

      "variables": null,

      "deleted": true,

      "created_at": "2019-08-24T14:15:22Z",

      "created_by": 0,

      "image_url": "string",

      "team_id": 0,

      "scope": "team",

      "availability_contexts": [

        "string"

      ]

    }

---

## Update dashboard templates

#### Required API key scopes

`dashboard_template:write`

---

#### Path parameters

string

A UUID string identifying this dashboard template.

* **project_id**
* Type: string

* **template_name**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

* **dashboard_description**
* Type: string

* **dashboard_filters**

* **tags**
* Type: array

* **tiles**

* **variables**

* **deleted**
* Type: boolean

* **created_by**

integer

* **image_url**
* Type: string

* **scope**

* **availability_contexts**
* Type: array

* **id**

---

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/dashboard_templates/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboard_templates/:id/\

    	-d template_name="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "template_name": "string",

      "dashboard_description": "string",

      "dashboard_filters": null,

      "tags": [

        "string"

      ],

      "tiles": null,

      "variables": null,

      "deleted": true,

      "created_at": "2019-08-24T14:15:22Z",

      "created_by": 0,

      "image_url": "string",

      "team_id": 0,

      "scope": "team",

      "availability_contexts": [

        "string"

      ]

    }

---

## Delete dashboard templates

Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true

#### Required API key scopes

`dashboard_template:write`

---

#### Path parameters

string

A UUID string identifying this dashboard template.

* **project_id**
* Type: string

* **project_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`DELETE ``/api/projects/:project_id/dashboard_templates/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboard_templates/:id/

#### Response

##### Status 405 No response body

---

## Retrieve dashboard templates json schema

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/dashboard_templates/json_schema`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboard_templates/json_schema/

#### Response

##### Status 200 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
