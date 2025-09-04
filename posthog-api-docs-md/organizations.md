# PostHog API - Organizations

## Organizations

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/organizations/` |
|---|---|
`POST`| `/api/organizations/`
| `GET` | `/api/organizations/:id/` |
| `PATCH` | `/api/organizations/:id/` |
| `DELETE` | `/api/organizations/:id/` |
| `POST` | `/api/organizations/:id/environments_rollback/` |
| `GET` | `/api/organizations/:organization_id/batch_exports/` |
| `POST` | `/api/organizations/:organization_id/batch_exports/` |
| `GET` | `/api/organizations/:organization_id/batch_exports/:id/` |
| `PATCH` | `/api/organizations/:organization_id/batch_exports/:id/` |
| `DELETE` | `/api/organizations/:organization_id/batch_exports/:id/` |
| `POST` | `/api/organizations/:organization_id/batch_exports/:id/backfill/` |

## Retrieve

#### Required API key scopes

`organization:read`

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

`GET ``/api/organizations`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/

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

        }

      ]

    }

---

## Retrieve

#### Required API key scopes

`organization:read`

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

`GET ``/api/organizations`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/

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

        }

      ]

    }

---

## Create

#### Required API key scopes

`organization:write`

---

#### Request parameters

* **name**
* Type: string

* **logo_media_id**

string

* **is_member_join_email_enabled**
* Type: boolean

* **enforce_2fa**

boolean

* **members_can_invite**
* Type: boolean

* **members_can_use_personal_api_keys**

boolean

* **allow_publicly_shared_resources**
* Type: boolean

* **is_ai_data_processing_approved**

boolean

* **default_experiment_stats_method**
      * `bayesian` \- Bayesian
* Type: Default statistical method for new experiments in this organization.
    * `frequentist` \- Frequentist

* **default_role_id**
* Type: string

* **name**

ID of the role to automatically assign to new members joining the organization

---

#### Response

Show response

#### Request

`POST ``/api/organizations`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/\

    	-d name="string"

#### Response

##### Status 201

RESPONSE

    {

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

    }

---

## Create

#### Required API key scopes

`organization:write`

---

#### Request parameters

string

* **logo_media_id**
* Type: string

* **is_member_join_email_enabled**

boolean

* **enforce_2fa**
* Type: boolean

* **members_can_invite**

boolean

* **members_can_use_personal_api_keys**
* Type: boolean

* **allow_publicly_shared_resources**

boolean

* **is_ai_data_processing_approved**
* Type: boolean

* **default_experiment_stats_method**

Default statistical method for new experiments in this organization.

    * `bayesian` \- Bayesian
    * `frequentist` \- Frequentist

* **default_role_id**
* Type: string

* **id**

ID of the role to automatically assign to new members joining the organization

---

#### Response

Show response

#### Request

`POST ``/api/organizations`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/\

    	-d name="string"

#### Response

##### Status 201

RESPONSE

    {

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

    }

---

## Retrieve

#### Required API key scopes

`organization:read`

---

#### Path parameters

string

A UUID string identifying this organization.

---

#### Response

Show response

#### Request

`GET ``/api/organizations/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:id/

#### Response

##### Status 200

RESPONSE

    {

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

    }

---

## Retrieve

#### Required API key scopes

`organization:read`

---

#### Path parameters

* **id**
* Type: string

* **id**

A UUID string identifying this organization.

---

#### Response

Show response

#### Request

`GET ``/api/organizations/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:id/

#### Response

##### Status 200

RESPONSE

    {

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

    }

---

## Update partial

#### Required API key scopes

`organization:write`

---

#### Path parameters

string

A UUID string identifying this organization.

---

#### Request parameters

* **name**
* Type: string

* **logo_media_id**

string

* **is_member_join_email_enabled**
* Type: boolean

* **enforce_2fa**

boolean

* **members_can_invite**
* Type: boolean

* **members_can_use_personal_api_keys**

boolean

* **allow_publicly_shared_resources**
* Type: boolean

* **is_ai_data_processing_approved**

boolean

* **default_experiment_stats_method**
      * `bayesian` \- Bayesian
* Type: Default statistical method for new experiments in this organization.
    * `frequentist` \- Frequentist

* **default_role_id**
* Type: string

* **id**

ID of the role to automatically assign to new members joining the organization

---

#### Response

Show response

#### Request

`PATCH ``/api/organizations/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:id/\

    	-d name="string"

