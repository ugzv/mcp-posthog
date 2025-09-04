# PostHog API - Feature Flags

## Feature flags

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

Create, read, update and delete feature flags. [See docs](https://posthog.com/docs/feature-flags) for more information on feature flags.

If you're looking to use feature flags on your application, you can either use our JavaScript Library or our dedicated endpoint to check if feature flags are enabled for a given user.

---

### Endpoints

| `GET` | `/api/projects/:project_id/feature_flags/` |
|---|---|
`POST`| `/api/projects/:project_id/feature_flags/`
| `GET` | `/api/projects/:project_id/feature_flags/:feature_flag_id/role_access/` |
| `POST` | `/api/projects/:project_id/feature_flags/:feature_flag_id/role_access/` |
| `GET` | `/api/projects/:project_id/feature_flags/:feature_flag_id/role_access/:id/` |
| `DELETE` | `/api/projects/:project_id/feature_flags/:feature_flag_id/role_access/:id/` |
| `GET` | `/api/projects/:project_id/feature_flags/:id/` |
| `PATCH` | `/api/projects/:project_id/feature_flags/:id/` |
| `DELETE` | `/api/projects/:project_id/feature_flags/:id/` |
| `GET` | `/api/projects/:project_id/feature_flags/:id/activity/` |
| `POST` | `/api/projects/:project_id/feature_flags/:id/create_static_cohort_for_flag/` |
| `POST` | `/api/projects/:project_id/feature_flags/:id/dashboard/` |
| `POST` | `/api/projects/:project_id/feature_flags/:id/enrich_usage_dashboard/` |
| `GET` | `/api/projects/:project_id/feature_flags/:id/remote_config/` |
| `GET` | `/api/projects/:project_id/feature_flags/:id/status/` |
| `GET` | `/api/projects/:project_id/feature_flags/activity/` |
| `POST` | `/api/projects/:project_id/feature_flags/bulk_keys/` |
| `GET` | `/api/projects/:project_id/feature_flags/evaluation_reasons/` |
| `GET` | `/api/projects/:project_id/feature_flags/local_evaluation/` |

## List all feature flags

This endpoint returns a list of feature flags and their details like `name`, `key`, `variants`, `rollout_percentage`, and more.

To evaluate and determine the value of flags for a given user, use the [`flags` endpoint](/docs/api/flags) instead.

---

#### Required API key scopes

`feature_flag:read`

---

#### Path parameters

* **project_id**
* Type: string

* **active**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

One of: `STALE` `false``"true"`

* **created_by_id**
* Type: string

* **evaluation_runtime**

The User ID which initially created the feature flag.

string

One of: `both` `client``"server"`

Filter feature flags by their evaluation runtime.

* **excluded_properties**
* Type: string

* **limit**

JSON-encoded list of feature flag keys to exclude from the results.

integer

Number of results to return per page.

* **offset**
* Type: integer

* **search**

The initial index from which to return the results.

string

Search by feature flag key or name. Case insensitive.

* **type**
* Type: string

* **project_id**

One of: `boolean` `experiment``"multivariant"`

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/feature_flags`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/

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

          "key": "string",

          "filters": {

            "property1": null,

            "property2": null

          },

          "deleted": true,

          "active": true,

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

          "version": 0,

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

          "is_simple_flag": true,

          "rollout_percentage": 0,

          "ensure_experience_continuity": true,

          "experiment_set": "string",

          "surveys": {

            "property1": null,

            "property2": null

          },

          "features": {

            "property1": null,

            "property2": null

          },

          "rollback_conditions": null,

          "performed_rollback": true,

          "can_edit": true,

          "tags": [

            null

          ],

          "usage_dashboard": 0,

          "analytics_dashboards": [

            0

          ],

          "has_enriched_analytics": true,

          "user_access_level": "string",

          "creation_context": "feature_flags",

          "is_remote_configuration": true,

          "has_encrypted_payloads": true,

          "status": "string",

          "evaluation_runtime": "server",

          "_create_in_folder": "string"

        }

      ]

    }

---

## Create feature flags

#### Required API key scopes

`feature_flag:write`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **name**
* Type: string

* **key**

contains the description for the flag (field name `name` is kept for backwards-compatibility)

string

* **filters**
* Type: object

* **deleted**

boolean

* **active**
* Type: boolean

* **created_at**

string

* **version**
* Type: integer

* **ensure_experience_continuity**

Default: `0`

boolean

* **rollback_conditions**

* **performed_rollback**
* Type: boolean

* **tags**

array

* **analytics_dashboards**
* Type: array

* **has_enriched_analytics**

boolean

* **creation_context**
      * `feature_flags` \- feature_flags
* Type: Indicates the origin product of the feature flag. Choices: 'feature_flags', 'experiments', 'surveys', 'early_access_features', 'web_experiments'.
    * `experiments` \- experiments
    * `surveys` \- surveys
    * `early_access_features` \- early_access_features
    * `web_experiments` \- web_experiments

* **is_remote_configuration**
* Type: boolean

* **has_encrypted_payloads**

boolean

* **evaluation_runtime**
      * `server` \- Server
* Type: Specifies where this feature flag should be evaluated
    * `client` \- Client
    * `all` \- All

* **_create_in_folder**
* Type: string

* **feature_flag_id**

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/feature_flags`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/\

    	-d key="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": 0,

      "name": "string",

      "key": "string",

      "filters": {

        "property1": null,

        "property2": null

      },

      "deleted": true,

      "active": true,

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

      "version": 0,

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

      "is_simple_flag": true,

      "rollout_percentage": 0,

      "ensure_experience_continuity": true,

      "experiment_set": "string",

      "surveys": {

        "property1": null,

        "property2": null

      },

      "features": {

        "property1": null,

        "property2": null

      },

      "rollback_conditions": null,

      "performed_rollback": true,

      "can_edit": true,

      "tags": [

        null

      ],

      "usage_dashboard": 0,

      "analytics_dashboards": [

        0

      ],

      "has_enriched_analytics": true,

      "user_access_level": "string",

      "creation_context": "feature_flags",

      "is_remote_configuration": true,

      "has_encrypted_payloads": true,

      "status": "string",

      "evaluation_runtime": "server",

      "_create_in_folder": "string"

    }

