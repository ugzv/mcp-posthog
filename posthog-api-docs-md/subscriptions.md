# PostHog API - Subscriptions

## Subscriptions

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/subscriptions/` |
|---|---|
`POST`| `/api/projects/:project_id/subscriptions/`
| `GET` | `/api/projects/:project_id/subscriptions/:id/` |
| `PATCH` | `/api/projects/:project_id/subscriptions/:id/` |
| `DELETE` | `/api/projects/:project_id/subscriptions/:id/` |

## List all subscriptions

#### Required API key scopes

`subscription:read`

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

`GET ``/api/projects/:project_id/subscriptions`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/subscriptions/

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

          "dashboard": 0,

          "insight": 0,

          "target_type": "email",

          "target_value": "string",

          "frequency": "daily",

          "interval": -2147483648,

          "byweekday": [

            "monday"

          ],

          "bysetpos": -2147483648,

          "count": -2147483648,

          "start_date": "2019-08-24T14:15:22Z",

          "until_date": "2019-08-24T14:15:22Z",

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

          "title": "string",

          "summary": "string",

          "next_delivery_date": "2019-08-24T14:15:22Z",

          "invite_message": "string"

        }

      ]

    }

---

## Create subscriptions

#### Required API key scopes

`subscription:write`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **dashboard**
* Type: integer

* **insight**

integer

* **target_type**

* **target_value**
* Type: string

* **frequency**

* **interval**
* Type: integer

* **byweekday**

array

* **bysetpos**
* Type: integer

* **count**

integer

* **start_date**
* Type: string

* **until_date**

string

* **deleted**
* Type: boolean

* **title**

string

* **invite_message**
* Type: string

* **id**

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/subscriptions`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/subscriptions/\

    	-d target_type=undefined,\

    	-d target_value="string",\

    	-d frequency=undefined,\

    	-d start_date="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": 0,

      "dashboard": 0,

      "insight": 0,

      "target_type": "email",

      "target_value": "string",

      "frequency": "daily",

      "interval": -2147483648,

      "byweekday": [

        "monday"

      ],

      "bysetpos": -2147483648,

      "count": -2147483648,

      "start_date": "2019-08-24T14:15:22Z",

      "until_date": "2019-08-24T14:15:22Z",

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

      "title": "string",

      "summary": "string",

      "next_delivery_date": "2019-08-24T14:15:22Z",

      "invite_message": "string"

    }

---

## Retrieve subscriptions

#### Required API key scopes

`subscription:read`

---

#### Path parameters

integer

A unique integer value identifying this subscription.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/subscriptions/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/subscriptions/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "dashboard": 0,

      "insight": 0,

      "target_type": "email",

      "target_value": "string",

      "frequency": "daily",

      "interval": -2147483648,

      "byweekday": [

        "monday"

      ],

      "bysetpos": -2147483648,

      "count": -2147483648,

      "start_date": "2019-08-24T14:15:22Z",

      "until_date": "2019-08-24T14:15:22Z",

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

      "title": "string",

      "summary": "string",

      "next_delivery_date": "2019-08-24T14:15:22Z",

      "invite_message": "string"

    }

---

## Update subscriptions

#### Required API key scopes

`subscription:write`

---

#### Path parameters

integer

A unique integer value identifying this subscription.

* **project_id**
* Type: string

* **dashboard**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

integer

* **insight**
* Type: integer

* **target_type**

* **target_value**
* Type: string

* **frequency**

* **interval**
* Type: integer

* **byweekday**

array

* **bysetpos**
* Type: integer

* **count**

integer

* **start_date**
* Type: string

* **until_date**

string

* **deleted**
* Type: boolean

* **title**

string

* **invite_message**
* Type: string

* **id**

---

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/subscriptions/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/subscriptions/:id/\

    	-d dashboard="integer"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "dashboard": 0,

      "insight": 0,

      "target_type": "email",

      "target_value": "string",

      "frequency": "daily",

      "interval": -2147483648,

      "byweekday": [

        "monday"

      ],

      "bysetpos": -2147483648,

      "count": -2147483648,

      "start_date": "2019-08-24T14:15:22Z",

      "until_date": "2019-08-24T14:15:22Z",

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

      "title": "string",

      "summary": "string",

      "next_delivery_date": "2019-08-24T14:15:22Z",

      "invite_message": "string"

    }

---

## Delete subscriptions

Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true

#### Required API key scopes

`subscription:write`

---

#### Path parameters

integer

A unique integer value identifying this subscription.

* **project_id**
  HelpfulCould be better
* Type: string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`DELETE ``/api/projects/:project_id/subscriptions/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/subscriptions/:id/

#### Response

##### Status 405 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
