# PostHog API - Cohorts

## Cohorts

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/cohorts/` |
|---|---|
`POST`| `/api/projects/:project_id/cohorts/`
| `GET` | `/api/projects/:project_id/cohorts/:id/` |
| `PATCH` | `/api/projects/:project_id/cohorts/:id/` |
| `DELETE` | `/api/projects/:project_id/cohorts/:id/` |
| `GET` | `/api/projects/:project_id/cohorts/:id/activity/` |
| `GET` | `/api/projects/:project_id/cohorts/:id/duplicate_as_static_cohort/` |
| `GET` | `/api/projects/:project_id/cohorts/:id/persons/` |
| `GET` | `/api/projects/:project_id/cohorts/activity/` |

## List all cohorts

#### Required API key scopes

`cohort:read`

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

`GET ``/api/projects/:project_id/cohorts`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/cohorts/

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

          "groups": null,

          "deleted": true,

          "filters": null,

          "query": null,

          "is_calculating": true,

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

          "last_calculation": "2019-08-24T14:15:22Z",

          "errors_calculating": 0,

          "count": 0,

          "is_static": true,

          "cohort_type": "static",

          "experiment_set": [

            0

          ],

          "_create_in_folder": "string"

        }

      ]

    }

---

## Create cohorts

#### Required API key scopes

`cohort:write`

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

* **groups**

* **deleted**
* Type: boolean

* **filters**

Filters for the cohort. Examples:

        # Behavioral filter (performed event)

            {
                "properties": {
                    "type": "OR",
                    "values": [{
                        "type": "OR",
                        "values": [{
                            "key": "address page viewed",
                            "type": "behavioral",
                            "value": "performed_event",
                            "negation": false,
                            "event_type": "events",
                            "time_value": "30",
                            "time_interval": "day"
                        }]
                    }]
                }
            }

            # Person property filter

            {
                "properties": {
                    "type": "OR",
                    "values": [{
                        "type": "AND",
                        "values": [{
                            "key": "promoCodes",
                            "type": "person",
                            "value": ["1234567890"],
                            "negation": false,
                            "operator": "exact"
                        }]
                    }]
                }
            }

            # Cohort filter

            {
                "properties": {
                    "type": "OR",
                    "values": [{
                        "type": "AND",
                        "values": [{
                            "key": "id",
                            "type": "cohort",
                            "value": 8814,
                            "negation": false
                        }]
                    }]
                }
            }

* **query**

* **is_static**
* Type: boolean

* **cohort_type**

Type of cohort based on filter complexity

    * `static` \- static
    * `person_property` \- person_property
    * `behavioral` \- behavioral
    * `analytical` \- analytical

* **_create_in_folder**
* Type: string

* **id**

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/cohorts`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/cohorts/\

    	-d name="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": 0,

      "name": "string",

      "description": "string",

      "groups": null,

      "deleted": true,

      "filters": null,

      "query": null,

      "is_calculating": true,

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

      "last_calculation": "2019-08-24T14:15:22Z",

      "errors_calculating": 0,

      "count": 0,

      "is_static": true,

      "cohort_type": "static",

      "experiment_set": [

        0

      ],

      "_create_in_folder": "string"

    }

---

## Retrieve cohorts

#### Required API key scopes

`cohort:read`

---

#### Path parameters

integer

A unique integer value identifying this cohort.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/cohorts/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/cohorts/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "name": "string",

      "description": "string",

      "groups": null,

      "deleted": true,

      "filters": null,

      "query": null,

      "is_calculating": true,

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

      "last_calculation": "2019-08-24T14:15:22Z",

      "errors_calculating": 0,

      "count": 0,

      "is_static": true,

      "cohort_type": "static",

      "experiment_set": [

        0

      ],

      "_create_in_folder": "string"

    }

---

## Update cohorts

#### Required API key scopes

`cohort:write`

---

#### Path parameters

integer

A unique integer value identifying this cohort.

* **project_id**
* Type: string

* **name**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

* **description**
* Type: string

* **groups**

* **deleted**
* Type: boolean

* **filters**

Filters for the cohort. Examples:

        # Behavioral filter (performed event)

            {
                "properties": {
                    "type": "OR",
                    "values": [{
                        "type": "OR",
                        "values": [{
                            "key": "address page viewed",
                            "type": "behavioral",
                            "value": "performed_event",
                            "negation": false,
                            "event_type": "events",
                            "time_value": "30",
                            "time_interval": "day"
                        }]
                    }]
                }
            }

            # Person property filter

            {
                "properties": {
                    "type": "OR",
                    "values": [{
                        "type": "AND",
                        "values": [{
                            "key": "promoCodes",
                            "type": "person",
                            "value": ["1234567890"],
                            "negation": false,
                            "operator": "exact"
                        }]
                    }]
                }
            }

            # Cohort filter

            {
                "properties": {
                    "type": "OR",
                    "values": [{
                        "type": "AND",
                        "values": [{
                            "key": "id",
                            "type": "cohort",
                            "value": 8814,
                            "negation": false
                        }]
                    }]
                }
            }

* **query**

* **is_static**
* Type: boolean

* **cohort_type**

Type of cohort based on filter complexity

    * `static` \- static
    * `person_property` \- person_property
    * `behavioral` \- behavioral
    * `analytical` \- analytical

* **_create_in_folder**
* Type: string

* **id**

---

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/cohorts/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/cohorts/:id/\

    	-d name="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "name": "string",

      "description": "string",

      "groups": null,

      "deleted": true,

      "filters": null,

      "query": null,

      "is_calculating": true,

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

      "last_calculation": "2019-08-24T14:15:22Z",

      "errors_calculating": 0,

      "count": 0,

      "is_static": true,

      "cohort_type": "static",

      "experiment_set": [

        0

      ],

      "_create_in_folder": "string"

    }

---

## Delete cohorts

Hard delete of this model is not allowed. Use a patch API call to set "deleted" to true

#### Required API key scopes

`cohort:write`

---

#### Path parameters

integer

A unique integer value identifying this cohort.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`DELETE ``/api/projects/:project_id/cohorts/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/cohorts/:id/

#### Response

##### Status 405 No response body

---

## Retrieve cohorts activity retrieve

#### Required API key scopes

`activity_log:read`

---

#### Path parameters

integer

A unique integer value identifying this cohort.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/cohorts/:id/activity`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/cohorts/:id/activity/

#### Response

##### Status 200 No response body

---

## Retrieve cohorts duplicate as static cohort

#### Path parameters

integer

A unique integer value identifying this cohort.

* **project_id**
* Type: string

* **id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/cohorts/:id/duplicate_as_static_cohort`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/cohorts/:id/duplicate_as_static_cohort/

#### Response

##### Status 200 No response body

---

## Retrieve cohorts persons

#### Required API key scopes

`cohort:read``person:read`

---

#### Path parameters

integer

A unique integer value identifying this cohort.

* **project_id**
* Type: string

* **format**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

One of: `csv` `json`

---

#### Request

`GET ``/api/projects/:project_id/cohorts/:id/persons`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/cohorts/:id/persons/

#### Response

##### Status 200 No response body

---

## Retrieve cohorts activity

#### Required API key scopes

`activity_log:read`

---

#### Path parameters

* **project_id**
  HelpfulCould be better
* Type: string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/cohorts/activity`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/cohorts/activity/

#### Response

##### Status 200 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
