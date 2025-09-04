# PostHog API - Dashboards

## Dashboards

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/dashboards/` |
|---|---|
`POST`| `/api/projects/:project_id/dashboards/`
| `GET` | `/api/projects/:project_id/dashboards/:dashboard_id/collaborators/` |
| `POST` | `/api/projects/:project_id/dashboards/:dashboard_id/collaborators/` |
| `DELETE` | `/api/projects/:project_id/dashboards/:dashboard_id/collaborators/:user__uuid/` |
| `GET` | `/api/projects/:project_id/dashboards/:dashboard_id/sharing/` |
| `POST` | `/api/projects/:project_id/dashboards/:dashboard_id/sharing/refresh/` |
| `GET` | `/api/projects/:project_id/dashboards/:id/` |
| `PATCH` | `/api/projects/:project_id/dashboards/:id/` |
| `DELETE` | `/api/projects/:project_id/dashboards/:id/` |
| `PATCH` | `/api/projects/:project_id/dashboards/:id/move_tile/` |
| `GET` | `/api/projects/:project_id/dashboards/:id/stream_tiles/` |
| `POST` | `/api/projects/:project_id/dashboards/create_from_template_json/` |

## List all dashboards

#### Required API key scopes

`dashboard:read`

---

#### Path parameters

* **project_id**
* Type: string

* **format**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

One of: `json` `txt`

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

`GET ``/api/projects/:project_id/dashboards`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboards/

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

          "name": "string",

          "description": "string",

          "pinned": true,

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

          "last_accessed_at": "2019-08-24T14:15:22Z",

          "is_shared": true,

          "deleted": true,

          "creation_mode": "default",

          "tags": [

            null

          ],

          "restriction_level": 21,

          "effective_restriction_level": 21,

          "effective_privilege_level": 21,

          "user_access_level": "string",

          "access_control_version": "string",

          "last_refresh": "2019-08-24T14:15:22Z"

        }

      ]

    }

---

## Create dashboards

#### Required API key scopes

`dashboard:write`

---

#### Path parameters

* **project_id**
* Type: string

* **format**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

One of: `json` `txt`

---

#### Request parameters

* **name**
* Type: string

* **description**

string

* **pinned**
* Type: boolean

* **deleted**

boolean

* **use_template**
* Type: string

* **use_dashboard**

integer

* **delete_insights**
* Type: boolean

* **breakdown_colors**

Default: `false`

* **data_color_theme_id**
* Type: integer

* **tags**

array

* **restriction_level**

* **_create_in_folder**
* Type: string

* **last_refresh**

string

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/dashboards`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboards/\

    	-d name="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": 0,

      "name": "string",

      "description": "string",

      "pinned": true,

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

      "is_shared": true,

      "deleted": true,

      "creation_mode": "default",

      "use_template": "string",

      "use_dashboard": 0,

      "delete_insights": false,

      "filters": {

        "property1": null,

        "property2": null

      },

      "variables": {

        "property1": null,

        "property2": null

      },

      "breakdown_colors": null,

      "data_color_theme_id": 0,

      "tags": [

        null

      ],

      "tiles": [

        {

          "property1": null,

          "property2": null

        }

      ],

      "restriction_level": 21,

      "effective_restriction_level": 21,

      "effective_privilege_level": 21,

      "user_access_level": "string",

      "access_control_version": "string",

      "_create_in_folder": "string",

      "last_refresh": "2019-08-24T14:15:22Z",

      "persisted_filters": {

        "property1": null,

        "property2": null

      },

      "persisted_variables": {

        "property1": null,

        "property2": null

      }

    }

---

## List all dashboards collaborators

#### Required API key scopes

`dashboard:read`

---

#### Path parameters

* **dashboard_id**
* Type: integer

* **project_id**

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/dashboards/:dashboard_id/collaborators`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboards/:dashboard_id/collaborators/

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "dashboard_id": 0,

      "user": {

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

      "level": 21,

      "added_at": "2019-08-24T14:15:22Z",

      "updated_at": "2019-08-24T14:15:22Z",

      "user_uuid": "7c4d2d7d-8620-4fb3-967a-4a621082cf1f"

    }

---

## Create dashboards collaborators

#### Required API key scopes

`dashboard:write`

---

#### Path parameters

* **dashboard_id**
* Type: integer

* **project_id**

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **level**

* **user_uuid**
* Type: string

* **dashboard_id**

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/dashboards/:dashboard_id/collaborators`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboards/:dashboard_id/collaborators/\

    	-d level=undefined,\

    	-d user_uuid="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "dashboard_id": 0,

      "user": {

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

      "level": 21,

      "added_at": "2019-08-24T14:15:22Z",

      "updated_at": "2019-08-24T14:15:22Z",

      "user_uuid": "7c4d2d7d-8620-4fb3-967a-4a621082cf1f"

    }

---

## Delete dashboards collaborators

#### Required API key scopes

`dashboard:write`

---

#### Path parameters

integer

* **project_id**
* Type: string

* **user__uuid**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

string

---

#### Request

`DELETE ``/api/projects/:project_id/dashboards/:dashboard_id/collaborators/:user__uuid`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboards/:dashboard_id/collaborators/:user__uuid/

#### Response

##### Status 204 No response body

---

## List all dashboards sharing

#### Required API key scopes

`sharing_configuration:read`

---

#### Path parameters

* **dashboard_id**
* Type: integer

