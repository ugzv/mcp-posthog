# PostHog API - Experiments

## Experiments

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/experiments/` |
|---|---|
`POST`| `/api/projects/:project_id/experiments/`
| `GET` | `/api/projects/:project_id/experiments/:id/` |
| `PATCH` | `/api/projects/:project_id/experiments/:id/` |
| `DELETE` | `/api/projects/:project_id/experiments/:id/` |
| `POST` | `/api/projects/:project_id/experiments/:id/create_exposure_cohort_for_experiment/` |
| `POST` | `/api/projects/:project_id/experiments/:id/duplicate/` |
| `GET` | `/api/projects/:project_id/experiments/requires_flag_implementation/` |

## List all experiments

#### Required API key scopes

`experiment:read`

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

`GET ``/api/projects/:project_id/experiments`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/experiments/

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

          "description": "string",

          "start_date": "2019-08-24T14:15:22Z",

          "end_date": "2019-08-24T14:15:22Z",

          "feature_flag_key": "string",

          "feature_flag": {

            "id": 0,

            "team_id": 0,

            "name": "string",

            "key": "string",

            "filters": {

              "property1": null,

              "property2": null

            },

            "deleted": true,

            "active": true,

            "ensure_experience_continuity": true,

            "has_encrypted_payloads": true,

            "version": -2147483648,

            "evaluation_runtime": "server"

          },

          "holdout": {

            "id": 0,

            "name": "string",

            "description": "string",

            "filters": null,

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

            "updated_at": "2019-08-24T14:15:22Z"

          },

          "holdout_id": 0,

          "exposure_cohort": 0,

          "parameters": null,

          "secondary_metrics": null,

          "saved_metrics": [

            {

              "id": 0,

              "experiment": 0,

              "saved_metric": 0,

              "metadata": null,

              "created_at": "2019-08-24T14:15:22Z",

              "query": null,

              "name": "string"

            }

          ],

          "saved_metrics_ids": [

            null

          ],

          "filters": null,

          "archived": true,

          "deleted": true,

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

          "type": "web",

          "exposure_criteria": null,

          "metrics": null,

          "metrics_secondary": null,

          "stats_config": null,

          "_create_in_folder": "string",

          "conclusion": "won",

          "conclusion_comment": "string",

          "primary_metrics_ordered_uuids": null,

          "secondary_metrics_ordered_uuids": null

        }

      ]

    }

---

## Create experiments

#### Required API key scopes

`experiment:write`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **name**
* Type: string

* **description**

string

* **start_date**
* Type: string

* **end_date**

string

* **feature_flag_key**
* Type: string

* **holdout_id**

integer

* **parameters**

* **secondary_metrics**

* **saved_metrics_ids**
* Type: array

* **filters**

* **archived**
* Type: boolean

* **deleted**

boolean

* **type**

* **exposure_criteria**

* **metrics**

* **metrics_secondary**

* **stats_config**

* **_create_in_folder**
* Type: string

* **conclusion**

* **conclusion_comment**
* Type: string

* **primary_metrics_ordered_uuids**

* **secondary_metrics_ordered_uuids**
* Type: ---

* **id**

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/experiments`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/experiments/\

    	-d name="string",\

    	-d feature_flag_key="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": 0,

      "name": "string",

      "description": "string",

      "start_date": "2019-08-24T14:15:22Z",

      "end_date": "2019-08-24T14:15:22Z",

      "feature_flag_key": "string",

      "feature_flag": {

        "id": 0,

        "team_id": 0,

        "name": "string",

        "key": "string",

        "filters": {

          "property1": null,

          "property2": null

        },

        "deleted": true,

        "active": true,

        "ensure_experience_continuity": true,

        "has_encrypted_payloads": true,

        "version": -2147483648,

        "evaluation_runtime": "server"

      },

      "holdout": {

        "id": 0,

        "name": "string",

        "description": "string",

        "filters": null,

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

        "updated_at": "2019-08-24T14:15:22Z"

      },

      "holdout_id": 0,

      "exposure_cohort": 0,

      "parameters": null,

      "secondary_metrics": null,

      "saved_metrics": [

        {

          "id": 0,

          "experiment": 0,

          "saved_metric": 0,

          "metadata": null,

          "created_at": "2019-08-24T14:15:22Z",

          "query": null,

          "name": "string"

        }

      ],

      "saved_metrics_ids": [

        null

      ],

      "filters": null,

      "archived": true,

      "deleted": true,

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

      "type": "web",

      "exposure_criteria": null,

      "metrics": null,

      "metrics_secondary": null,

      "stats_config": null,

      "_create_in_folder": "string",

      "conclusion": "won",

      "conclusion_comment": "string",

      "primary_metrics_ordered_uuids": null,

      "secondary_metrics_ordered_uuids": null

    }

