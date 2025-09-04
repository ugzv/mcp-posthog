# PostHog API - Members

## Members

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/organizations/:organization_id/members/` |
|---|---|
`PATCH`| `/api/organizations/:organization_id/members/:user__uuid/`
| `DELETE` | `/api/organizations/:organization_id/members/:user__uuid/` |
| `GET` | `/api/organizations/:organization_id/members/:user__uuid/scoped_api_keys/` |

## List all members

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

`GET ``/api/organizations/:organization_id/members`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/members/

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

          "level": 1,

          "joined_at": "2019-08-24T14:15:22Z",

          "updated_at": "2019-08-24T14:15:22Z",

          "is_2fa_enabled": true,

          "has_social_auth": true,

          "last_login": "2019-08-24T14:15:22Z"

        }

      ]

    }

---

## Update members

#### Required API key scopes

`organization_member:write`

---

#### Path parameters

string

* **user__uuid**
* Type: string

* **level**

---

#### Request parameters

---

#### Response

Show response

#### Request

`PATCH ``/api/organizations/:organization_id/members/:user__uuid`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/members/:user__uuid/\

    	-d user=undefined

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

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

      "level": 1,

      "joined_at": "2019-08-24T14:15:22Z",

      "updated_at": "2019-08-24T14:15:22Z",

      "is_2fa_enabled": true,

      "has_social_auth": true,

      "last_login": "2019-08-24T14:15:22Z"

    }

---

## Delete members

#### Required API key scopes

`organization_member:write`

---

#### Path parameters

* **organization_id**
* Type: string

* **user__uuid**

string

---

#### Request

`DELETE ``/api/organizations/:organization_id/members/:user__uuid`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/members/:user__uuid/

#### Response

##### Status 204 No response body

---

## Retrieve members scoped api keys

#### Path parameters

* **organization_id**
* Type: string

* **user__uuid**

string

---

#### Response

Show response

#### Request

`GET ``/api/organizations/:organization_id/members/:user__uuid/scoped_api_keys`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/members/:user__uuid/scoped_api_keys/

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

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

      "level": 1,

      "joined_at": "2019-08-24T14:15:22Z",

      "updated_at": "2019-08-24T14:15:22Z",

      "is_2fa_enabled": true,

      "has_social_auth": true,

      "last_login": "2019-08-24T14:15:22Z"

    }

### Community questions

Ask a questionLogin

### Was this page useful?
