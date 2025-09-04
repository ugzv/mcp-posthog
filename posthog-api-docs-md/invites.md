# PostHog API - Invites

## Invites

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/organizations/:organization_id/invites/` |
|---|---|
`POST`| `/api/organizations/:organization_id/invites/`
| `DELETE` | `/api/organizations/:organization_id/invites/:id/` |
| `POST` | `/api/organizations/:organization_id/invites/bulk/` |

## List all invites

#### Required API key scopes

`organization_member:read`

---

#### Path parameters

* **organization_id**
* Type: string

* **limit**

---

#### Query parameters

integer

Number of results to return per page.

* **offset**
* Type: integer

* **organization_id**

The initial index from which to return the results.

---

#### Response

Show response

#### Request

`GET ``/api/organizations/:organization_id/invites`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/invites/

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

          "target_email": "user@example.com",

          "first_name": "string",

          "emailing_attempt_made": true,

          "level": 1,

          "is_expired": true,

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

          "created_at": "2019-08-24T14:15:22Z",

          "updated_at": "2019-08-24T14:15:22Z",

          "message": "string",

          "private_project_access": null,

          "send_email": true,

          "combine_pending_invites": false

        }

      ]

    }

---

## Create invites

#### Path parameters

string

---

#### Request parameters

* **target_email**
* Type: string

* **first_name**

string

* **level**

* **message**
* Type: string

* **private_project_access**

List of team IDs and corresponding access levels to private projects.

* **send_email**
* Type: boolean

* **combine_pending_invites**

Default: `true`

boolean

Default: `false`

---

#### Response

Show response

#### Request

`POST ``/api/organizations/:organization_id/invites`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/invites/\

    	-d target_email="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "target_email": "user@example.com",

      "first_name": "string",

      "emailing_attempt_made": true,

      "level": 1,

      "is_expired": true,

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

      "created_at": "2019-08-24T14:15:22Z",

      "updated_at": "2019-08-24T14:15:22Z",

      "message": "string",

      "private_project_access": null,

      "send_email": true,

      "combine_pending_invites": false

    }

---

## Delete invites

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this organization invite.

string

---

#### Request

`DELETE ``/api/organizations/:organization_id/invites/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/invites/:id/

#### Response

##### Status 204 No response body

---

## Create invites bulk

#### Required API key scopes

`organization_member:write`

---

#### Path parameters

* **organization_id**
* Type: string

* **target_email**

---

#### Request parameters

string

* **first_name**
* Type: string

* **level**

* **message**
* Type: string

* **private_project_access**

List of team IDs and corresponding access levels to private projects.

* **send_email**
* Type: boolean

* **combine_pending_invites**

Default: `true`

boolean

Default: `false`

---

#### Request

`POST ``/api/organizations/:organization_id/invites/bulk`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/invites/bulk/\

    	-d target_email="string"

#### Response

##### Status 200 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
