# PostHog API - Notebooks

## Notebooks

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

The API for interacting with Notebooks. This feature is in early access and the API can have breaking changes without announcement.

---

### Endpoints

| `GET` | `/api/projects/:project_id/notebooks/` |
|---|---|
`POST`| `/api/projects/:project_id/notebooks/`
| `GET` | `/api/projects/:project_id/notebooks/:short_id/` |
| `PATCH` | `/api/projects/:project_id/notebooks/:short_id/` |
| `DELETE` | `/api/projects/:project_id/notebooks/:short_id/` |
| `GET` | `/api/projects/:project_id/notebooks/:short_id/activity/` |
| `GET` | `/api/projects/:project_id/notebooks/activity/` |
| `GET` | `/api/projects/:project_id/notebooks/recording_comments/` |

## List all notebooks

#### Required API key scopes

`notebook:read`

---

#### Path parameters

* **project_id**
* Type: string

* **contains**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

Filter for notebooks that match a provided filter. Each match pair is separated by a colon, multiple match pairs can be sent separated by a space or a comma

* **created_by**
* Type: integer

* **date_from**

The UUID of the Notebook's creator

string

Filter for notebooks created after this date & time

* **date_to**
* Type: string

* **limit**

Filter for notebooks created before this date & time

integer

Number of results to return per page.

* **offset**
* Type: integer

* **user**

The initial index from which to return the results.

string

If any value is provided for this parameter, return notebooks created by the logged in user.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/notebooks`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/notebooks/

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

          "short_id": "string",

          "title": "string",

          "deleted": true,

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

          "user_access_level": "string",

          "_create_in_folder": "string"

        }

      ]

    }

---

## Create notebooks

#### Required API key scopes

`notebook:write`

---

#### Path parameters

* **project_id**
* Type: string

* **title**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

* **content**

* **text_content**
* Type: string

* **version**

integer

* **deleted**
* Type: boolean

* **_create_in_folder**

string

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/notebooks`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/notebooks/\

    	-d title="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "short_id": "string",

      "title": "string",

      "content": null,

      "text_content": "string",

      "version": -2147483648,

      "deleted": true,

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

      "user_access_level": "string",

      "_create_in_folder": "string"

    }

---

## Retrieve notebooks

#### Required API key scopes

`notebook:read`

---

#### Path parameters

* **project_id**
* Type: string

* **short_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

string

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/notebooks/:short_id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/notebooks/:short_id/

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "short_id": "string",

      "title": "string",

      "content": null,

      "text_content": "string",

      "version": -2147483648,

      "deleted": true,

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

      "user_access_level": "string",

      "_create_in_folder": "string"

    }

---

## Update notebooks

#### Required API key scopes

`notebook:write`

---

#### Path parameters

* **project_id**
* Type: string

* **short_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

string

---

#### Request parameters

* **title**
* Type: string

* **content**

* **text_content**
* Type: string

* **version**

integer

* **deleted**
* Type: boolean

* **_create_in_folder**

string

---

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/notebooks/:short_id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/notebooks/:short_id/\

    	-d title="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "short_id": "string",

      "title": "string",

      "content": null,

      "text_content": "string",

      "version": -2147483648,

      "deleted": true,

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

      "user_access_level": "string",

      "_create_in_folder": "string"

    }

---

## Delete notebooks

Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true

#### Required API key scopes

`notebook:write`

---

#### Path parameters

* **project_id**
* Type: string

* **short_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

string

---

#### Request

`DELETE ``/api/projects/:project_id/notebooks/:short_id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/notebooks/:short_id/

#### Response

##### Status 405 No response body

---

## Retrieve notebooks activity retrieve

#### Required API key scopes

`activity_log:read`

---

#### Path parameters

* **project_id**
* Type: string

* **short_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

string

---

#### Request

`GET ``/api/projects/:project_id/notebooks/:short_id/activity`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/notebooks/:short_id/activity/

#### Response

##### Status 200 No response body

---

## Retrieve notebooks activity

#### Path parameters

* **project_id**
* Type: string

* **project_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/notebooks/activity`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/notebooks/activity/

#### Response

##### Status 200 No response body

---

## Retrieve notebooks recording comments

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/notebooks/recording_comments`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/notebooks/recording_comments/

#### Response

##### Status 200 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
