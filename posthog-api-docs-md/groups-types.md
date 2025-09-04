# PostHog API - Groups Types

## Groups types

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/groups_types/` |
|---|---|
`DELETE`| `/api/projects/:project_id/groups_types/:group_type_index/`
| `GET` | `/api/projects/:project_id/groups_types/:group_type_index/metrics/` |
| `POST` | `/api/projects/:project_id/groups_types/:group_type_index/metrics/` |
| `GET` | `/api/projects/:project_id/groups_types/:group_type_index/metrics/:id/` |
| `PATCH` | `/api/projects/:project_id/groups_types/:group_type_index/metrics/:id/` |
| `DELETE` | `/api/projects/:project_id/groups_types/:group_type_index/metrics/:id/` |
| `PATCH` | `/api/projects/:project_id/groups_types/update_metadata/` |

## List all groups types

#### Required API key scopes

`group:read`

---

#### Path parameters

* **project_id**
* Type: string

* **group_type_index**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/groups_types`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups_types/

#### Response

##### Status 200

RESPONSE

    {

      "group_type": "string",

      "group_type_index": 0,

      "name_singular": "string",

      "name_plural": "string",

      "detail_dashboard": 0,

      "default_columns": [

        "string"

      ],

      "created_at": "2019-08-24T14:15:22Z"

    }

---

## Delete groups types

#### Required API key scopes

`group:write`

---

#### Path parameters

integer

* **project_id**
* Type: string

* **group_type_index**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`DELETE ``/api/projects/:project_id/groups_types/:group_type_index`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups_types/:group_type_index/

#### Response

##### Status 204 No response body

---

## List all groups types metrics

#### Required API key scopes

`group:read`

---

#### Path parameters

integer

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

* **group_type_index**

The initial index from which to return the results.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/groups_types/:group_type_index/metrics`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups_types/:group_type_index/metrics/

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

          "name": "string",

          "format": "numeric",

          "interval": -2147483648,

          "display": "number",

          "filters": null

        }

      ]

    }

---

## Create groups types metrics

#### Required API key scopes

`group:write`

---

#### Path parameters

integer

* **project_id**
* Type: string

* **name**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

* **format**

* **interval**
* Type: integer

* **display**

In days

* **filters**
* Type: ---

* **group_type_index**

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/groups_types/:group_type_index/metrics`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups_types/:group_type_index/metrics/\

    	-d name="string",\

    	-d filters=undefined

#### Response

##### Status 201

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "name": "string",

      "format": "numeric",

      "interval": -2147483648,

      "display": "number",

      "filters": null

    }

---

## Retrieve groups types metrics

#### Required API key scopes

`group:read`

---

#### Path parameters

integer

* **id**
* Type: string

* **project_id**

A UUID string identifying this group usage metric.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/groups_types/:group_type_index/metrics/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups_types/:group_type_index/metrics/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "name": "string",

      "format": "numeric",

      "interval": -2147483648,

      "display": "number",

      "filters": null

    }

---

## Update groups types metrics

#### Required API key scopes

`group:write`

---

#### Path parameters

* **group_type_index**
* Type: integer

* **id**

string

A UUID string identifying this group usage metric.

* **project_id**
* Type: string

* **name**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

* **format**

* **interval**
* Type: integer

* **display**

In days

* **filters**
* Type: ---

* **group_type_index**

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/groups_types/:group_type_index/metrics/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups_types/:group_type_index/metrics/:id/\

    	-d name="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "name": "string",

      "format": "numeric",

      "interval": -2147483648,

      "display": "number",

      "filters": null

    }

---

## Delete groups types metrics

#### Required API key scopes

`group:write`

---

#### Path parameters

integer

* **id**
* Type: string

* **project_id**

A UUID string identifying this group usage metric.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`DELETE ``/api/projects/:project_id/groups_types/:group_type_index/metrics/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups_types/:group_type_index/metrics/:id/

#### Response

##### Status 204 No response body

---

## Update groups types update metadata

#### Path parameters

* **project_id**
* Type: string

* **name_singular**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

* **name_plural**
* Type: string

* **detail_dashboard**

integer

* **default_columns**
* Type: array

* **created_at**

string

---

#### Request

`PATCH ``/api/projects/:project_id/groups_types/update_metadata`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups_types/update_metadata/\

    	-d group_type="string"

#### Response

##### Status 200 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