#### Response

##### Status 200

RESPONSE

    {

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

    }

---

## Update partial

#### Required API key scopes

`organization:write`

---

#### Path parameters

string

A UUID string identifying this organization.

---

#### Request parameters

* **name**
* Type: string

* **logo_media_id**

string

* **is_member_join_email_enabled**
* Type: boolean

* **enforce_2fa**

boolean

* **members_can_invite**
* Type: boolean

* **members_can_use_personal_api_keys**

boolean

* **allow_publicly_shared_resources**
* Type: boolean

* **is_ai_data_processing_approved**

boolean

* **default_experiment_stats_method**
      * `bayesian` \- Bayesian
* Type: Default statistical method for new experiments in this organization.
    * `frequentist` \- Frequentist

* **default_role_id**
* Type: string

* **id**

ID of the role to automatically assign to new members joining the organization

---

#### Response

Show response

#### Request

`PATCH ``/api/organizations/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:id/\

    	-d name="string"

#### Response

##### Status 200

RESPONSE

    {

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

    }

---

## Delete

#### Required API key scopes

`organization:write`

---

#### Path parameters

string

A UUID string identifying this organization.

---

#### Request

`DELETE ``/api/organizations/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:id/

#### Response

##### Status 204 No response body

---

## Delete

#### Required API key scopes

`organization:write`

---

#### Path parameters

* **id**
* Type: string

* **id**

A UUID string identifying this organization.

---

#### Request

