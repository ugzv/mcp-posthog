# PostHog API - User

Docs

## Users

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/users/` |
|---|---|
`GET`| `/api/users/:uuid/`
| `PATCH` | `/api/users/:uuid/` |
| `DELETE` | `/api/users/:uuid/` |
| `GET` | `/api/users/:uuid/hedgehog_config/` |
| `PATCH` | `/api/users/:uuid/hedgehog_config/` |
| `POST` | `/api/users/:uuid/scene_personalisation/` |
| `GET` | `/api/users/:uuid/start_2fa_setup/` |
| `POST` | `/api/users/:uuid/two_factor_backup_codes/` |

## List all users

#### Required API key scopes

`user:read`

---

#### Query parameters

* **email**
* Type: string

* **is_staff**

boolean

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

`GET ``/api/users`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/

#### Response

##### Status 200

RESPONSE

    {

      "count": 123,

      "next": "http://api.example.org/accounts/?offset=400&limit=100",

      "previous": "http://api.example.org/accounts/?offset=200&limit=100",

      "results": [

        {

          "date_joined": "2019-08-24T14:15:22Z",

          "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

          "distinct_id": "string",

          "first_name": "string",

          "last_name": "string",

          "email": "user@example.com",

          "pending_email": "user@example.com",

          "is_email_verified": true,

          "notification_settings": {

            "property1": null,

            "property2": null

          },

          "anonymize_data": true,

          "toolbar_mode": "disabled",

          "has_password": true,

          "id": 0,

          "is_staff": true,

          "is_impersonated": true,

          "is_impersonated_until": "string",

          "sensitive_session_expires_at": "string",

          "team": {

            "id": 0,

            "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

            "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

            "project_id": -9223372036854776000,

            "api_token": "string",

            "name": "string",

            "completed_snippet_onboarding": true,

            "has_completed_onboarding_for": null,

            "ingested_event": true,

            "is_demo": true,

            "timezone": "Africa/Abidjan",

            "access_control": true

          },

          "organization": {

            "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

            "name": "string",

            "slug": "string",

            "logo_media_id": "a5d9f2f1-d934-4d2e-bebe-4b3cdcd08a33",

            "created_at": "2019-08-24T14:15:22Z",

            "updated_at": "2019-08-24T14:15:22Z",

            "membership_level": 1,

            "plugins_access_level": 0,

            "teams": [

              {

                "property1": null,

                "property2": null

              }

            ],

            "projects": [

              {

                "property1": null,

                "property2": null

              }

            ],

            "available_product_features": [

              null

            ],

            "is_member_join_email_enabled": true,

            "metadata": "string",

            "customer_id": "string",

            "enforce_2fa": true,

            "members_can_invite": true,

            "members_can_use_personal_api_keys": true,

            "allow_publicly_shared_resources": true,

            "member_count": "string",

            "is_ai_data_processing_approved": true,

            "default_experiment_stats_method": "bayesian",

            "default_role_id": "string"

          },

          "organizations": [

            {

              "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

              "name": "string",

              "slug": "string",

              "logo_media_id": "a5d9f2f1-d934-4d2e-bebe-4b3cdcd08a33",

              "membership_level": 1,

              "members_can_use_personal_api_keys": true

            }

          ],

          "set_current_organization": "string",

          "set_current_team": "string",

          "password": "string",

          "current_password": "string",

          "events_column_config": null,

          "is_2fa_enabled": true,

          "has_social_auth": true,

          "has_sso_enforcement": true,

          "has_seen_product_intro_for": null,

          "scene_personalisation": [

            {

              "scene": "string",

              "dashboard": 0

            }

          ],

          "theme_mode": "light",

          "hedgehog_config": null,

          "role_at_organization": "engineering"

        }

      ]

    }

---

## List all users

#### Required API key scopes

`user:read`

---

#### Query parameters

* **email**
* Type: string

* **is_staff**

boolean

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

`GET ``/api/users`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/

#### Response

##### Status 200

RESPONSE

    {

      "count": 123,

      "next": "http://api.example.org/accounts/?offset=400&limit=100",

      "previous": "http://api.example.org/accounts/?offset=200&limit=100",

      "results": [

        {

          "date_joined": "2019-08-24T14:15:22Z",

          "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

          "distinct_id": "string",

          "first_name": "string",

          "last_name": "string",

          "email": "user@example.com",

          "pending_email": "user@example.com",

          "is_email_verified": true,

          "notification_settings": {

            "property1": null,

            "property2": null

          },

          "anonymize_data": true,

          "toolbar_mode": "disabled",

          "has_password": true,

          "id": 0,

          "is_staff": true,

          "is_impersonated": true,

          "is_impersonated_until": "string",

          "sensitive_session_expires_at": "string",

          "team": {

            "id": 0,

            "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

            "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

            "project_id": -9223372036854776000,

            "api_token": "string",

            "name": "string",

            "completed_snippet_onboarding": true,

            "has_completed_onboarding_for": null,

            "ingested_event": true,

            "is_demo": true,

            "timezone": "Africa/Abidjan",

            "access_control": true

          },

          "organization": {

            "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

            "name": "string",

            "slug": "string",

            "logo_media_id": "a5d9f2f1-d934-4d2e-bebe-4b3cdcd08a33",

            "created_at": "2019-08-24T14:15:22Z",

            "updated_at": "2019-08-24T14:15:22Z",

            "membership_level": 1,

            "plugins_access_level": 0,

            "teams": [

              {

                "property1": null,

                "property2": null

              }

            ],

            "projects": [

              {

                "property1": null,

                "property2": null

              }

            ],

            "available_product_features": [

              null

            ],

            "is_member_join_email_enabled": true,

            "metadata": "string",

            "customer_id": "string",

            "enforce_2fa": true,

            "members_can_invite": true,

            "members_can_use_personal_api_keys": true,

            "allow_publicly_shared_resources": true,

            "member_count": "string",

            "is_ai_data_processing_approved": true,

            "default_experiment_stats_method": "bayesian",

            "default_role_id": "string"

          },

          "organizations": [

            {

              "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

              "name": "string",

              "slug": "string",

              "logo_media_id": "a5d9f2f1-d934-4d2e-bebe-4b3cdcd08a33",

              "membership_level": 1,

              "members_can_use_personal_api_keys": true

            }

          ],

          "set_current_organization": "string",

          "set_current_team": "string",

          "password": "string",

          "current_password": "string",

          "events_column_config": null,

          "is_2fa_enabled": true,

          "has_social_auth": true,

          "has_sso_enforcement": true,

          "has_seen_product_intro_for": null,

          "scene_personalisation": [

            {

              "scene": "string",

              "dashboard": 0

            }

          ],

          "theme_mode": "light",

          "hedgehog_config": null,

          "role_at_organization": "engineering"

        }

      ]

    }

---

## Retrieve users

#### Required API key scopes

`user:read`

---

#### Path parameters

* **uuid**
* Type: string

* **uuid**

---

#### Response

Show response

#### Request

`GET ``/api/users/:uuid`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/

#### Response

##### Status 200

RESPONSE

    {

      "date_joined": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

      "distinct_id": "string",

      "first_name": "string",

      "last_name": "string",

      "email": "user@example.com",

      "pending_email": "user@example.com",

      "is_email_verified": true,

      "notification_settings": {

        "property1": null,

        "property2": null

      },

      "anonymize_data": true,

      "toolbar_mode": "disabled",

      "has_password": true,

      "id": 0,

      "is_staff": true,

      "is_impersonated": true,

      "is_impersonated_until": "string",

      "sensitive_session_expires_at": "string",

      "team": {

        "id": 0,

        "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

        "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

        "project_id": -9223372036854776000,

        "api_token": "string",

        "name": "string",

        "completed_snippet_onboarding": true,

        "has_completed_onboarding_for": null,

        "ingested_event": true,

        "is_demo": true,

        "timezone": "Africa/Abidjan",

        "access_control": true

      },

      "organization": {

        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

        "name": "string",

        "slug": "string",

        "logo_media_id": "a5d9f2f1-d934-4d2e-bebe-4b3cdcd08a33",

        "created_at": "2019-08-24T14:15:22Z",

        "updated_at": "2019-08-24T14:15:22Z",

        "membership_level": 1,

        "plugins_access_level": 0,

        "teams": [

          {

            "property1": null,

            "property2": null

          }

        ],

        "projects": [

          {

            "property1": null,

            "property2": null

          }

        ],

        "available_product_features": [

          null

        ],

        "is_member_join_email_enabled": true,

        "metadata": "string",

        "customer_id": "string",

        "enforce_2fa": true,

        "members_can_invite": true,

        "members_can_use_personal_api_keys": true,

        "allow_publicly_shared_resources": true,

        "member_count": "string",

        "is_ai_data_processing_approved": true,

        "default_experiment_stats_method": "bayesian",

        "default_role_id": "string"

      },

      "organizations": [

        {

          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

          "name": "string",

          "slug": "string",

          "logo_media_id": "a5d9f2f1-d934-4d2e-bebe-4b3cdcd08a33",

          "membership_level": 1,

          "members_can_use_personal_api_keys": true

        }

      ],

      "set_current_organization": "string",

      "set_current_team": "string",

      "password": "string",

      "current_password": "string",

      "events_column_config": null,

      "is_2fa_enabled": true,

      "has_social_auth": true,

      "has_sso_enforcement": true,

      "has_seen_product_intro_for": null,

      "scene_personalisation": [

        {

          "scene": "string",

          "dashboard": 0

        }

      ],

      "theme_mode": "light",

      "hedgehog_config": null,

      "role_at_organization": "engineering"

    }

---

## Retrieve users

#### Required API key scopes

`user:read`

---

#### Path parameters

string

---

#### Response

Show response

#### Request

`GET ``/api/users/:uuid`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/

#### Response

##### Status 200

RESPONSE

    {

      "date_joined": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

      "distinct_id": "string",

      "first_name": "string",

      "last_name": "string",

      "email": "user@example.com",

      "pending_email": "user@example.com",

      "is_email_verified": true,

      "notification_settings": {

        "property1": null,

        "property2": null

      },

      "anonymize_data": true,

      "toolbar_mode": "disabled",

      "has_password": true,

      "id": 0,

      "is_staff": true,

      "is_impersonated": true,

      "is_impersonated_until": "string",

      "sensitive_session_expires_at": "string",

      "team": {

        "id": 0,

        "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

        "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

        "project_id": -9223372036854776000,

        "api_token": "string",

        "name": "string",

        "completed_snippet_onboarding": true,

        "has_completed_onboarding_for": null,

        "ingested_event": true,

        "is_demo": true,

        "timezone": "Africa/Abidjan",

        "access_control": true

      },

      "organization": {

        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

        "name": "string",

        "slug": "string",

        "logo_media_id": "a5d9f2f1-d934-4d2e-bebe-4b3cdcd08a33",

        "created_at": "2019-08-24T14:15:22Z",

        "updated_at": "2019-08-24T14:15:22Z",

        "membership_level": 1,

        "plugins_access_level": 0,

        "teams": [

          {

            "property1": null,

            "property2": null

          }

        ],

        "projects": [

          {

            "property1": null,

            "property2": null

          }

        ],

        "available_product_features": [

          null

        ],

        "is_member_join_email_enabled": true,

        "metadata": "string",

        "customer_id": "string",

        "enforce_2fa": true,

        "members_can_invite": true,

        "members_can_use_personal_api_keys": true,

        "allow_publicly_shared_resources": true,

        "member_count": "string",

        "is_ai_data_processing_approved": true,

        "default_experiment_stats_method": "bayesian",

        "default_role_id": "string"

      },

      "organizations": [

        {

          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

          "name": "string",

          "slug": "string",

          "logo_media_id": "a5d9f2f1-d934-4d2e-bebe-4b3cdcd08a33",

          "membership_level": 1,

          "members_can_use_personal_api_keys": true

        }

      ],

      "set_current_organization": "string",

      "set_current_team": "string",

      "password": "string",

      "current_password": "string",

      "events_column_config": null,

      "is_2fa_enabled": true,

      "has_social_auth": true,

      "has_sso_enforcement": true,

      "has_seen_product_intro_for": null,

      "scene_personalisation": [

        {

          "scene": "string",

          "dashboard": 0

        }

      ],

      "theme_mode": "light",

      "hedgehog_config": null,

      "role_at_organization": "engineering"

    }

---

## Update users

#### Required API key scopes

`user:write`

---

#### Path parameters

* **uuid**
* Type: string

* **first_name**

---

#### Request parameters

string

* **last_name**
* Type: string

* **email**

string

* **notification_settings**
* Type: object

* **anonymize_data**

boolean

* **toolbar_mode**

* **is_staff**
* Type: boolean

* **set_current_organization**

Designates whether the user can log into this admin site.

string

* **set_current_team**
* Type: string

* **password**

string

* **current_password**
* Type: string

* **events_column_config**

* **has_seen_product_intro_for**

* **theme_mode**

* **hedgehog_config**

* **role_at_organization**
* Type: ---

* **uuid**

#### Response

Show response

#### Request

`PATCH ``/api/users/:uuid`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/\

    	-d date_joined="string"

#### Response

##### Status 200

RESPONSE

    {

      "date_joined": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

      "distinct_id": "string",

      "first_name": "string",

      "last_name": "string",

      "email": "user@example.com",

      "pending_email": "user@example.com",

      "is_email_verified": true,

      "notification_settings": {

        "property1": null,

        "property2": null

      },

      "anonymize_data": true,

      "toolbar_mode": "disabled",

      "has_password": true,

      "id": 0,

      "is_staff": true,

      "is_impersonated": true,

      "is_impersonated_until": "string",

      "sensitive_session_expires_at": "string",

      "team": {

        "id": 0,

        "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

        "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

        "project_id": -9223372036854776000,

        "api_token": "string",

        "name": "string",

        "completed_snippet_onboarding": true,

        "has_completed_onboarding_for": null,

        "ingested_event": true,

        "is_demo": true,

        "timezone": "Africa/Abidjan",

        "access_control": true

      },

      "organization": {

        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

        "name": "string",

        "slug": "string",

        "logo_media_id": "a5d9f2f1-d934-4d2e-bebe-4b3cdcd08a33",

        "created_at": "2019-08-24T14:15:22Z",

        "updated_at": "2019-08-24T14:15:22Z",

        "membership_level": 1,

        "plugins_access_level": 0,

        "teams": [

          {

            "property1": null,

            "property2": null

          }

        ],

        "projects": [

          {

            "property1": null,

            "property2": null

          }

        ],

        "available_product_features": [

          null

        ],

        "is_member_join_email_enabled": true,

        "metadata": "string",

        "customer_id": "string",

        "enforce_2fa": true,

        "members_can_invite": true,

        "members_can_use_personal_api_keys": true,

        "allow_publicly_shared_resources": true,

        "member_count": "string",

        "is_ai_data_processing_approved": true,

        "default_experiment_stats_method": "bayesian",

        "default_role_id": "string"

      },

      "organizations": [

        {

          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

          "name": "string",

          "slug": "string",

          "logo_media_id": "a5d9f2f1-d934-4d2e-bebe-4b3cdcd08a33",

          "membership_level": 1,

          "members_can_use_personal_api_keys": true

        }

      ],

      "set_current_organization": "string",

      "set_current_team": "string",

      "password": "string",

      "current_password": "string",

      "events_column_config": null,

      "is_2fa_enabled": true,

      "has_social_auth": true,

      "has_sso_enforcement": true,

      "has_seen_product_intro_for": null,

      "scene_personalisation": [

        {

          "scene": "string",

          "dashboard": 0

        }

      ],

      "theme_mode": "light",

      "hedgehog_config": null,

      "role_at_organization": "engineering"

    }

---

## Update users

#### Required API key scopes

`user:write`

---

#### Path parameters

string

---

#### Request parameters

* **first_name**
* Type: string

* **last_name**

string

* **email**
* Type: string

* **notification_settings**

object

* **anonymize_data**
* Type: boolean

* **toolbar_mode**

* **is_staff**
* Type: boolean

* **set_current_organization**

Designates whether the user can log into this admin site.

string

* **set_current_team**
* Type: string

* **password**

string

* **current_password**
* Type: string

* **events_column_config**

* **has_seen_product_intro_for**

* **theme_mode**

* **hedgehog_config**

* **role_at_organization**
* Type: ---

* **uuid**

#### Response

Show response

#### Request

`PATCH ``/api/users/:uuid`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/\

    	-d date_joined="string"

#### Response

##### Status 200

RESPONSE

    {

      "date_joined": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

      "distinct_id": "string",

      "first_name": "string",

      "last_name": "string",

      "email": "user@example.com",

      "pending_email": "user@example.com",

      "is_email_verified": true,

      "notification_settings": {

        "property1": null,

        "property2": null

      },

      "anonymize_data": true,

      "toolbar_mode": "disabled",

      "has_password": true,

      "id": 0,

      "is_staff": true,

      "is_impersonated": true,

      "is_impersonated_until": "string",

      "sensitive_session_expires_at": "string",

      "team": {

        "id": 0,

        "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

        "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

        "project_id": -9223372036854776000,

        "api_token": "string",

        "name": "string",

        "completed_snippet_onboarding": true,

        "has_completed_onboarding_for": null,

        "ingested_event": true,

        "is_demo": true,

        "timezone": "Africa/Abidjan",

        "access_control": true

      },

      "organization": {

        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

        "name": "string",

        "slug": "string",

        "logo_media_id": "a5d9f2f1-d934-4d2e-bebe-4b3cdcd08a33",

        "created_at": "2019-08-24T14:15:22Z",

        "updated_at": "2019-08-24T14:15:22Z",

        "membership_level": 1,

        "plugins_access_level": 0,

        "teams": [

          {

            "property1": null,

            "property2": null

          }

        ],

        "projects": [

          {

            "property1": null,

            "property2": null

          }

        ],

        "available_product_features": [

          null

        ],

        "is_member_join_email_enabled": true,

        "metadata": "string",

        "customer_id": "string",

        "enforce_2fa": true,

        "members_can_invite": true,

        "members_can_use_personal_api_keys": true,

        "allow_publicly_shared_resources": true,

        "member_count": "string",

        "is_ai_data_processing_approved": true,

        "default_experiment_stats_method": "bayesian",

        "default_role_id": "string"

      },

      "organizations": [

        {

          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

          "name": "string",

          "slug": "string",

          "logo_media_id": "a5d9f2f1-d934-4d2e-bebe-4b3cdcd08a33",

          "membership_level": 1,

          "members_can_use_personal_api_keys": true

        }

      ],

      "set_current_organization": "string",

      "set_current_team": "string",

      "password": "string",

      "current_password": "string",

      "events_column_config": null,

      "is_2fa_enabled": true,

      "has_social_auth": true,

      "has_sso_enforcement": true,

      "has_seen_product_intro_for": null,

      "scene_personalisation": [

        {

          "scene": "string",

          "dashboard": 0

        }

      ],

      "theme_mode": "light",

      "hedgehog_config": null,

      "role_at_organization": "engineering"

    }

---

## Delete users

#### Path parameters

string

---

#### Request

`DELETE ``/api/users/:uuid`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/

#### Response

##### Status 204 No response body

---

## Delete users

#### Path parameters

* **uuid**
* Type: string

* **uuid**

---

#### Request

`DELETE ``/api/users/:uuid`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/

#### Response

##### Status 204 No response body

---

## Retrieve users hedgehog config

#### Path parameters

string

---

#### Request

`GET ``/api/users/:uuid/hedgehog_config`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/hedgehog_config/

#### Response

##### Status 200 No response body

---

## Retrieve users hedgehog config

#### Path parameters

* **uuid**
* Type: string

* **uuid**

---

#### Request

`GET ``/api/users/:uuid/hedgehog_config`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/hedgehog_config/

#### Response

##### Status 200 No response body

---

## Update users hedgehog config

#### Path parameters

string

---

#### Request parameters

* **first_name**
* Type: string

* **last_name**

string

* **email**
* Type: string

* **notification_settings**

object

* **anonymize_data**
* Type: boolean

* **toolbar_mode**

* **is_staff**
* Type: boolean

* **set_current_organization**

Designates whether the user can log into this admin site.

string

* **set_current_team**
* Type: string

* **password**

string

* **current_password**
* Type: string

* **events_column_config**

* **has_seen_product_intro_for**

* **theme_mode**

* **hedgehog_config**

* **role_at_organization**
* Type: ---

* **uuid**

#### Request

`PATCH ``/api/users/:uuid/hedgehog_config`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/hedgehog_config/\

    	-d date_joined="string"

#### Response

##### Status 200 No response body

---

## Update users hedgehog config

#### Path parameters

string

---

#### Request parameters

* **first_name**
* Type: string

* **last_name**

string

* **email**
* Type: string

* **notification_settings**

object

* **anonymize_data**
* Type: boolean

* **toolbar_mode**

* **is_staff**
* Type: boolean

* **set_current_organization**

Designates whether the user can log into this admin site.

string

* **set_current_team**
* Type: string

* **password**

string

* **current_password**
* Type: string

* **events_column_config**

* **has_seen_product_intro_for**

* **theme_mode**

* **hedgehog_config**

* **role_at_organization**
* Type: ---

* **uuid**

#### Request

`PATCH ``/api/users/:uuid/hedgehog_config`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/hedgehog_config/\

    	-d date_joined="string"

#### Response

##### Status 200 No response body

---

## Create users scene personalisation

#### Path parameters

string

---

#### Request parameters

* **first_name**
* Type: string

* **last_name**

string

* **email**
* Type: string

* **notification_settings**

object

* **anonymize_data**
* Type: boolean

* **toolbar_mode**

* **is_staff**
* Type: boolean

* **set_current_organization**

Designates whether the user can log into this admin site.

string

* **set_current_team**
* Type: string

* **password**

string

* **current_password**
* Type: string

* **events_column_config**

* **has_seen_product_intro_for**

* **theme_mode**

* **hedgehog_config**

* **role_at_organization**
* Type: ---

* **uuid**

#### Request

`POST ``/api/users/:uuid/scene_personalisation`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/scene_personalisation/\

    	-d email="string",\

    	-d password="string"

#### Response

##### Status 200 No response body

---

## Create users scene personalisation

#### Path parameters

string

---

#### Request parameters

* **first_name**
* Type: string

* **last_name**

string

* **email**
* Type: string

* **notification_settings**

object

* **anonymize_data**
* Type: boolean

* **toolbar_mode**

* **is_staff**
* Type: boolean

* **set_current_organization**

Designates whether the user can log into this admin site.

string

* **set_current_team**
* Type: string

* **password**

string

* **current_password**
* Type: string

* **events_column_config**

* **has_seen_product_intro_for**

* **theme_mode**

* **hedgehog_config**

* **role_at_organization**
* Type: ---

* **uuid**

#### Request

`POST ``/api/users/:uuid/scene_personalisation`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/scene_personalisation/\

    	-d email="string",\

    	-d password="string"

#### Response

##### Status 200 No response body

---

## Retrieve users start 2fa setup

#### Path parameters

string

---

#### Request

`GET ``/api/users/:uuid/start_2fa_setup`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/start_2fa_setup/

#### Response

##### Status 200 No response body

---

## Retrieve users start 2fa setup

#### Path parameters

* **uuid**
* Type: string

* **uuid**

---

#### Request

`GET ``/api/users/:uuid/start_2fa_setup`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/start_2fa_setup/

#### Response

##### Status 200 No response body

---

## Create users two factor backup codes

Generate new backup codes, invalidating any existing ones

#### Path parameters

string

---

#### Request parameters

* **first_name**
* Type: string

* **last_name**

string

* **email**
* Type: string

* **notification_settings**

object

* **anonymize_data**
* Type: boolean

* **toolbar_mode**

* **is_staff**
* Type: boolean

* **set_current_organization**

Designates whether the user can log into this admin site.

string

* **set_current_team**
* Type: string

* **password**

string

* **current_password**
* Type: string

* **events_column_config**

* **has_seen_product_intro_for**

* **theme_mode**

* **hedgehog_config**

* **role_at_organization**
* Type: ---

* **uuid**

#### Request

`POST ``/api/users/:uuid/two_factor_backup_codes`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/two_factor_backup_codes/\

    	-d email="string",\

    	-d password="string"

#### Response

##### Status 200 No response body

---

## Create users two factor backup codes

Generate new backup codes, invalidating any existing ones

#### Path parameters

string

---

#### Request parameters

* **first_name**
* Type: string

* **last_name**

string

* **email**
* Type: string

* **notification_settings**

object

* **anonymize_data**
* Type: boolean

* **toolbar_mode**

* **is_staff**
* Type: boolean

* **set_current_organization**

Designates whether the user can log into this admin site.

string

* **set_current_team**
* Type: string

* **password**

string

* **current_password**
* Type: string

* **events_column_config**

* **has_seen_product_intro_for**

* **theme_mode**

* **hedgehog_config**

* **role_at_organization**
  HelpfulCould be better
* Type: ---

#### Request

`POST ``/api/users/:uuid/two_factor_backup_codes`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/users/:uuid/two_factor_backup_codes/\

    	-d email="string",\

    	-d password="string"

#### Response

##### Status 200 No response body

---

[Next page →](/docs/api/users-2)

### Community questions

Ask a questionLogin

### Was this page useful?