---

## Retrieve experiments

#### Required API key scopes

`experiment:read`

---

#### Path parameters

integer

A unique integer value identifying this experiment.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/experiments/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/experiments/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "name": "string",

      "description": "string",

      "start_date": "2019-08-24T14:15:22Z",

      "end_date": "2019-08-24T14:15:22Z",

      "feature_flag_key": "string",

      "feature_flag": {

        "id": 0,

        "team_id": 0,

        "name": "string",

        "key": "string",

        "filters": {

          "property1": null,

          "property2": null

        },

        "deleted": true,

        "active": true,

        "ensure_experience_continuity": true,

        "has_encrypted_payloads": true,

        "version": -2147483648,

        "evaluation_runtime": "server"

      },

      "holdout": {

        "id": 0,

        "name": "string",

        "description": "string",

        "filters": null,

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

        "updated_at": "2019-08-24T14:15:22Z"

      },

      "holdout_id": 0,

      "exposure_cohort": 0,

      "parameters": null,

      "secondary_metrics": null,

      "saved_metrics": [

        {

          "id": 0,

          "experiment": 0,

          "saved_metric": 0,

          "metadata": null,

          "created_at": "2019-08-24T14:15:22Z",

          "query": null,

          "name": "string"

        }

      ],

      "saved_metrics_ids": [

        null

      ],

      "filters": null,

      "archived": true,

      "deleted": true,

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

      "type": "web",

      "exposure_criteria": null,

      "metrics": null,

      "metrics_secondary": null,

      "stats_config": null,

      "_create_in_folder": "string",

      "conclusion": "won",

      "conclusion_comment": "string",

      "primary_metrics_ordered_uuids": null,

      "secondary_metrics_ordered_uuids": null

    }

---

## Update experiments

#### Required API key scopes

`experiment:write`

---

#### Path parameters

integer

A unique integer value identifying this experiment.

* **project_id**
* Type: string

* **name**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

* **description**
* Type: string

* **start_date**

string

* **end_date**
* Type: string

* **feature_flag_key**

string

* **holdout_id**
* Type: integer

* **parameters**

* **secondary_metrics**

* **saved_metrics_ids**
* Type: array

* **filters**

* **archived**
* Type: boolean

* **deleted**

boolean

* **type**

* **exposure_criteria**

* **metrics**

* **metrics_secondary**

* **stats_config**

* **_create_in_folder**
* Type: string

* **conclusion**

* **conclusion_comment**
* Type: string

* **primary_metrics_ordered_uuids**

* **secondary_metrics_ordered_uuids**
* Type: ---