`DELETE ``/api/organizations/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:id/

#### Response

##### Status 204 No response body

---

## Create environments rollback

Trigger environments rollback migration for users previously on multi-environment projects. The request data should be a mapping of source environment IDs to target environment IDs. Example: { "2": 2, "116911": 2, "99346": 99346, "140256": 99346 }

#### Path parameters

string

A UUID string identifying this organization.

---

#### Request parameters

* **name**
* Type: string

* **logo_media_id**

string

* **is_member_join_email_enabled**
* Type: boolean

* **enforce_2fa**

boolean

* **members_can_invite**
* Type: boolean

* **members_can_use_personal_api_keys**

boolean

* **allow_publicly_shared_resources**
* Type: boolean

* **is_ai_data_processing_approved**

boolean

* **default_experiment_stats_method**
      * `bayesian` \- Bayesian
* Type: Default statistical method for new experiments in this organization.
    * `frequentist` \- Frequentist

* **default_role_id**
* Type: string

* **organization_id**

ID of the role to automatically assign to new members joining the organization

---

#### Response

Show response

#### Request

`POST ``/api/organizations/:id/environments_rollback`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:id/environments_rollback/\

    	-d name="string"

#### Response

##### Status 200

RESPONSE

    {

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

    }

---

## List all batch exports

#### Required API key scopes

`batch_export:read`

---

#### Path parameters

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

`GET ``/api/organizations/:organization_id/batch_exports`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/

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

          "team_id": 0,

          "name": "string",

          "model": "events",

          "destination": {

            "type": "S3",

            "config": null

          },

          "interval": "hour",

          "paused": true,

          "created_at": "2019-08-24T14:15:22Z",

          "last_updated_at": "2019-08-24T14:15:22Z",

          "last_paused_at": "2019-08-24T14:15:22Z",

          "start_at": "2019-08-24T14:15:22Z",

          "end_at": "2019-08-24T14:15:22Z",

          "latest_runs": [

            {

              "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

              "status": "Cancelled",

              "records_completed": -2147483648,

              "latest_error": "string",

              "data_interval_start": "2019-08-24T14:15:22Z",

              "data_interval_end": "2019-08-24T14:15:22Z",

              "cursor": "string",

              "created_at": "2019-08-24T14:15:22Z",

              "finished_at": "2019-08-24T14:15:22Z",

              "last_updated_at": "2019-08-24T14:15:22Z",

              "records_total_count": -2147483648,

              "bytes_exported": -9223372036854776000,

              "batch_export": "0fa0a8a1-f280-4977-8bb4-bc7801a6902f",

              "backfill": "4f806519-f4aa-4807-bea5-95595ab1adf0"

            }

          ],

          "hogql_query": "string",

          "schema": null,

          "filters": null

        }

      ]

    }

---

## Create batch exports

#### Required API key scopes

`batch_export:write`

---

#### Path parameters

* **organization_id**
* Type: string

* **name**

---

#### Request parameters

string

A human-readable name for this BatchExport.

* **model**
      * `events` \- Events
* Type: Which model this BatchExport is exporting.
    * `persons` \- Persons
    * `sessions` \- Sessions

* **destination**

* **interval**

* **paused**
* Type: boolean

* **last_paused_at**

Whether this BatchExport is paused or not.

string

The timestamp at which this BatchExport was last paused.

* **start_at**
* Type: string

* **end_at**

Time before which any Batch Export runs won't be triggered.

string

Time after which any Batch Export runs won't be triggered.

* **hogql_query**
* Type: string

* **filters**

---

#### Response

Show response

#### Request

`POST ``/api/organizations/:organization_id/batch_exports`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/\

    	-d name="string",\

    	-d destination=undefined,\

    	-d interval=undefined

#### Response

##### Status 201

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "team_id": 0,

      "name": "string",

      "model": "events",

      "destination": {

        "type": "S3",

        "config": null

      },

      "interval": "hour",

      "paused": true,

      "created_at": "2019-08-24T14:15:22Z",

      "last_updated_at": "2019-08-24T14:15:22Z",

      "last_paused_at": "2019-08-24T14:15:22Z",

      "start_at": "2019-08-24T14:15:22Z",

      "end_at": "2019-08-24T14:15:22Z",

      "latest_runs": [

        {

          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

          "status": "Cancelled",

          "records_completed": -2147483648,

          "latest_error": "string",

          "data_interval_start": "2019-08-24T14:15:22Z",

          "data_interval_end": "2019-08-24T14:15:22Z",

          "cursor": "string",

          "created_at": "2019-08-24T14:15:22Z",

          "finished_at": "2019-08-24T14:15:22Z",

          "last_updated_at": "2019-08-24T14:15:22Z",

          "records_total_count": -2147483648,

          "bytes_exported": -9223372036854776000,

          "batch_export": "0fa0a8a1-f280-4977-8bb4-bc7801a6902f",

          "backfill": "4f806519-f4aa-4807-bea5-95595ab1adf0"

        }

      ],

      "hogql_query": "string",

      "schema": null,

      "filters": null

    }

---

## Retrieve batch exports

#### Required API key scopes

`batch_export:read`

---

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this batch export.

string

---

#### Response

Show response

#### Request

`GET ``/api/organizations/:organization_id/batch_exports/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "team_id": 0,

      "name": "string",

      "model": "events",

      "destination": {

        "type": "S3",

        "config": null

      },

      "interval": "hour",

      "paused": true,

      "created_at": "2019-08-24T14:15:22Z",

      "last_updated_at": "2019-08-24T14:15:22Z",

      "last_paused_at": "2019-08-24T14:15:22Z",

      "start_at": "2019-08-24T14:15:22Z",

      "end_at": "2019-08-24T14:15:22Z",

      "latest_runs": [

        {

          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

          "status": "Cancelled",

          "records_completed": -2147483648,

          "latest_error": "string",

          "data_interval_start": "2019-08-24T14:15:22Z",

          "data_interval_end": "2019-08-24T14:15:22Z",

          "cursor": "string",

          "created_at": "2019-08-24T14:15:22Z",

          "finished_at": "2019-08-24T14:15:22Z",

          "last_updated_at": "2019-08-24T14:15:22Z",

          "records_total_count": -2147483648,

          "bytes_exported": -9223372036854776000,

          "batch_export": "0fa0a8a1-f280-4977-8bb4-bc7801a6902f",

          "backfill": "4f806519-f4aa-4807-bea5-95595ab1adf0"

        }

      ],

      "hogql_query": "string",

      "schema": null,

      "filters": null

    }

