# PostHog API - Session Recordings

## Session recordings

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/session_recordings/` |
|---|---|
`GET`| `/api/projects/:project_id/session_recordings/:id/`
| `PATCH` | `/api/projects/:project_id/session_recordings/:id/` |
| `DELETE` | `/api/projects/:project_id/session_recordings/:id/` |
| `GET` | `/api/projects/:project_id/session_recordings/:recording_id/sharing/` |
| `POST` | `/api/projects/:project_id/session_recordings/:recording_id/sharing/refresh/` |

## List all session recordings

This endpoint **does not** provide the raw JSON of the replays. To get the raw JSON, you need to click **Export as JSON** in the replay options menu in-app. If you want us to build exports or have a strong opinion on how you'd like to use them, vote or comment on [this issue on our roadmap](https://github.com/PostHog/posthog/issues/15164).

---

#### Required API key scopes

`session_recording:read`

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

* **id**

The initial index from which to return the results.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/session_recordings`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/session_recordings/

#### Response

##### Status 200

RESPONSE

    {

      "count": 123,

      "next": "http://api.example.org/accounts/?offset=400&limit=100",

      "previous": "http://api.example.org/accounts/?offset=200&limit=100",

      "results": [

        {

          "id": "string",

          "distinct_id": "string",

          "viewed": true,

          "viewers": [

            "string"

          ],

          "recording_duration": 0,

          "active_seconds": 0,

          "inactive_seconds": 0,

          "start_time": "2019-08-24T14:15:22Z",

          "end_time": "2019-08-24T14:15:22Z",

          "click_count": 0,

          "keypress_count": 0,

          "mouse_activity_count": 0,

          "console_log_count": 0,

          "console_warn_count": 0,

          "console_error_count": 0,

          "start_url": "string",

          "person": {

            "id": 0,

            "name": "string",

            "distinct_ids": "string",

            "properties": null,

            "created_at": "2019-08-24T14:15:22Z",

            "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f"

          },

          "storage": "string",

          "snapshot_source": "string",

          "ongoing": true,

          "activity_score": 0.1

        }

      ]

    }

---

## Retrieve session recordings

#### Required API key scopes

`session_recording:read`

---

#### Path parameters

string

A UUID string identifying this session recording.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/session_recordings/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/session_recordings/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": "string",

      "distinct_id": "string",

      "viewed": true,

      "viewers": [

        "string"

      ],

      "recording_duration": 0,

      "active_seconds": 0,

      "inactive_seconds": 0,

      "start_time": "2019-08-24T14:15:22Z",

      "end_time": "2019-08-24T14:15:22Z",

      "click_count": 0,

      "keypress_count": 0,

      "mouse_activity_count": 0,

      "console_log_count": 0,

      "console_warn_count": 0,

      "console_error_count": 0,

      "start_url": "string",

      "person": {

        "id": 0,

        "name": "string",

        "distinct_ids": "string",

        "properties": null,

        "created_at": "2019-08-24T14:15:22Z",

        "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f"

      },

      "storage": "string",

      "snapshot_source": "string",

      "ongoing": true,

      "activity_score": 0.1

    }

---

## Update session recordings

#### Required API key scopes

`session_recording:write`

---

#### Path parameters

string

A UUID string identifying this session recording.

* **project_id**
* Type: string

* **person**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

---

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/session_recordings/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/session_recordings/:id/\

    	-d distinct_id="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": "string",

      "distinct_id": "string",

      "viewed": true,

      "viewers": [

        "string"

      ],

      "recording_duration": 0,

      "active_seconds": 0,

      "inactive_seconds": 0,

      "start_time": "2019-08-24T14:15:22Z",

      "end_time": "2019-08-24T14:15:22Z",

      "click_count": 0,

      "keypress_count": 0,

      "mouse_activity_count": 0,

      "console_log_count": 0,

      "console_warn_count": 0,

      "console_error_count": 0,

      "start_url": "string",

      "person": {

        "id": 0,

        "name": "string",

        "distinct_ids": "string",

        "properties": null,

        "created_at": "2019-08-24T14:15:22Z",

        "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f"

      },

      "storage": "string",

      "snapshot_source": "string",

      "ongoing": true,

      "activity_score": 0.1

    }

---

## Delete session recordings

#### Required API key scopes

`session_recording:write`

---

#### Path parameters

* **id**
* Type: string

* **project_id**

A UUID string identifying this session recording.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`DELETE ``/api/projects/:project_id/session_recordings/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/session_recordings/:id/

#### Response

##### Status 204 No response body

---

## List all session recordings sharing

#### Required API key scopes

`sharing_configuration:read`

---

#### Path parameters

* **project_id**
* Type: string

* **recording_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

string

---

#### Request

`GET ``/api/projects/:project_id/session_recordings/:recording_id/sharing`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/session_recordings/:recording_id/sharing/

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

## Create session recordings sharing refresh

#### Required API key scopes

`sharing_configuration:write`

---

#### Path parameters

* **project_id**
* Type: string

* **recording_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

string

---

#### Request parameters

* **enabled**
* Type: boolean

* **settings**

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/session_recordings/:recording_id/sharing/refresh`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/session_recordings/:recording_id/sharing/refresh/\

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

### Community questions

Ask a questionLogin

### Was this page useful?