---

## List all feature flags role access

#### Required API key scopes

`feature_flag:read`

---

#### Path parameters

integer

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

* **feature_flag_id**

The initial index from which to return the results.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/feature_flags/:feature_flag_id/role_access`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/:feature_flag_id/role_access/

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

          "feature_flag": {

            "id": 0,

            "name": "string",

            "key": "string",

            "filters": {

              "property1": null,

              "property2": null

            },

            "deleted": true,

            "active": true,

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

            "version": 0,

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

            "is_simple_flag": true,

            "rollout_percentage": 0,

            "ensure_experience_continuity": true,

            "experiment_set": "string",

            "surveys": {

              "property1": null,

              "property2": null

            },

            "features": {

              "property1": null,

              "property2": null

            },

            "rollback_conditions": null,

            "performed_rollback": true,

            "can_edit": true,

            "tags": [

              null

            ],

            "usage_dashboard": 0,

            "analytics_dashboards": [

              0

            ],

            "has_enriched_analytics": true,

            "user_access_level": "string",

            "creation_context": "feature_flags",

            "is_remote_configuration": true,

            "has_encrypted_payloads": true,

            "status": "string",

            "evaluation_runtime": "server",

            "_create_in_folder": "string"

          },

          "role": {

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

          },

          "role_id": "ac4e70c8-d5be-48af-93eb-760f58fc91a9",

          "added_at": "2019-08-24T14:15:22Z",

          "updated_at": "2019-08-24T14:15:22Z"

        }

      ]

    }

---

## Create feature flags role access

#### Required API key scopes

`feature_flag:write`

---

#### Path parameters

integer

* **project_id**
* Type: string

* **role_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/feature_flags/:feature_flag_id/role_access`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/:feature_flag_id/role_access/\

    	-d role_id="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": 0,

      "feature_flag": {

        "id": 0,

        "name": "string",

        "key": "string",

        "filters": {

          "property1": null,

          "property2": null

        },

        "deleted": true,

        "active": true,

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

        "version": 0,

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

        "is_simple_flag": true,

        "rollout_percentage": 0,

        "ensure_experience_continuity": true,

        "experiment_set": "string",

        "surveys": {

          "property1": null,

          "property2": null

        },

        "features": {

          "property1": null,

          "property2": null

        },

        "rollback_conditions": null,

        "performed_rollback": true,

        "can_edit": true,

        "tags": [

          null

        ],

        "usage_dashboard": 0,

        "analytics_dashboards": [

          0

        ],

        "has_enriched_analytics": true,

        "user_access_level": "string",

        "creation_context": "feature_flags",

        "is_remote_configuration": true,

        "has_encrypted_payloads": true,

        "status": "string",

        "evaluation_runtime": "server",

        "_create_in_folder": "string"

      },

      "role": {

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

      },

      "role_id": "ac4e70c8-d5be-48af-93eb-760f58fc91a9",

      "added_at": "2019-08-24T14:15:22Z",

      "updated_at": "2019-08-24T14:15:22Z"

    }

