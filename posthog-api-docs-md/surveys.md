# PostHog API - Surveys

Surveys

## Survey

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/surveys/` |
|---|---|
`POST`| `/api/projects/:project_id/surveys/`
| `GET` | `/api/projects/:project_id/surveys/:id/` |
| `PATCH` | `/api/projects/:project_id/surveys/:id/` |
| `DELETE` | `/api/projects/:project_id/surveys/:id/` |
| `GET` | `/api/projects/:project_id/surveys/:id/activity/` |
| `GET` | `/api/projects/:project_id/surveys/:id/stats/` |
| `POST` | `/api/projects/:project_id/surveys/:id/summarize_responses/` |
| `GET` | `/api/projects/:project_id/surveys/activity/` |
| `GET` | `/api/projects/:project_id/surveys/responses_count/` |
| `GET` | `/api/projects/:project_id/surveys/stats/` |

## List all surveys

#### Required API key scopes

`survey:read`

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

* **search**

The initial index from which to return the results.

string

A search term.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/surveys`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/surveys/

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

          "description": "string",

          "type": "popover",

          "schedule": "string",

          "linked_flag": {

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

          "linked_flag_id": 0,

          "targeting_flag": {

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

          "internal_targeting_flag": {

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

          "questions": null,

          "conditions": "string",

          "appearance": null,

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

          "start_date": "2019-08-24T14:15:22Z",

          "end_date": "2019-08-24T14:15:22Z",

          "archived": true,

          "responses_limit": 2147483647,

          "feature_flag_keys": [

            null

          ],

          "iteration_count": 500,

          "iteration_frequency_days": 2147483647,

          "iteration_start_dates": [

            "2019-08-24T14:15:22Z"

          ],

          "current_iteration": 2147483647,

          "current_iteration_start_date": "2019-08-24T14:15:22Z",

          "response_sampling_start_date": "2019-08-24T14:15:22Z",

          "response_sampling_interval_type": "day",

          "response_sampling_interval": 2147483647,

          "response_sampling_limit": 2147483647,

          "response_sampling_daily_limits": null,

          "enable_partial_responses": true

        }

      ]

    }

---

## Create surveys

#### Required API key scopes

`survey:write`

---

#### Path parameters

* **project_id**
* Type: string

* **name**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

string

* **description**
* Type: string

* **type**

* **schedule**
* Type: string

* **linked_flag_id**

integer

* **targeting_flag_id**
* Type: integer

* **targeting_flag_filters**

* **remove_targeting_flag**
* Type: boolean

* **questions**

        The `array` of questions included in the survey. Each question must conform to one of the defined question types: Basic, Link, Rating, or Multiple Choice.

            Basic (open-ended question)
            - `type`: `open`
            - `question`: The text of the question.
            - `description`: Optional description of the question.
            - `descriptionContentType`: Content type of the description (`html` or `text`).
            - `optional`: Whether the question is optional (`boolean`).
            - `buttonText`: Text displayed on the submit button.
            - `branching`: Branching logic for the question. See branching types below for details.

            Link (a question with a link)
            - `type`: `link`
            - `question`: The text of the question.
            - `description`: Optional description of the question.
            - `descriptionContentType`: Content type of the description (`html` or `text`).
            - `optional`: Whether the question is optional (`boolean`).
            - `buttonText`: Text displayed on the submit button.
            - `link`: The URL associated with the question.
            - `branching`: Branching logic for the question. See branching types below for details.

            Rating (a question with a rating scale)
            - `type`: `rating`
            - `question`: The text of the question.
            - `description`: Optional description of the question.
            - `descriptionContentType`: Content type of the description (`html` or `text`).
            - `optional`: Whether the question is optional (`boolean`).
            - `buttonText`: Text displayed on the submit button.
            - `display`: Display style of the rating (`number` or `emoji`).
            - `scale`: The scale of the rating (`number`).
            - `lowerBoundLabel`: Label for the lower bound of the scale.
            - `upperBoundLabel`: Label for the upper bound of the scale.
            - `branching`: Branching logic for the question. See branching types below for details.

            Multiple choice
            - `type`: `single_choice` or `multiple_choice`
            - `question`: The text of the question.
            - `description`: Optional description of the question.
            - `descriptionContentType`: Content type of the description (`html` or `text`).
            - `optional`: Whether the question is optional (`boolean`).
            - `buttonText`: Text displayed on the submit button.
            - `choices`: An array of choices for the question.
            - `shuffleOptions`: Whether to shuffle the order of the choices (`boolean`).
            - `hasOpenChoice`: Whether the question allows an open-ended response (`boolean`).
            - `branching`: Branching logic for the question. See branching types below for details.

            Branching logic can be one of the following types:

            Next question: Proceeds to the next question
            ```json
            {
                "type": "next_question"
            }
            ```
            End: Ends the survey, optionally displaying a confirmation message.
            ```json
            {
                "type": "end"
            }
            ```
            Response-based: Branches based on the response values. Available for the `rating` and `single_choice` question types.
            ```json
            {
                "type": "response_based",
                "responseValues": {
                    "responseKey": "value"
                }
            }
            ```
            Specific question: Proceeds to a specific question by index.
            ```json
            {
                "type": "specific_question",
                "index": 2
            }
            ```
