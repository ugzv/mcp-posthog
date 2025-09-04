# PostHog API - Activity Log

## Activity log

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/activity_log/` |
|---|---|

## List all activity log

#### Required API key scopes

`activity_log:read`

---

#### Path parameters

* **project_id**
  HelpfulCould be better
* Type: string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/activity_log`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/activity_log/

#### Response

##### Status 200

RESPONSE

    [

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

        "unread": true,

        "organization_id": "7c60d51f-b44e-4682-87d6-449835ea4de6",

        "was_impersonated": true,

        "is_system": true,

        "activity": "string",

        "item_id": "string",

        "scope": "string",

        "detail": null,

        "created_at": "2019-08-24T14:15:22Z"

      }

    ]

### Community questions

Ask a questionLogin

### Was this page useful?