---

## Retrieve feature flags role access

#### Required API key scopes

`feature_flag:read`

---

#### Path parameters

* **feature_flag_id**
* Type: integer

* **id**

integer

A unique integer value identifying this feature flag role access.

* **project_id**
* Type: string

* **feature_flag_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/feature_flags/:feature_flag_id/role_access/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/:feature_flag_id/role_access/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "feature_flag": {

        "id": 0,

        "name": "string",

        "key": "string",

        "filters": {

          "property1": null,

          "property2": null

        },

        "deleted": true,

        "active": true,

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

        "version": 0,

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

        "is_simple_flag": true,

        "rollout_percentage": 0,

        "ensure_experience_continuity": true,

        "experiment_set": "string",

        "surveys": {

          "property1": null,

          "property2": null

        },

        "features": {

          "property1": null,

          "property2": null

        },

        "rollback_conditions": null,

        "performed_rollback": true,

        "can_edit": true,

        "tags": [

          null

        ],

        "usage_dashboard": 0,

        "analytics_dashboards": [

          0

        ],

        "has_enriched_analytics": true,

        "user_access_level": "string",

        "creation_context": "feature_flags",

        "is_remote_configuration": true,

        "has_encrypted_payloads": true,

        "status": "string",

        "evaluation_runtime": "server",

        "_create_in_folder": "string"

      },

      "role": {

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

      },

      "role_id": "ac4e70c8-d5be-48af-93eb-760f58fc91a9",

      "added_at": "2019-08-24T14:15:22Z",

      "updated_at": "2019-08-24T14:15:22Z"

    }

---

## Delete feature flags role access

#### Required API key scopes

`feature_flag:write`

---

#### Path parameters

integer

* **id**
* Type: integer

* **project_id**

A unique integer value identifying this feature flag role access.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`DELETE ``/api/projects/:project_id/feature_flags/:feature_flag_id/role_access/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/:feature_flag_id/role_access/:id/

#### Response

##### Status 204 No response body

---

## Retrieve feature flags

This endpoint returns a feature flag and its details like `name`, `key`, `variants`, `rollout_percentage`, and more.

To evaluate and determine the value of a flag for a given user, use the [`flags` endpoint](/docs/api/flags) instead.

---

#### Required API key scopes

`feature_flag:read`

---

#### Path parameters

* **id**
* Type: integer

* **project_id**

A unique integer value identifying this feature flag.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/feature_flags/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "name": "string",

      "key": "string",

      "filters": {

        "property1": null,

        "property2": null

      },

      "deleted": true,

      "active": true,

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

      "version": 0,

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

      "is_simple_flag": true,

      "rollout_percentage": 0,

      "ensure_experience_continuity": true,

      "experiment_set": "string",

      "surveys": {

        "property1": null,

        "property2": null

      },

      "features": {

        "property1": null,

        "property2": null

      },

      "rollback_conditions": null,

      "performed_rollback": true,

      "can_edit": true,

      "tags": [

        null

      ],

      "usage_dashboard": 0,

      "analytics_dashboards": [

        0

      ],

      "has_enriched_analytics": true,

      "user_access_level": "string",

      "creation_context": "feature_flags",

      "is_remote_configuration": true,

      "has_encrypted_payloads": true,

      "status": "string",

      "evaluation_runtime": "server",

      "_create_in_folder": "string"

    }

---

## Update feature flags

#### Required API key scopes

`feature_flag:write`

---

#### Path parameters

* **id**
* Type: integer

* **project_id**

A unique integer value identifying this feature flag.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **name**
* Type: string

* **key**

contains the description for the flag (field name `name` is kept for backwards-compatibility)

string

* **filters**
* Type: object

* **deleted**

boolean

* **active**
* Type: boolean

* **created_at**

string

* **version**
* Type: integer

* **ensure_experience_continuity**

Default: `0`

boolean

* **rollback_conditions**

* **performed_rollback**
* Type: boolean

* **tags**

array

* **analytics_dashboards**
* Type: array

* **has_enriched_analytics**

boolean

* **creation_context**
      * `feature_flags` \- feature_flags
* Type: Indicates the origin product of the feature flag. Choices: 'feature_flags', 'experiments', 'surveys', 'early_access_features', 'web_experiments'.
    * `experiments` \- experiments
    * `surveys` \- surveys
    * `early_access_features` \- early_access_features
    * `web_experiments` \- web_experiments

* **is_remote_configuration**
* Type: boolean

* **has_encrypted_payloads**

boolean

* **evaluation_runtime**
      * `server` \- Server
* Type: Specifies where this feature flag should be evaluated
    * `client` \- Client
    * `all` \- All

* **_create_in_folder**
* Type: string

* **id**

---

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/feature_flags/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/:id/\

    	-d name="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "name": "string",

      "key": "string",

      "filters": {

        "property1": null,

        "property2": null

      },

      "deleted": true,

      "active": true,

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

      "version": 0,

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

      "is_simple_flag": true,

      "rollout_percentage": 0,

      "ensure_experience_continuity": true,

      "experiment_set": "string",

      "surveys": {

        "property1": null,

        "property2": null

      },

      "features": {

        "property1": null,

        "property2": null

      },

      "rollback_conditions": null,

      "performed_rollback": true,

      "can_edit": true,

      "tags": [

        null

      ],

      "usage_dashboard": 0,

      "analytics_dashboards": [

        0

      ],

      "has_enriched_analytics": true,

      "user_access_level": "string",

      "creation_context": "feature_flags",

      "is_remote_configuration": true,

      "has_encrypted_payloads": true,

      "status": "string",

      "evaluation_runtime": "server",

      "_create_in_folder": "string"

    }

---

## Delete feature flags

Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true

#### Required API key scopes

`feature_flag:write`

---

#### Path parameters

integer

A unique integer value identifying this feature flag.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`DELETE ``/api/projects/:project_id/feature_flags/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/:id/