* **id**

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/experiments/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/experiments/:id/\

    	-d name="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "name": "string",

      "description": "string",

      "start_date": "2019-08-24T14:15:22Z",

      "end_date": "2019-08-24T14:15:22Z",

      "feature_flag_key": "string",

      "feature_flag": {

        "id": 0,

        "team_id": 0,

        "name": "string",

        "key": "string",

        "filters": {

          "property1": null,

          "property2": null

        },

        "deleted": true,

        "active": true,

        "ensure_experience_continuity": true,

        "has_encrypted_payloads": true,

        "version": -2147483648,

        "evaluation_runtime": "server"

      },

      "holdout": {

        "id": 0,

        "name": "string",

        "description": "string",

        "filters": null,

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

        "updated_at": "2019-08-24T14:15:22Z"

      },

      "holdout_id": 0,

      "exposure_cohort": 0,

      "parameters": null,

      "secondary_metrics": null,

      "saved_metrics": [

        {

          "id": 0,

          "experiment": 0,

          "saved_metric": 0,

          "metadata": null,

          "created_at": "2019-08-24T14:15:22Z",

          "query": null,

          "name": "string"

        }

      ],

      "saved_metrics_ids": [

        null

      ],

      "filters": null,

      "archived": true,

      "deleted": true,

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

      "type": "web",

      "exposure_criteria": null,

      "metrics": null,

      "metrics_secondary": null,

      "stats_config": null,

      "_create_in_folder": "string",

      "conclusion": "won",

      "conclusion_comment": "string",

      "primary_metrics_ordered_uuids": null,

      "secondary_metrics_ordered_uuids": null

    }

---

## Delete experiments

Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true

#### Required API key scopes

`experiment:write`

---

#### Path parameters

integer

A unique integer value identifying this experiment.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`DELETE ``/api/projects/:project_id/experiments/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/experiments/:id/

#### Response

##### Status 405 No response body

---

## Create experiments create exposure cohort for experiment

#### Required API key scopes

`experiment:write`

---

#### Path parameters

integer

A unique integer value identifying this experiment.

* **project_id**
* Type: string

* **name**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

* **description**
* Type: string

* **start_date**

string

* **end_date**
* Type: string

* **feature_flag_key**

string

* **holdout_id**
* Type: integer

* **parameters**

* **secondary_metrics**

* **saved_metrics_ids**
* Type: array

* **filters**

* **archived**
* Type: boolean

* **deleted**

boolean

* **type**

* **exposure_criteria**

* **metrics**

* **metrics_secondary**

* **stats_config**

* **_create_in_folder**
* Type: string

* **conclusion**

* **conclusion_comment**
* Type: string

* **primary_metrics_ordered_uuids**

* **secondary_metrics_ordered_uuids**
* Type: ---

* **id**

#### Request

`POST ``/api/projects/:project_id/experiments/:id/create_exposure_cohort_for_experiment`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/experiments/:id/create_exposure_cohort_for_experiment/\

    	-d name="string",\

    	-d feature_flag_key="string"

#### Response

##### Status 200 No response body

---

## Create experiments duplicate

#### Required API key scopes

`experiment:write`

---

#### Path parameters

integer

A unique integer value identifying this experiment.

* **project_id**
* Type: string

* **name**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

* **description**
* Type: string

* **start_date**

string

* **end_date**
* Type: string

* **feature_flag_key**

string

* **holdout_id**
* Type: integer

* **parameters**

* **secondary_metrics**

* **saved_metrics_ids**
* Type: array

* **filters**

* **archived**
* Type: boolean

* **deleted**

boolean

* **type**

* **exposure_criteria**

* **metrics**

* **metrics_secondary**

* **stats_config**

* **_create_in_folder**
* Type: string

* **conclusion**

* **conclusion_comment**
* Type: string

* **primary_metrics_ordered_uuids**

* **secondary_metrics_ordered_uuids**
* Type: ---

* **project_id**

#### Request

`POST ``/api/projects/:project_id/experiments/:id/duplicate`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/experiments/:id/duplicate/\

    	-d name="string",\

    	-d feature_flag_key="string"

#### Response

##### Status 200 No response body

---

## Retrieve experiments requires flag implementation

#### Required API key scopes

`experiment:read`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/experiments/requires_flag_implementation`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/experiments/requires_flag_implementation/

#### Response

##### Status 200 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
