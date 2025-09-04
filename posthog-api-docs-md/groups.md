# PostHog API - Groups

## Groups

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

List all groups of a specific group type. You must pass ?group_type_index= in the URL. To get a list of valid group types, call /api/:project_id/groups_types/

---

### Endpoints

| `GET` | `/api/projects/:project_id/groups/` |
|---|---|
`POST`| `/api/projects/:project_id/groups/`
| `GET` | `/api/projects/:project_id/groups/activity/` |
| `POST` | `/api/projects/:project_id/groups/delete_property/` |
| `GET` | `/api/projects/:project_id/groups/find/` |
| `GET` | `/api/projects/:project_id/groups/property_definitions/` |
| `GET` | `/api/projects/:project_id/groups/property_values/` |
| `GET` | `/api/projects/:project_id/groups/related/` |
| `POST` | `/api/projects/:project_id/groups/update_property/` |
| `POST` | `/api/projects/:project_id/groups/upsert_properties/` |

## List all groups

This endpoint returns a list of groups.

To add or modify group information, use the [capture endpoint](/docs/api/capture#group-identify).

To query data related to groups, use the [query endpoint](/docs/api/queries) and query the [`groups` table](/docs/data-warehouse/sources/posthog#groups) or the [`events` table](/docs/data-warehouse/sources/posthog#events) and `properties.$groups`.

---

#### Required API key scopes

`group:read`

---

#### Path parameters

* **project_id**
* Type: string

* **cursor**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

The pagination cursor value.

* **group_type_index**
* Type: integer

* **search**

Specify the group type to list

string

Search the group name

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/groups`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups/

#### Response

##### Status 200

RESPONSE

    {

      "next": "http://api.example.org/accounts/?cursor=cD00ODY%3D\"",

      "previous": "http://api.example.org/accounts/?cursor=cj0xJnA9NDg3",

      "results": [

        {

          "group_type_index": -2147483648,

          "group_key": "string",

          "group_properties": null,

          "created_at": "2019-08-24T14:15:22Z"

        }

      ]

    }

---

## Create groups

#### Required API key scopes

`group:write`

---

#### Path parameters

* **project_id**
* Type: string

* **group_type_index**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

integer

* **group_key**
* Type: string

* **group_properties**

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/groups`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups/\

    	-d group_type_index="integer",\

    	-d group_key="string"

#### Response

##### Status 201

RESPONSE

    {

      "group_type_index": -2147483648,

      "group_key": "string",

      "group_properties": null,

      "created_at": "2019-08-24T14:15:22Z"

    }

---

## Retrieve groups activity

#### Required API key scopes

`activity_log:read`

---

#### Path parameters

* **project_id**
* Type: string

* **group_type_index**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

integer

Specify the group type to find

* **id**
* Type: string

* **project_id**

Specify the id of the user to find groups for

---

#### Request

`GET ``/api/projects/:project_id/groups/activity`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups/activity/

#### Response

##### Status 200 No response body

---

## Create groups delete property

#### Required API key scopes

`group:write`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **group_key**
* Type: string

* **group_type_index**

Specify the key of the group to find

integer

Specify the group type to find

---

#### Request parameters

* **group_type_index**
* Type: integer

* **group_key**

string

* **group_properties**
* Type: ---

* **project_id**

#### Request

`POST ``/api/projects/:project_id/groups/delete_property`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups/delete_property/\

    	-d group_type_index="integer",\

    	-d group_key="string"

#### Response

##### Status 200 No response body

---

## Retrieve groups find

#### Required API key scopes

`group:read`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **group_key**
* Type: string

* **group_type_index**

Specify the key of the group to find

integer

Specify the group type to find

---

#### Request

`GET ``/api/projects/:project_id/groups/find`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups/find/

#### Response

##### Status 200 No response body

---

## Retrieve groups property definitions

#### Required API key scopes

`group:read`

---

#### Path parameters

* **project_id**
* Type: string

* **project_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/groups/property_definitions`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups/property_definitions/

#### Response

##### Status 200 No response body

---

## Retrieve groups property values

#### Required API key scopes

`group:read`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/groups/property_values`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups/property_values/

#### Response

##### Status 200 No response body

---

## Retrieve groups related

#### Required API key scopes

`group:read`

---

#### Path parameters

* **project_id**
* Type: string

* **group_type_index**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

integer

Specify the group type to find

* **id**
* Type: string

* **project_id**

Specify the id of the user to find groups for

---

#### Request

`GET ``/api/projects/:project_id/groups/related`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups/related/

#### Response

##### Status 200 No response body

---

## Create groups update property

#### Required API key scopes

`group:write`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

* **group_key**
* Type: string

* **group_type_index**

Specify the key of the group to find

integer

Specify the group type to find

---

#### Request parameters

* **group_type_index**
* Type: integer

* **group_key**

string

* **group_properties**
* Type: ---

* **project_id**

#### Request

`POST ``/api/projects/:project_id/groups/update_property`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups/update_property/\

    	-d group_type_index="integer",\

    	-d group_key="string"

#### Response

##### Status 200 No response body

---

## Create groups upsert properties

#### Required API key scopes

`group:write`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **group_type_index**
* Type: integer

* **group_key**

string

* **group_properties**
  HelpfulCould be better
* Type: ---

#### Request

`POST ``/api/projects/:project_id/groups/upsert_properties`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/groups/upsert_properties/\

    	-d group_type_index="integer",\

    	-d group_key="string"

#### Response

##### Status 200 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