#### Response

##### Status 405 No response body

---

## Retrieve feature flags activity retrieve

#### Required API key scopes

`activity_log:read`

---

#### Path parameters

integer

A unique integer value identifying this feature flag.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/feature_flags/:id/activity`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/:id/activity/

#### Response

##### Status 200 No response body

---

## Create feature flags create static cohort for flag

#### Path parameters

integer

A unique integer value identifying this feature flag.

* **project_id**
* Type: string

* **name**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

contains the description for the flag (field name `name` is kept for backwards-compatibility)

* **key**
* Type: string

* **filters**

object

* **deleted**
* Type: boolean

* **active**

boolean

* **created_at**
* Type: string

* **version**

integer

Default: `0`

* **ensure_experience_continuity**
* Type: boolean

* **rollback_conditions**

* **performed_rollback**
* Type: boolean

* **tags**

array

* **analytics_dashboards**
* Type: array

* **has_enriched_analytics**

boolean

* **creation_context**
      * `feature_flags` \- feature_flags
* Type: Indicates the origin product of the feature flag. Choices: 'feature_flags', 'experiments', 'surveys', 'early_access_features', 'web_experiments'.
    * `experiments` \- experiments
    * `surveys` \- surveys
    * `early_access_features` \- early_access_features
    * `web_experiments` \- web_experiments

* **is_remote_configuration**
* Type: boolean

* **has_encrypted_payloads**

boolean

* **evaluation_runtime**
      * `server` \- Server
* Type: Specifies where this feature flag should be evaluated
    * `client` \- Client
    * `all` \- All

* **_create_in_folder**
* Type: string

* **id**

---

#### Request

`POST ``/api/projects/:project_id/feature_flags/:id/create_static_cohort_for_flag`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/:id/create_static_cohort_for_flag/\

    	-d key="string"

#### Response

##### Status 200 No response body

---

## Create feature flags dashboard

#### Path parameters

integer

A unique integer value identifying this feature flag.

* **project_id**
* Type: string

* **name**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

contains the description for the flag (field name `name` is kept for backwards-compatibility)

* **key**
* Type: string

* **filters**

object

* **deleted**
* Type: boolean

* **active**

boolean

* **created_at**
* Type: string

* **version**

integer

Default: `0`

* **ensure_experience_continuity**
* Type: boolean

* **rollback_conditions**

* **performed_rollback**
* Type: boolean

* **tags**

array

* **analytics_dashboards**
* Type: array

* **has_enriched_analytics**

boolean

* **creation_context**
      * `feature_flags` \- feature_flags
* Type: Indicates the origin product of the feature flag. Choices: 'feature_flags', 'experiments', 'surveys', 'early_access_features', 'web_experiments'.
    * `experiments` \- experiments
    * `surveys` \- surveys
    * `early_access_features` \- early_access_features
    * `web_experiments` \- web_experiments

* **is_remote_configuration**
* Type: boolean

* **has_encrypted_payloads**

boolean

* **evaluation_runtime**
      * `server` \- Server
* Type: Specifies where this feature flag should be evaluated
    * `client` \- Client
    * `all` \- All

* **_create_in_folder**
* Type: string

* **id**

---

#### Request

`POST ``/api/projects/:project_id/feature_flags/:id/dashboard`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/:id/dashboard/\

    	-d key="string"

#### Response

##### Status 200 No response body

---

## Create feature flags enrich usage dashboard

#### Path parameters

integer

A unique integer value identifying this feature flag.

* **project_id**
* Type: string

* **name**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

contains the description for the flag (field name `name` is kept for backwards-compatibility)

* **key**
* Type: string

* **filters**

object

* **deleted**
* Type: boolean

* **active**

boolean

* **created_at**
* Type: string

* **version**

integer

Default: `0`

* **ensure_experience_continuity**
* Type: boolean

* **rollback_conditions**

* **performed_rollback**
* Type: boolean

* **tags**

array

* **analytics_dashboards**
* Type: array

* **has_enriched_analytics**

boolean

* **creation_context**
      * `feature_flags` \- feature_flags
* Type: Indicates the origin product of the feature flag. Choices: 'feature_flags', 'experiments', 'surveys', 'early_access_features', 'web_experiments'.
    * `experiments` \- experiments
    * `surveys` \- surveys
    * `early_access_features` \- early_access_features
    * `web_experiments` \- web_experiments

* **is_remote_configuration**
* Type: boolean

* **has_encrypted_payloads**

boolean

* **evaluation_runtime**
      * `server` \- Server
* Type: Specifies where this feature flag should be evaluated
    * `client` \- Client
    * `all` \- All

* **_create_in_folder**
* Type: string

* **id**

---

#### Request

`POST ``/api/projects/:project_id/feature_flags/:id/enrich_usage_dashboard`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/:id/enrich_usage_dashboard/\

    	-d key="string"

#### Response

##### Status 200 No response body

---

## Retrieve feature flags remote config

#### Required API key scopes

`feature_flag:read`

---

#### Path parameters

integer

A unique integer value identifying this feature flag.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/feature_flags/:id/remote_config`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/:id/remote_config/