* **conditions**

* **appearance**

* **start_date**
* Type: string

* **end_date**

string

* **archived**
* Type: boolean

* **responses_limit**

integer

* **iteration_count**
* Type: integer

* **iteration_frequency_days**

integer

* **iteration_start_dates**
* Type: array

* **current_iteration**

integer

* **current_iteration_start_date**
* Type: string

* **response_sampling_start_date**

string

* **response_sampling_interval_type**

* **response_sampling_interval**
* Type: integer

* **response_sampling_limit**

integer

* **response_sampling_daily_limits**

* **enable_partial_responses**
* Type: boolean

* **_create_in_folder**

string

---

#### Response

Show response

#### Request

`POST ``/api/projects/:project_id/surveys`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/surveys/\

    	-d name="string",\

    	-d type=undefined

#### Response

##### Status 201

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "name": "string",

      "description": "string",

      "type": "popover",

      "schedule": "string",

      "linked_flag": {

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

      "linked_flag_id": 0,

      "targeting_flag_id": 0,

      "targeting_flag": {

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

      "internal_targeting_flag": {

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

      "targeting_flag_filters": null,

      "remove_targeting_flag": true,

      "questions": null,

      "conditions": null,

      "appearance": null,

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

      "start_date": "2019-08-24T14:15:22Z",

      "end_date": "2019-08-24T14:15:22Z",

      "archived": true,

      "responses_limit": 2147483647,

      "iteration_count": 500,

      "iteration_frequency_days": 2147483647,

      "iteration_start_dates": [

        "2019-08-24T14:15:22Z"

      ],

      "current_iteration": 2147483647,

      "current_iteration_start_date": "2019-08-24T14:15:22Z",

      "response_sampling_start_date": "2019-08-24T14:15:22Z",

      "response_sampling_interval_type": "day",

      "response_sampling_interval": 2147483647,

      "response_sampling_limit": 2147483647,

      "response_sampling_daily_limits": null,

      "enable_partial_responses": true,

      "_create_in_folder": "string"

    }

---

## Retrieve surveys

#### Required API key scopes

`survey:read`

---

#### Path parameters

* **id**
* Type: string

* **project_id**

A UUID string identifying this survey.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/surveys/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/surveys/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "name": "string",

      "description": "string",

      "type": "popover",

      "schedule": "string",

      "linked_flag": {

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

      "linked_flag_id": 0,

      "targeting_flag": {

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

      "internal_targeting_flag": {

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

      "questions": null,

      "conditions": "string",

      "appearance": null,

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

      "start_date": "2019-08-24T14:15:22Z",

      "end_date": "2019-08-24T14:15:22Z",

      "archived": true,

      "responses_limit": 2147483647,

      "feature_flag_keys": [

        null

      ],

      "iteration_count": 500,

      "iteration_frequency_days": 2147483647,

      "iteration_start_dates": [

        "2019-08-24T14:15:22Z"

      ],

      "current_iteration": 2147483647,

      "current_iteration_start_date": "2019-08-24T14:15:22Z",

      "response_sampling_start_date": "2019-08-24T14:15:22Z",

      "response_sampling_interval_type": "day",

      "response_sampling_interval": 2147483647,

      "response_sampling_limit": 2147483647,

      "response_sampling_daily_limits": null,

      "enable_partial_responses": true

    }

---

## Update surveys

#### Required API key scopes

`survey:write`

---

#### Path parameters

* **id**
* Type: string

* **project_id**

A UUID string identifying this survey.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **name**
* Type: string

* **description**

string

* **type**

* **schedule**
* Type: string

* **linked_flag_id**

integer

* **targeting_flag_id**
* Type: integer

* **targeting_flag_filters**

* **remove_targeting_flag**
* Type: boolean

* **questions**

        The `array` of questions included in the survey. Each question must conform to one of the defined question types: Basic, Link, Rating, or Multiple Choice.

            Basic (open-ended question)
            - `type`: `open`
            - `question`: The text of the question.
            - `description`: Optional description of the question.
            - `descriptionContentType`: Content type of the description (`html` or `text`).
            - `optional`: Whether the question is optional (`boolean`).
            - `buttonText`: Text displayed on the submit button.
            - `branching`: Branching logic for the question. See branching types below for details.

            Link (a question with a link)
            - `type`: `link`
            - `question`: The text of the question.
            - `description`: Optional description of the question.
            - `descriptionContentType`: Content type of the description (`html` or `text`).
            - `optional`: Whether the question is optional (`boolean`).
            - `buttonText`: Text displayed on the submit button.
            - `link`: The URL associated with the question.
            - `branching`: Branching logic for the question. See branching types below for details.

            Rating (a question with a rating scale)
            - `type`: `rating`
            - `question`: The text of the question.
            - `description`: Optional description of the question.
            - `descriptionContentType`: Content type of the description (`html` or `text`).
            - `optional`: Whether the question is optional (`boolean`).
            - `buttonText`: Text displayed on the submit button.
            - `display`: Display style of the rating (`number` or `emoji`).
            - `scale`: The scale of the rating (`number`).
            - `lowerBoundLabel`: Label for the lower bound of the scale.
            - `upperBoundLabel`: Label for the upper bound of the scale.
            - `branching`: Branching logic for the question. See branching types below for details.

            Multiple choice
            - `type`: `single_choice` or `multiple_choice`
            - `question`: The text of the question.
            - `description`: Optional description of the question.
            - `descriptionContentType`: Content type of the description (`html` or `text`).
            - `optional`: Whether the question is optional (`boolean`).
            - `buttonText`: Text displayed on the submit button.
            - `choices`: An array of choices for the question.
            - `shuffleOptions`: Whether to shuffle the order of the choices (`boolean`).
            - `hasOpenChoice`: Whether the question allows an open-ended response (`boolean`).
            - `branching`: Branching logic for the question. See branching types below for details.

            Branching logic can be one of the following types:

            Next question: Proceeds to the next question
            ```json
            {
                "type": "next_question"
            }
            ```
            End: Ends the survey, optionally displaying a confirmation message.
            ```json
            {
                "type": "end"
            }
            ```
            Response-based: Branches based on the response values. Available for the `rating` and `single_choice` question types.
            ```json
            {
                "type": "response_based",
                "responseValues": {
                    "responseKey": "value"
                }
            }
            ```
            Specific question: Proceeds to a specific question by index.
            ```json
            {
                "type": "specific_question",
                "index": 2
            }
            ```
* **conditions**

* **appearance**

* **start_date**
* Type: string

* **end_date**

string

* **archived**
* Type: boolean

* **responses_limit**

integer

* **iteration_count**
* Type: integer

* **iteration_frequency_days**

integer

* **iteration_start_dates**
* Type: array

* **current_iteration**

integer

* **current_iteration_start_date**
* Type: string

* **response_sampling_start_date**

string

* **response_sampling_interval_type**

* **response_sampling_interval**
* Type: integer

* **response_sampling_limit**

integer

* **response_sampling_daily_limits**

* **enable_partial_responses**
* Type: boolean

* **_create_in_folder**

string

---

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/surveys/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/surveys/:id/\

    	-d name="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "name": "string",

      "description": "string",

      "type": "popover",

      "schedule": "string",

      "linked_flag": {

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

      "linked_flag_id": 0,

      "targeting_flag_id": 0,

      "targeting_flag": {

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

      "internal_targeting_flag": {

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

      "targeting_flag_filters": null,

      "remove_targeting_flag": true,

      "questions": null,

      "conditions": null,

      "appearance": null,

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

      "start_date": "2019-08-24T14:15:22Z",

      "end_date": "2019-08-24T14:15:22Z",

      "archived": true,

      "responses_limit": 2147483647,

      "iteration_count": 500,

      "iteration_frequency_days": 2147483647,

      "iteration_start_dates": [

        "2019-08-24T14:15:22Z"

      ],

      "current_iteration": 2147483647,

      "current_iteration_start_date": "2019-08-24T14:15:22Z",

      "response_sampling_start_date": "2019-08-24T14:15:22Z",

      "response_sampling_interval_type": "day",

      "response_sampling_interval": 2147483647,

      "response_sampling_limit": 2147483647,

      "response_sampling_daily_limits": null,

      "enable_partial_responses": true,

      "_create_in_folder": "string"

    }

---

## Delete surveys

#### Required API key scopes

`survey:write`

---

#### Path parameters

* **id**
* Type: string

* **project_id**

A UUID string identifying this survey.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`DELETE ``/api/projects/:project_id/surveys/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/surveys/:id/

#### Response

##### Status 204 No response body

---

## Retrieve surveys activity retrieve

#### Required API key scopes

`activity_log:read`

---

#### Path parameters

* **id**
* Type: string

* **project_id**

A UUID string identifying this survey.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/surveys/:id/activity`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/surveys/:id/activity/

#### Response

##### Status 200 No response body

---

## Retrieve surveys stats retrieve

Get survey response statistics for a specific survey.

Args: date_from: Optional ISO timestamp for start date (e.g. 2024-01-01T00:00:00Z) date_to: Optional ISO timestamp for end date (e.g. 2024-01-31T23:59:59Z)

Returns: Survey statistics including event counts, unique respondents, and conversion rates

#### Required API key scopes

`survey:read`

---

#### Path parameters

* **id**
* Type: string

* **project_id**

A UUID string identifying this survey.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/surveys/:id/stats`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/surveys/:id/stats/

#### Response

##### Status 200 No response body

---

## Create surveys summarize responses

#### Required API key scopes

`survey:read`

---

#### Path parameters

* **id**
* Type: string

* **project_id**

A UUID string identifying this survey.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **name**
* Type: string

* **description**

string

* **type**

* **schedule**
* Type: string

* **linked_flag_id**

integer

* **targeting_flag_id**
* Type: integer

* **targeting_flag_filters**

* **remove_targeting_flag**
* Type: boolean

* **questions**

        The `array` of questions included in the survey. Each question must conform to one of the defined question types: Basic, Link, Rating, or Multiple Choice.

            Basic (open-ended question)
            - `type`: `open`
            - `question`: The text of the question.
            - `description`: Optional description of the question.
            - `descriptionContentType`: Content type of the description (`html` or `text`).
            - `optional`: Whether the question is optional (`boolean`).
            - `buttonText`: Text displayed on the submit button.
            - `branching`: Branching logic for the question. See branching types below for details.

            Link (a question with a link)
            - `type`: `link`
            - `question`: The text of the question.
            - `description`: Optional description of the question.
            - `descriptionContentType`: Content type of the description (`html` or `text`).
            - `optional`: Whether the question is optional (`boolean`).
            - `buttonText`: Text displayed on the submit button.
            - `link`: The URL associated with the question.
            - `branching`: Branching logic for the question. See branching types below for details.

            Rating (a question with a rating scale)
            - `type`: `rating`
            - `question`: The text of the question.
            - `description`: Optional description of the question.
            - `descriptionContentType`: Content type of the description (`html` or `text`).
            - `optional`: Whether the question is optional (`boolean`).
            - `buttonText`: Text displayed on the submit button.
            - `display`: Display style of the rating (`number` or `emoji`).
            - `scale`: The scale of the rating (`number`).
            - `lowerBoundLabel`: Label for the lower bound of the scale.
            - `upperBoundLabel`: Label for the upper bound of the scale.
            - `branching`: Branching logic for the question. See branching types below for details.

            Multiple choice
            - `type`: `single_choice` or `multiple_choice`
            - `question`: The text of the question.
            - `description`: Optional description of the question.
            - `descriptionContentType`: Content type of the description (`html` or `text`).
            - `optional`: Whether the question is optional (`boolean`).
            - `buttonText`: Text displayed on the submit button.
            - `choices`: An array of choices for the question.
            - `shuffleOptions`: Whether to shuffle the order of the choices (`boolean`).
            - `hasOpenChoice`: Whether the question allows an open-ended response (`boolean`).
            - `branching`: Branching logic for the question. See branching types below for details.

            Branching logic can be one of the following types:

            Next question: Proceeds to the next question
            ```json
            {
                "type": "next_question"
            }
            ```
            End: Ends the survey, optionally displaying a confirmation message.
            ```json
            {
                "type": "end"
            }
            ```
            Response-based: Branches based on the response values. Available for the `rating` and `single_choice` question types.
            ```json
            {
                "type": "response_based",
                "responseValues": {
                    "responseKey": "value"
                }
            }
            ```
            Specific question: Proceeds to a specific question by index.
            ```json
            {
                "type": "specific_question",
                "index": 2
            }
            ```
* **conditions**

* **appearance**

* **start_date**
* Type: string

* **end_date**

string

* **archived**
* Type: boolean

* **responses_limit**

integer

* **iteration_count**
* Type: integer

* **iteration_frequency_days**

integer

* **iteration_start_dates**
* Type: array

* **current_iteration**

integer

* **current_iteration_start_date**
* Type: string

* **response_sampling_start_date**

string

* **response_sampling_interval_type**

* **response_sampling_interval**
* Type: integer

* **response_sampling_limit**

integer

* **response_sampling_daily_limits**

* **enable_partial_responses**
* Type: boolean

* **_create_in_folder**

string

---

#### Request

`POST ``/api/projects/:project_id/surveys/:id/summarize_responses`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/surveys/:id/summarize_responses/\

    	-d name="string",\

    	-d type=undefined

#### Response

##### Status 200 No response body

---

## Retrieve surveys activity

#### Required API key scopes

`activity_log:read`

---

#### Path parameters

* **project_id**
* Type: string

* **project_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/surveys/activity`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/surveys/activity/

#### Response

##### Status 200 No response body

---

## Retrieve surveys responses count

#### Required API key scopes

`survey:read`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/surveys/responses_count`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/surveys/responses_count/

#### Response

##### Status 200 No response body

---

## Retrieve surveys stats

Get aggregated response statistics across all surveys.

Args: date_from: Optional ISO timestamp for start date (e.g. 2024-01-01T00:00:00Z) date_to: Optional ISO timestamp for end date (e.g. 2024-01-31T23:59:59Z)

Returns: Aggregated statistics across all surveys including total counts and rates

#### Required API key scopes

`survey:read`

---

#### Path parameters

* **project_id**
  HelpfulCould be better
* Type: string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/surveys/stats`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/surveys/stats/

#### Response

##### Status 200 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
