# PostHog API - Actions

## Actions

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/actions/` |
|---|---|
`POST`| `/api/projects/:project_id/actions/`
| `GET` | `/api/projects/:project_id/actions/:id/` |
| `PATCH` | `/api/projects/:project_id/actions/:id/` |
| `DELETE` | `/api/projects/:project_id/actions/:id/` |

## List all actions

#### Required API key scopes

`action:read`

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

`GET ``/api/projects/:project_id/actions`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/actions/

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

          "tags": [

            null

          ],

          "post_to_slack": true,

          "slack_message_format": "string",

          "steps": [

            {

              "event": "string",

              "properties": [

                {

                  "property1": null,

                  "property2": null

                }

              ],

              "selector": "string",

              "tag_name": "string",

              "text": "string",

              "text_matching": "contains",

              "href": "string",

              "href_matching": "contains",

              "url": "string",

              "url_matching": "contains"

            }

          ],

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

          "deleted": true,

          "is_calculating": true,

          "last_calculated_at": "2019-08-24T14:15:22Z",

          "team_id": 0,

          "is_action": true,

          "bytecode_error": "string",

          "pinned_at": "2019-08-24T14:15:22Z",

          "creation_context": "string",

          "_create_in_folder": "string"

        }

      ]

    }

---

## Create actions

#### Required API key scopes

`action:write`

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

* **name**
* Type: string

* **description**

string

* **tags**
* Type: array

* **post_to_slack**

boolean

* **slack_message_format**
* Type: string

* **steps**

array

* **deleted**
* Type: boolean

* **last_calculated_at**

string

* **pinned_at**
* Type: string

* **_create_in_folder**

string

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/actions`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/actions/\

    	-d name="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": 0,

      "name": "string",

      "description": "string",

      "tags": [

        null

      ],

      "post_to_slack": true,

      "slack_message_format": "string",

      "steps": [

        {

          "event": "string",

          "properties": [

            {

              "property1": null,

              "property2": null

            }

          ],

          "selector": "string",

          "tag_name": "string",

          "text": "string",

          "text_matching": "contains",

          "href": "string",

          "href_matching": "contains",

          "url": "string",

          "url_matching": "contains"

        }

      ],

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

      "deleted": true,

      "is_calculating": true,

      "last_calculated_at": "2019-08-24T14:15:22Z",

      "team_id": 0,

      "is_action": true,

      "bytecode_error": "string",

      "pinned_at": "2019-08-24T14:15:22Z",

      "creation_context": "string",

      "_create_in_folder": "string"

    }

---

## Retrieve actions

#### Required API key scopes

`action:read`

---

#### Path parameters

* **id**
* Type: integer

* **project_id**

A unique integer value identifying this action.

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

`GET ``/api/projects/:project_id/actions/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/actions/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "name": "string",

      "description": "string",

      "tags": [

        null

      ],

      "post_to_slack": true,

      "slack_message_format": "string",

      "steps": [

        {

          "event": "string",

          "properties": [

            {

              "property1": null,

              "property2": null

            }

          ],

          "selector": "string",

          "tag_name": "string",

          "text": "string",

          "text_matching": "contains",

          "href": "string",

          "href_matching": "contains",

          "url": "string",

          "url_matching": "contains"

        }

      ],

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

      "deleted": true,

      "is_calculating": true,

      "last_calculated_at": "2019-08-24T14:15:22Z",

      "team_id": 0,

      "is_action": true,

      "bytecode_error": "string",

      "pinned_at": "2019-08-24T14:15:22Z",

      "creation_context": "string",

      "_create_in_folder": "string"

    }

---

## Update actions

#### Required API key scopes

`action:write`

---

#### Path parameters

integer

A unique integer value identifying this action.

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

* **name**
* Type: string

* **description**

string

* **tags**
* Type: array

* **post_to_slack**

boolean

* **slack_message_format**
* Type: string

* **steps**

array

* **deleted**
* Type: boolean

* **last_calculated_at**

string

* **pinned_at**
* Type: string

* **_create_in_folder**

string

---

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/actions/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/actions/:id/\

    	-d name="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "name": "string",

      "description": "string",

      "tags": [

        null

      ],

      "post_to_slack": true,

      "slack_message_format": "string",

      "steps": [

        {

          "event": "string",

          "properties": [

            {

              "property1": null,

              "property2": null

            }

          ],

          "selector": "string",

          "tag_name": "string",

          "text": "string",

          "text_matching": "contains",

          "href": "string",

          "href_matching": "contains",

          "url": "string",

          "url_matching": "contains"

        }

      ],

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

      "deleted": true,

      "is_calculating": true,

      "last_calculated_at": "2019-08-24T14:15:22Z",

      "team_id": 0,

      "is_action": true,

      "bytecode_error": "string",

      "pinned_at": "2019-08-24T14:15:22Z",

      "creation_context": "string",

      "_create_in_folder": "string"

    }

---

## Delete actions

Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true

#### Required API key scopes

`action:write`

---

#### Path parameters

* **id**
* Type: integer

* **project_id**

A unique integer value identifying this action.

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

`DELETE ``/api/projects/:project_id/actions/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/actions/:id/

#### Response

##### Status 405 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
