# PostHog API - Roles

## Roles

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/organizations/:organization_id/roles/` |
|---|---|
`POST`| `/api/organizations/:organization_id/roles/`
| `GET` | `/api/organizations/:organization_id/roles/:id/` |
| `PATCH` | `/api/organizations/:organization_id/roles/:id/` |
| `DELETE` | `/api/organizations/:organization_id/roles/:id/` |
| `GET` | `/api/organizations/:organization_id/roles/:role_id/role_memberships/` |
| `POST` | `/api/organizations/:organization_id/roles/:role_id/role_memberships/` |
| `DELETE` | `/api/organizations/:organization_id/roles/:role_id/role_memberships/:id/` |

## List all roles

#### Required API key scopes

`organization:read`

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

`GET ``/api/organizations/:organization_id/roles`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/roles/

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

          "feature_flags_access_level": 21,

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

          "members": "string",

          "is_default": "string"

        }

      ]

    }

---

## Create roles

#### Required API key scopes

`organization:write`

---

#### Path parameters

string

---

#### Request parameters

* **name**
* Type: string

* **feature_flags_access_level**

---

#### Response

Show response

#### Request

`POST ``/api/organizations/:organization_id/roles`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/roles/\

    	-d name="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "name": "string",

      "feature_flags_access_level": 21,

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

      "members": "string",

      "is_default": "string"

    }

---

## Retrieve roles

#### Required API key scopes

`organization:read`

---

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this role.

string

---

#### Response

Show response

#### Request

`GET ``/api/organizations/:organization_id/roles/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/roles/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "name": "string",

      "feature_flags_access_level": 21,

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

      "members": "string",

      "is_default": "string"

    }

---

## Update roles

#### Required API key scopes

`organization:write`

---

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this role.

string

---

#### Request parameters

* **name**
* Type: string

* **feature_flags_access_level**

---

#### Response

Show response

#### Request

`PATCH ``/api/organizations/:organization_id/roles/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/roles/:id/\

    	-d name="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "name": "string",

      "feature_flags_access_level": 21,

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

      "members": "string",

      "is_default": "string"

    }

---

## Delete roles

#### Required API key scopes

`organization:write`

---

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this role.

string

---

#### Request

`DELETE ``/api/organizations/:organization_id/roles/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/roles/:id/

#### Response

##### Status 204 No response body

---

## List all roles role memberships

#### Required API key scopes

`organization:read`

---

#### Path parameters

* **organization_id**
* Type: string

* **role_id**

string

---

#### Query parameters

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

`GET ``/api/organizations/:organization_id/roles/:role_id/role_memberships`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/roles/:role_id/role_memberships/

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

          "role_id": "ac4e70c8-d5be-48af-93eb-760f58fc91a9",

          "organization_member": {

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

          },

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

          "joined_at": "2019-08-24T14:15:22Z",

          "updated_at": "2019-08-24T14:15:22Z",

          "user_uuid": "7c4d2d7d-8620-4fb3-967a-4a621082cf1f"

        }

      ]

    }

---

## Create roles role memberships

#### Required API key scopes

`organization:write`

---

#### Path parameters

* **organization_id**
* Type: string

* **role_id**

string

---

#### Request parameters

* **user_uuid**
* Type: string

* **id**

---

#### Response

Show response

#### Request

`POST ``/api/organizations/:organization_id/roles/:role_id/role_memberships`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/roles/:role_id/role_memberships/\

    	-d user_uuid="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "role_id": "ac4e70c8-d5be-48af-93eb-760f58fc91a9",

      "organization_member": {

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

      },

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

      "joined_at": "2019-08-24T14:15:22Z",

      "updated_at": "2019-08-24T14:15:22Z",

      "user_uuid": "7c4d2d7d-8620-4fb3-967a-4a621082cf1f"

    }

---

## Delete roles role memberships

#### Required API key scopes

`organization:write`

---

#### Path parameters

string

A UUID string identifying this role membership.

* **organization_id**
* Type: string

* **role_id**

string

---

#### Request

`DELETE ``/api/organizations/:organization_id/roles/:role_id/role_memberships/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/roles/:role_id/role_memberships/:id/

#### Response

##### Status 204 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