* **project_id**

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/dashboards/:dashboard_id/sharing`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboards/:dashboard_id/sharing/

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

## Create dashboards sharing refresh

#### Required API key scopes

`sharing_configuration:write`

---

#### Path parameters

* **dashboard_id**
* Type: integer

* **project_id**

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **enabled**
* Type: boolean

* **settings**

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/dashboards/:dashboard_id/sharing/refresh`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboards/:dashboard_id/sharing/refresh/\

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

## Retrieve dashboards

#### Required API key scopes

`dashboard:read`

---

#### Path parameters

* **id**
* Type: integer

* **project_id**

A unique integer value identifying this dashboard.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **format**
* Type: string

* **id**

One of: `json` `txt`

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/dashboards/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboards/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "name": "string",

      "description": "string",

      "pinned": true,

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

      "is_shared": true,

      "deleted": true,

      "creation_mode": "default",

      "use_template": "string",

      "use_dashboard": 0,

      "delete_insights": false,

      "filters": {

        "property1": null,

        "property2": null

      },

      "variables": {

        "property1": null,

        "property2": null

      },

      "breakdown_colors": null,

      "data_color_theme_id": 0,

      "tags": [

        null

      ],

      "tiles": [

        {

          "property1": null,

          "property2": null

        }

      ],

      "restriction_level": 21,

      "effective_restriction_level": 21,

      "effective_privilege_level": 21,

      "user_access_level": "string",

      "access_control_version": "string",

      "_create_in_folder": "string",

      "last_refresh": "2019-08-24T14:15:22Z",

      "persisted_filters": {

        "property1": null,

        "property2": null

      },

      "persisted_variables": {

        "property1": null,

        "property2": null

      }

    }

---

## Update dashboards

#### Required API key scopes

`dashboard:write`

---

#### Path parameters

integer

A unique integer value identifying this dashboard.

* **project_id**
* Type: string

* **format**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

One of: `json` `txt`

---

#### Request parameters

* **name**
* Type: string

* **description**

string

* **pinned**
* Type: boolean

* **deleted**

boolean

* **use_template**
* Type: string

* **use_dashboard**

integer

* **delete_insights**
* Type: boolean

* **breakdown_colors**

Default: `false`

* **data_color_theme_id**
* Type: integer

* **tags**

array

* **restriction_level**

* **_create_in_folder**
* Type: string

* **last_refresh**

string

---

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/dashboards/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboards/:id/\

    	-d name="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "name": "string",

      "description": "string",

      "pinned": true,

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

      "is_shared": true,

      "deleted": true,

      "creation_mode": "default",

      "use_template": "string",

      "use_dashboard": 0,

      "delete_insights": false,

      "filters": {

        "property1": null,

        "property2": null

      },

      "variables": {

        "property1": null,

        "property2": null

      },

      "breakdown_colors": null,

      "data_color_theme_id": 0,

      "tags": [

        null

      ],

      "tiles": [

        {

          "property1": null,

          "property2": null

        }

      ],

      "restriction_level": 21,

      "effective_restriction_level": 21,

      "effective_privilege_level": 21,

      "user_access_level": "string",

      "access_control_version": "string",

      "_create_in_folder": "string",

      "last_refresh": "2019-08-24T14:15:22Z",

      "persisted_filters": {

        "property1": null,

        "property2": null

      },

      "persisted_variables": {

        "property1": null,

        "property2": null

      }

    }

---

## Delete dashboards

Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true

#### Required API key scopes

`dashboard:write`

---

#### Path parameters

* **id**
* Type: integer

* **project_id**

A unique integer value identifying this dashboard.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **format**
* Type: string

* **id**

One of: `json` `txt`

---

#### Request

`DELETE ``/api/projects/:project_id/dashboards/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboards/:id/

#### Response

##### Status 405 No response body

---

## Update dashboards move tile

#### Path parameters

integer

A unique integer value identifying this dashboard.

* **project_id**
* Type: string

* **format**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

One of: `json` `txt`

---

#### Request parameters

* **name**
* Type: string

* **description**

string

* **pinned**
* Type: boolean

* **deleted**

boolean

* **use_template**
* Type: string

* **use_dashboard**

integer

* **delete_insights**
* Type: boolean

* **breakdown_colors**

Default: `false`

* **data_color_theme_id**
* Type: integer

* **tags**

array

* **restriction_level**

* **_create_in_folder**
* Type: string

* **last_refresh**

string

---

#### Request

`PATCH ``/api/projects/:project_id/dashboards/:id/move_tile`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboards/:id/move_tile/\

    	-d name="string"

#### Response

##### Status 200 No response body

---

## Retrieve dashboards stream tiles

Stream dashboard metadata and tiles via Server-Sent Events. Sends metadata first, then tiles as they are rendered.

#### Path parameters

* **id**
* Type: integer

* **project_id**

A unique integer value identifying this dashboard.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **format**
* Type: string

* **project_id**

One of: `json` `txt`

---

#### Request

`GET ``/api/projects/:project_id/dashboards/:id/stream_tiles`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboards/:id/stream_tiles/

#### Response

##### Status 200 No response body

---

## Create dashboards create from template json

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **format**
* Type: string

* **name**

One of: `json` `txt`

---

#### Request parameters

string

* **description**
* Type: string

* **pinned**

boolean

* **deleted**
* Type: boolean

* **use_template**

string

* **use_dashboard**
* Type: integer

* **delete_insights**

boolean

Default: `false`

* **breakdown_colors**

* **data_color_theme_id**
* Type: integer

* **tags**

array

* **restriction_level**

* **_create_in_folder**
* Type: string

* **last_refresh**

string

---

#### Request

`POST ``/api/projects/:project_id/dashboards/create_from_template_json`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/dashboards/create_from_template_json/\

    	-d name="string"

#### Response

##### Status 200 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