---

## Update batch exports

#### Required API key scopes

`batch_export:write`

---

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this batch export.

string

---

#### Request parameters

* **name**
* Type: string

* **model**

A human-readable name for this BatchExport.

Which model this BatchExport is exporting.

    * `events` \- Events
    * `persons` \- Persons
    * `sessions` \- Sessions

* **destination**

* **interval**

* **paused**
* Type: boolean

* **last_paused_at**

Whether this BatchExport is paused or not.

string

The timestamp at which this BatchExport was last paused.

* **start_at**
* Type: string

* **end_at**

Time before which any Batch Export runs won't be triggered.

string

Time after which any Batch Export runs won't be triggered.

* **hogql_query**
* Type: string

* **filters**

---

#### Response

Show response

#### Request

`PATCH ``/api/organizations/:organization_id/batch_exports/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/:id/\

    	-d team_id="integer"

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "team_id": 0,

      "name": "string",

      "model": "events",

      "destination": {

        "type": "S3",

        "config": null

      },

      "interval": "hour",

      "paused": true,

      "created_at": "2019-08-24T14:15:22Z",

      "last_updated_at": "2019-08-24T14:15:22Z",

      "last_paused_at": "2019-08-24T14:15:22Z",

      "start_at": "2019-08-24T14:15:22Z",

      "end_at": "2019-08-24T14:15:22Z",

      "latest_runs": [

        {

          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

          "status": "Cancelled",

          "records_completed": -2147483648,

          "latest_error": "string",

          "data_interval_start": "2019-08-24T14:15:22Z",

          "data_interval_end": "2019-08-24T14:15:22Z",

          "cursor": "string",

          "created_at": "2019-08-24T14:15:22Z",

          "finished_at": "2019-08-24T14:15:22Z",

          "last_updated_at": "2019-08-24T14:15:22Z",

          "records_total_count": -2147483648,

          "bytes_exported": -9223372036854776000,

          "batch_export": "0fa0a8a1-f280-4977-8bb4-bc7801a6902f",

          "backfill": "4f806519-f4aa-4807-bea5-95595ab1adf0"

        }

      ],

      "hogql_query": "string",

      "schema": null,

      "filters": null

    }

---

## Delete batch exports

#### Required API key scopes

`batch_export:write`

---

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this batch export.

string

---

#### Request

`DELETE ``/api/organizations/:organization_id/batch_exports/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/:id/

#### Response

##### Status 204 No response body

---

## Create batch exports backfill

Trigger a backfill for a BatchExport.

Note: This endpoint is deprecated. Please use POST /batch_exports/<id>/backfills/ instead.

#### Required API key scopes

`batch_export:write`

---

#### Path parameters

* **id**
* Type: string

* **organization_id**

A UUID string identifying this batch export.

string

---

#### Request parameters

* **name**
* Type: string

* **model**

A human-readable name for this BatchExport.

Which model this BatchExport is exporting.

    * `events` \- Events
    * `persons` \- Persons
    * `sessions` \- Sessions

* **destination**

* **interval**

* **paused**
* Type: boolean

* **last_paused_at**

Whether this BatchExport is paused or not.

string

The timestamp at which this BatchExport was last paused.

* **start_at**
* Type: string

* **end_at**

Time before which any Batch Export runs won't be triggered.

string

Time after which any Batch Export runs won't be triggered.

* **hogql_query**
* Type: string

* **filters**

---

#### Request

`POST ``/api/organizations/:organization_id/batch_exports/:id/backfill`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/batch_exports/:id/backfill/\

    	-d name="string",\

    	-d destination=undefined,\

    	-d interval=undefined

#### Response

##### Status 200 No response body

---

[Next page →](/docs/api/organizations-2)

### Community questions

Ask a questionLogin

### Was this page useful?
