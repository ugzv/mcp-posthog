# PostHog API - Session Recording Playlists

## Session recording playlists

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/session_recording_playlists/` |
|---|---|
`POST`| `/api/projects/:project_id/session_recording_playlists/`
| `GET` | `/api/projects/:project_id/session_recording_playlists/:short_id/` |
| `PATCH` | `/api/projects/:project_id/session_recording_playlists/:short_id/` |
| `DELETE` | `/api/projects/:project_id/session_recording_playlists/:short_id/` |
| `GET` | `/api/projects/:project_id/session_recording_playlists/:short_id/recordings/` |
| `POST` | `/api/projects/:project_id/session_recording_playlists/:short_id/recordings/:session_recording_id/` |
| `DELETE` | `/api/projects/:project_id/session_recording_playlists/:short_id/recordings/:session_recording_id/` |

## List all session recording playlists

#### Required API key scopes

`session_recording_playlist:read`

---

#### Path parameters

* **project_id**
* Type: string

* **created_by**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

integer

* **limit**
* Type: integer

* **offset**

Number of results to return per page.

integer

The initial index from which to return the results.

* **short_id**
* Type: string

* **project_id**

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/session_recording_playlists`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/session_recording_playlists/

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

          "short_id": "string",

          "name": "string",

          "derived_name": "string",

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

          "deleted": true,

          "filters": null,

          "last_modified_at": "2019-08-24T14:15:22Z",

          "last_modified_by": {

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

          "recordings_counts": {

            "property1": {

              "property1": 0,

              "property2": 0

            },

            "property2": {

              "property1": 0,

              "property2": 0

            }

          },

          "type": "collection",

          "_create_in_folder": "string"

        }

      ]

    }

---

## Create session recording playlists

#### Required API key scopes

`session_recording_playlist:write`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **name**
* Type: string

* **derived_name**

string

* **description**
* Type: string

* **pinned**

boolean

* **deleted**
* Type: boolean

* **filters**

* **_create_in_folder**
* Type: string

* **project_id**

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/session_recording_playlists`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/session_recording_playlists/\

    	-d name="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": 0,

      "short_id": "string",

      "name": "string",

      "derived_name": "string",

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

      "deleted": true,

      "filters": null,

      "last_modified_at": "2019-08-24T14:15:22Z",

      "last_modified_by": {

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

      "recordings_counts": {

        "property1": {

          "property1": 0,

          "property2": 0

        },

        "property2": {

          "property1": 0,

          "property2": 0

        }

      },

      "type": "collection",

      "_create_in_folder": "string"

    }

---

## Retrieve session recording playlists

#### Required API key scopes

`session_recording_playlist:read`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

* **short_id**
* Type: string

* **project_id**

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/session_recording_playlists/:short_id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/session_recording_playlists/:short_id/

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "short_id": "string",

      "name": "string",

      "derived_name": "string",

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

      "deleted": true,

      "filters": null,

      "last_modified_at": "2019-08-24T14:15:22Z",

      "last_modified_by": {

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

      "recordings_counts": {

        "property1": {

          "property1": 0,

          "property2": 0

        },

        "property2": {

          "property1": 0,

          "property2": 0

        }

      },

      "type": "collection",

      "_create_in_folder": "string"

    }

---

## Update session recording playlists

#### Required API key scopes

`session_recording_playlist:write`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

* **short_id**
* Type: string

* **name**

---

#### Request parameters

string

* **derived_name**
* Type: string

* **description**

string

* **pinned**
* Type: boolean

* **deleted**

boolean

* **filters**

* **_create_in_folder**
* Type: string

* **project_id**

---

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/session_recording_playlists/:short_id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/session_recording_playlists/:short_id/\

    	-d name="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "short_id": "string",

      "name": "string",

      "derived_name": "string",

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

      "deleted": true,

      "filters": null,

      "last_modified_at": "2019-08-24T14:15:22Z",

      "last_modified_by": {

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

      "recordings_counts": {

        "property1": {

          "property1": 0,

          "property2": 0

        },

        "property2": {

          "property1": 0,

          "property2": 0

        }

      },

      "type": "collection",

      "_create_in_folder": "string"

    }

---

## Delete session recording playlists

Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true

#### Required API key scopes

`session_recording_playlist:write`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

* **short_id**
* Type: string

* **project_id**

---

#### Request

`DELETE ``/api/projects/:project_id/session_recording_playlists/:short_id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/session_recording_playlists/:short_id/

#### Response

##### Status 405 No response body

---

## Retrieve session recording playlists recordings

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

* **short_id**
* Type: string

* **project_id**

---

#### Request

`GET ``/api/projects/:project_id/session_recording_playlists/:short_id/recordings`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/session_recording_playlists/:short_id/recordings/

#### Response

##### Status 200 No response body

---

## Create session recording playlists recordings

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

* **session_recording_id**
* Type: string

* **short_id**

string

---

#### Request parameters

* **name**
* Type: string

* **derived_name**

string

* **description**
* Type: string

* **pinned**

boolean

* **deleted**
* Type: boolean

* **filters**

* **_create_in_folder**
* Type: string

* **project_id**

---

#### Request

`POST ``/api/projects/:project_id/session_recording_playlists/:short_id/recordings/:session_recording_id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/session_recording_playlists/:short_id/recordings/:session_recording_id/\

    	-d name="string"

#### Response

##### Status 200 No response body

---

## Delete session recording playlists recordings

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

* **session_recording_id**
* Type: string

* **short_id**

string

---

#### Request

`DELETE ``/api/projects/:project_id/session_recording_playlists/:short_id/recordings/:session_recording_id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/session_recording_playlists/:short_id/recordings/:session_recording_id/

#### Response

##### Status 204 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