#### Response

##### Status 200 No response body

---

## Retrieve feature flags status

#### Required API key scopes

`feature_flag:read`

---

#### Path parameters

integer

A unique integer value identifying this feature flag.

* **project_id**
* Type: string

* **project_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/feature_flags/:id/status`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/:id/status/

#### Response

##### Status 200 No response body

---

## Retrieve feature flags activity

#### Required API key scopes

`activity_log:read`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/feature_flags/activity`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/activity/

#### Response

##### Status 200 No response body

---

## Create feature flags bulk keys

Get feature flag keys by IDs. Accepts a list of feature flag IDs and returns a mapping of ID to key.

#### Path parameters

* **project_id**
* Type: string

* **name**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

contains the description for the flag (field name `name` is kept for backwards-compatibility)

* **key**
* Type: string

* **filters**

object

* **deleted**
* Type: boolean

* **active**

boolean

* **created_at**
* Type: string

* **version**

integer

Default: `0`

* **ensure_experience_continuity**
* Type: boolean

* **rollback_conditions**

* **performed_rollback**
* Type: boolean

* **tags**

array

* **analytics_dashboards**
* Type: array

* **has_enriched_analytics**

boolean

* **creation_context**
      * `feature_flags` \- feature_flags
* Type: Indicates the origin product of the feature flag. Choices: 'feature_flags', 'experiments', 'surveys', 'early_access_features', 'web_experiments'.
    * `experiments` \- experiments
    * `surveys` \- surveys
    * `early_access_features` \- early_access_features
    * `web_experiments` \- web_experiments

* **is_remote_configuration**
* Type: boolean

* **has_encrypted_payloads**

boolean

* **evaluation_runtime**
      * `server` \- Server
* Type: Specifies where this feature flag should be evaluated
    * `client` \- Client
    * `all` \- All

* **_create_in_folder**
* Type: string

* **project_id**

---

#### Request

`POST ``/api/projects/:project_id/feature_flags/bulk_keys`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/bulk_keys/\

    	-d key="string"

#### Response

##### Status 200 No response body

---

## Retrieve feature flags evaluation reasons

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/feature_flags/evaluation_reasons`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/evaluation_reasons/

#### Response

##### Status 200 No response body

---

## Retrieve feature flags local evaluation

#### Required API key scopes

`feature_flag:read`

---

#### Path parameters

* **project_id**
  HelpfulCould be better
* Type: string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/feature_flags/local_evaluation`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/feature_flags/local_evaluation/

#### Response

##### Status 200 No response body

---

[Next page →](/docs/api/feature-flags-2)

### Community questions

Ask a questionLogin

### Was this page useful?
