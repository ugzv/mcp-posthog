# PostHog API - Projects

## Projects

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

Projects for the current organization.

---

### Endpoints

| `GET` | `/api/organizations/:organization_id/projects/` |
|---|---|
`POST`| `/api/organizations/:organization_id/projects/`
| `GET` | `/api/organizations/:organization_id/projects/:id/` |
| `PATCH` | `/api/organizations/:organization_id/projects/:id/` |
| `DELETE` | `/api/organizations/:organization_id/projects/:id/` |
| `GET` | `/api/organizations/:organization_id/projects/:id/activity/` |
| `PATCH` | `/api/organizations/:organization_id/projects/:id/add_product_intent/` |
| `POST` | `/api/organizations/:organization_id/projects/:id/change_organization/` |
| `PATCH` | `/api/organizations/:organization_id/projects/:id/complete_product_onboarding/` |
| `PATCH` | `/api/organizations/:organization_id/projects/:id/delete_secret_token_backup/` |
| `GET` | `/api/organizations/:organization_id/projects/:id/is_generating_demo_data/` |
| `PATCH` | `/api/organizations/:organization_id/projects/:id/reset_token/` |
| `PATCH` | `/api/organizations/:organization_id/projects/:id/rotate_secret_token/` |

## Retrieve list

Returns a list of projects in your organization.

To get your organization ID, use the `/api/organizations/@current` endpoint or check the endpoint directly on [US Cloud](https://us.posthog.com/api/organizations/@current) or [EU Cloud](https://eu.posthog.com/api/organizations/@current).

---

#### Required API key scopes

`project:read`

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

`GET ``/api/organizations/:organization_id/projects`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/projects/

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

          "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

          "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

          "api_token": "string",

          "name": "string",

          "completed_snippet_onboarding": true,

          "has_completed_onboarding_for": null,

          "ingested_event": true,

          "is_demo": true,

          "timezone": "Africa/Abidjan",

          "access_control": true

        }

      ]

    }

---

## Create create

In most cases, we recommend using a single project across your product, but if you want to programmatically create multiple projects, this is the endpoint for you.

To get your organization ID, use the `/api/organizations/@current` endpoint or check the endpoint directly on [US Cloud](https://us.posthog.com/api/organizations/@current) or [EU Cloud](https://eu.posthog.com/api/organizations/@current).

---

#### Required API key scopes

`project:write`

---

#### Path parameters

string

---

#### Request parameters

* **name**
* Type: string

* **product_description**

string

* **app_urls**
* Type: array

* **slack_incoming_webhook**

string

* **anonymize_ips**
* Type: boolean

* **completed_snippet_onboarding**

boolean

* **test_account_filters**

* **test_account_filters_default_checked**
* Type: boolean

* **path_cleaning_filters**

* **is_demo**
* Type: boolean

* **timezone**

* **data_attributes**

* **person_display_name_properties**
* Type: array

* **correlation_config**

* **autocapture_opt_out**
* Type: boolean

* **autocapture_exceptions_opt_in**

boolean

* **autocapture_web_vitals_opt_in**
* Type: boolean

* **autocapture_web_vitals_allowed_metrics**

* **autocapture_exceptions_errors_to_ignore**

* **capture_console_log_opt_in**
* Type: boolean

* **capture_performance_opt_in**

boolean

* **session_recording_opt_in**
* Type: boolean

* **session_recording_sample_rate**

string

* **session_recording_minimum_duration_milliseconds**
* Type: integer

* **session_recording_linked_flag**

* **session_recording_network_payload_capture_config**

* **session_recording_masking_config**

* **session_replay_config**

* **survey_config**

* **access_control**
* Type: boolean

* **week_start_day**

* **primary_dashboard**
* Type: integer

* **live_events_columns**

array

* **recording_domains**
* Type: array

* **inject_web_apps**

boolean

* **extra_settings**

* **modifiers**

* **has_completed_onboarding_for**

* **surveys_opt_in**
* Type: boolean

* **heatmaps_opt_in**

boolean

* **flags_persistence_default**
* Type: boolean

* **id**

---

#### Response

Show response

#### Request

`POST ``/api/organizations/:organization_id/projects`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/projects/\

    	-d organization="string"

#### Response

##### Status 201

RESPONSE

    {

      "id": 0,

      "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

      "name": "string",

      "product_description": "string",

      "created_at": "2019-08-24T14:15:22Z",

      "effective_membership_level": 1,

      "has_group_types": true,

      "group_types": [

        {

          "property1": null,

          "property2": null

        }

      ],

      "live_events_token": "string",

      "updated_at": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

      "api_token": "string",

      "app_urls": [

        "string"

      ],

      "slack_incoming_webhook": "string",

      "anonymize_ips": true,

      "completed_snippet_onboarding": true,

      "ingested_event": true,

      "test_account_filters": null,

      "test_account_filters_default_checked": true,

      "path_cleaning_filters": null,

      "is_demo": true,

      "timezone": "Africa/Abidjan",

      "data_attributes": null,

      "person_display_name_properties": [

        "string"

      ],

      "correlation_config": null,

      "autocapture_opt_out": true,

      "autocapture_exceptions_opt_in": true,

      "autocapture_web_vitals_opt_in": true,

      "autocapture_web_vitals_allowed_metrics": null,

      "autocapture_exceptions_errors_to_ignore": null,

      "capture_console_log_opt_in": true,

      "capture_performance_opt_in": true,

      "session_recording_opt_in": true,

      "session_recording_sample_rate": "string",

      "session_recording_minimum_duration_milliseconds": 30000,

      "session_recording_linked_flag": null,

      "session_recording_network_payload_capture_config": null,

      "session_recording_masking_config": null,

      "session_replay_config": null,

      "survey_config": null,

      "access_control": true,

      "week_start_day": 0,

      "primary_dashboard": 0,

      "live_events_columns": [

        "string"

      ],

      "recording_domains": [

        "string"

      ],

      "person_on_events_querying_enabled": "string",

      "inject_web_apps": true,

      "extra_settings": null,

      "modifiers": null,

      "default_modifiers": "string",

      "has_completed_onboarding_for": null,

      "surveys_opt_in": true,

      "heatmaps_opt_in": true,

      "product_intents": "string",

      "flags_persistence_default": true,

      "secret_api_token": "string",

      "secret_api_token_backup": "string"

    }

---

## Retrieve retrieve

#### Required API key scopes

`project:read`

---

#### Path parameters

integer

A unique value identifying this project.

* **organization_id**
* Type: string

* **id**

---

#### Response

Show response

#### Request

`GET ``/api/organizations/:organization_id/projects/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/projects/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

      "name": "string",

      "product_description": "string",

      "created_at": "2019-08-24T14:15:22Z",

      "effective_membership_level": 1,

      "has_group_types": true,

      "group_types": [

        {

          "property1": null,

          "property2": null

        }

      ],

      "live_events_token": "string",

      "updated_at": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

      "api_token": "string",

      "app_urls": [

        "string"

      ],

      "slack_incoming_webhook": "string",

      "anonymize_ips": true,

      "completed_snippet_onboarding": true,

      "ingested_event": true,

      "test_account_filters": null,

      "test_account_filters_default_checked": true,

      "path_cleaning_filters": null,

      "is_demo": true,

      "timezone": "Africa/Abidjan",

      "data_attributes": null,

      "person_display_name_properties": [

        "string"

      ],

      "correlation_config": null,

      "autocapture_opt_out": true,

      "autocapture_exceptions_opt_in": true,

      "autocapture_web_vitals_opt_in": true,

      "autocapture_web_vitals_allowed_metrics": null,

      "autocapture_exceptions_errors_to_ignore": null,

      "capture_console_log_opt_in": true,

      "capture_performance_opt_in": true,

      "session_recording_opt_in": true,

      "session_recording_sample_rate": "string",

      "session_recording_minimum_duration_milliseconds": 30000,

      "session_recording_linked_flag": null,

      "session_recording_network_payload_capture_config": null,

      "session_recording_masking_config": null,

      "session_replay_config": null,

      "survey_config": null,

      "access_control": true,

      "week_start_day": 0,

      "primary_dashboard": 0,

      "live_events_columns": [

        "string"

      ],

      "recording_domains": [

        "string"

      ],

      "person_on_events_querying_enabled": "string",

      "inject_web_apps": true,

      "extra_settings": null,

      "modifiers": null,

      "default_modifiers": "string",

      "has_completed_onboarding_for": null,

      "surveys_opt_in": true,

      "heatmaps_opt_in": true,

      "product_intents": "string",

      "flags_persistence_default": true,

      "secret_api_token": "string",

      "secret_api_token_backup": "string"

    }

---

## Update partial update

#### Required API key scopes

`project:read`

---

#### Path parameters

integer

A unique value identifying this project.

* **organization_id**
* Type: string

* **name**

---

#### Request parameters

string

* **product_description**
* Type: string

* **app_urls**

array

* **slack_incoming_webhook**
* Type: string

* **anonymize_ips**

boolean

* **completed_snippet_onboarding**
* Type: boolean

* **test_account_filters**

* **test_account_filters_default_checked**
* Type: boolean

* **path_cleaning_filters**

* **is_demo**
* Type: boolean

* **timezone**

* **data_attributes**

* **person_display_name_properties**
* Type: array

* **correlation_config**

* **autocapture_opt_out**
* Type: boolean

* **autocapture_exceptions_opt_in**

boolean

* **autocapture_web_vitals_opt_in**
* Type: boolean

* **autocapture_web_vitals_allowed_metrics**

* **autocapture_exceptions_errors_to_ignore**

* **capture_console_log_opt_in**
* Type: boolean

* **capture_performance_opt_in**

boolean

* **session_recording_opt_in**
* Type: boolean

* **session_recording_sample_rate**

string

* **session_recording_minimum_duration_milliseconds**
* Type: integer

* **session_recording_linked_flag**

* **session_recording_network_payload_capture_config**

* **session_recording_masking_config**

* **session_replay_config**

* **survey_config**

* **access_control**
* Type: boolean

* **week_start_day**

* **primary_dashboard**
* Type: integer

* **live_events_columns**

array

* **recording_domains**
* Type: array

* **inject_web_apps**

boolean

* **extra_settings**

* **modifiers**

* **has_completed_onboarding_for**

* **surveys_opt_in**
* Type: boolean

* **heatmaps_opt_in**

boolean

* **flags_persistence_default**
* Type: boolean

* **id**

---

#### Response

Show response

#### Request

`PATCH ``/api/organizations/:organization_id/projects/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/projects/:id/\

    	-d organization="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

      "name": "string",

      "product_description": "string",

      "created_at": "2019-08-24T14:15:22Z",

      "effective_membership_level": 1,

      "has_group_types": true,

      "group_types": [

        {

          "property1": null,

          "property2": null

        }

      ],

      "live_events_token": "string",

      "updated_at": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

      "api_token": "string",

      "app_urls": [

        "string"

      ],

      "slack_incoming_webhook": "string",

      "anonymize_ips": true,

      "completed_snippet_onboarding": true,

      "ingested_event": true,

      "test_account_filters": null,

      "test_account_filters_default_checked": true,

      "path_cleaning_filters": null,

      "is_demo": true,

      "timezone": "Africa/Abidjan",

      "data_attributes": null,

      "person_display_name_properties": [

        "string"

      ],

      "correlation_config": null,

      "autocapture_opt_out": true,

      "autocapture_exceptions_opt_in": true,

      "autocapture_web_vitals_opt_in": true,

      "autocapture_web_vitals_allowed_metrics": null,

      "autocapture_exceptions_errors_to_ignore": null,

      "capture_console_log_opt_in": true,

      "capture_performance_opt_in": true,

      "session_recording_opt_in": true,

      "session_recording_sample_rate": "string",

      "session_recording_minimum_duration_milliseconds": 30000,

      "session_recording_linked_flag": null,

      "session_recording_network_payload_capture_config": null,

      "session_recording_masking_config": null,

      "session_replay_config": null,

      "survey_config": null,

      "access_control": true,

      "week_start_day": 0,

      "primary_dashboard": 0,

      "live_events_columns": [

        "string"

      ],

      "recording_domains": [

        "string"

      ],

      "person_on_events_querying_enabled": "string",

      "inject_web_apps": true,

      "extra_settings": null,

      "modifiers": null,

      "default_modifiers": "string",

      "has_completed_onboarding_for": null,

      "surveys_opt_in": true,

      "heatmaps_opt_in": true,

      "product_intents": "string",

      "flags_persistence_default": true,

      "secret_api_token": "string",

      "secret_api_token_backup": "string"

    }

---

## Delete destroy

#### Required API key scopes

`project:write`

---

#### Path parameters

integer

A unique value identifying this project.

* **organization_id**
* Type: string

* **id**

---

#### Request

`DELETE ``/api/organizations/:organization_id/projects/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/projects/:id/

#### Response

##### Status 204 No response body

---

## Retrieve activity

#### Path parameters

integer

A unique value identifying this project.

* **organization_id**
* Type: string

* **id**

---

#### Response

Show response

#### Request

`GET ``/api/organizations/:organization_id/projects/:id/activity`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/projects/:id/activity/

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

      "name": "string",

      "product_description": "string",

      "created_at": "2019-08-24T14:15:22Z",

      "effective_membership_level": 1,

      "has_group_types": true,

      "group_types": [

        {

          "property1": null,

          "property2": null

        }

      ],

      "live_events_token": "string",

      "updated_at": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

      "api_token": "string",

      "app_urls": [

        "string"

      ],

      "slack_incoming_webhook": "string",

      "anonymize_ips": true,

      "completed_snippet_onboarding": true,

      "ingested_event": true,

      "test_account_filters": null,

      "test_account_filters_default_checked": true,

      "path_cleaning_filters": null,

      "is_demo": true,

      "timezone": "Africa/Abidjan",

      "data_attributes": null,

      "person_display_name_properties": [

        "string"

      ],

      "correlation_config": null,

      "autocapture_opt_out": true,

      "autocapture_exceptions_opt_in": true,

      "autocapture_web_vitals_opt_in": true,

      "autocapture_web_vitals_allowed_metrics": null,

      "autocapture_exceptions_errors_to_ignore": null,

      "capture_console_log_opt_in": true,

      "capture_performance_opt_in": true,

      "session_recording_opt_in": true,

      "session_recording_sample_rate": "string",

      "session_recording_minimum_duration_milliseconds": 30000,

      "session_recording_linked_flag": null,

      "session_recording_network_payload_capture_config": null,

      "session_recording_masking_config": null,

      "session_replay_config": null,

      "survey_config": null,

      "access_control": true,

      "week_start_day": 0,

      "primary_dashboard": 0,

      "live_events_columns": [

        "string"

      ],

      "recording_domains": [

        "string"

      ],

      "person_on_events_querying_enabled": "string",

      "inject_web_apps": true,

      "extra_settings": null,

      "modifiers": null,

      "default_modifiers": "string",

      "has_completed_onboarding_for": null,

      "surveys_opt_in": true,

      "heatmaps_opt_in": true,

      "product_intents": "string",

      "flags_persistence_default": true,

      "secret_api_token": "string",

      "secret_api_token_backup": "string"

    }

---

## Update add product intent

#### Required API key scopes

`team:read`

---

#### Path parameters

integer

A unique value identifying this project.

* **organization_id**
* Type: string

* **name**

---

#### Request parameters

string

* **product_description**
* Type: string

* **app_urls**

array

* **slack_incoming_webhook**
* Type: string

* **anonymize_ips**

boolean

* **completed_snippet_onboarding**
* Type: boolean

* **test_account_filters**

* **test_account_filters_default_checked**
* Type: boolean

* **path_cleaning_filters**

* **is_demo**
* Type: boolean

* **timezone**

* **data_attributes**

* **person_display_name_properties**
* Type: array

* **correlation_config**

* **autocapture_opt_out**
* Type: boolean

* **autocapture_exceptions_opt_in**

boolean

* **autocapture_web_vitals_opt_in**
* Type: boolean

* **autocapture_web_vitals_allowed_metrics**

* **autocapture_exceptions_errors_to_ignore**

* **capture_console_log_opt_in**
* Type: boolean

* **capture_performance_opt_in**

boolean

* **session_recording_opt_in**
* Type: boolean

* **session_recording_sample_rate**

string

* **session_recording_minimum_duration_milliseconds**
* Type: integer

* **session_recording_linked_flag**

* **session_recording_network_payload_capture_config**

* **session_recording_masking_config**

* **session_replay_config**

* **survey_config**

* **access_control**
* Type: boolean

* **week_start_day**

* **primary_dashboard**
* Type: integer

* **live_events_columns**

array

* **recording_domains**
* Type: array

* **inject_web_apps**

boolean

* **extra_settings**

* **modifiers**

* **has_completed_onboarding_for**

* **surveys_opt_in**
* Type: boolean

* **heatmaps_opt_in**

boolean

* **flags_persistence_default**
* Type: boolean

* **id**

---

#### Response

Show response

#### Request

`PATCH ``/api/organizations/:organization_id/projects/:id/add_product_intent`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/projects/:id/add_product_intent/\

    	-d organization="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

      "name": "string",

      "product_description": "string",

      "created_at": "2019-08-24T14:15:22Z",

      "effective_membership_level": 1,

      "has_group_types": true,

      "group_types": [

        {

          "property1": null,

          "property2": null

        }

      ],

      "live_events_token": "string",

      "updated_at": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

      "api_token": "string",

      "app_urls": [

        "string"

      ],

      "slack_incoming_webhook": "string",

      "anonymize_ips": true,

      "completed_snippet_onboarding": true,

      "ingested_event": true,

      "test_account_filters": null,

      "test_account_filters_default_checked": true,

      "path_cleaning_filters": null,

      "is_demo": true,

      "timezone": "Africa/Abidjan",

      "data_attributes": null,

      "person_display_name_properties": [

        "string"

      ],

      "correlation_config": null,

      "autocapture_opt_out": true,

      "autocapture_exceptions_opt_in": true,

      "autocapture_web_vitals_opt_in": true,

      "autocapture_web_vitals_allowed_metrics": null,

      "autocapture_exceptions_errors_to_ignore": null,

      "capture_console_log_opt_in": true,

      "capture_performance_opt_in": true,

      "session_recording_opt_in": true,

      "session_recording_sample_rate": "string",

      "session_recording_minimum_duration_milliseconds": 30000,

      "session_recording_linked_flag": null,

      "session_recording_network_payload_capture_config": null,

      "session_recording_masking_config": null,

      "session_replay_config": null,

      "survey_config": null,

      "access_control": true,

      "week_start_day": 0,

      "primary_dashboard": 0,

      "live_events_columns": [

        "string"

      ],

      "recording_domains": [

        "string"

      ],

      "person_on_events_querying_enabled": "string",

      "inject_web_apps": true,

      "extra_settings": null,

      "modifiers": null,

      "default_modifiers": "string",

      "has_completed_onboarding_for": null,

      "surveys_opt_in": true,

      "heatmaps_opt_in": true,

      "product_intents": "string",

      "flags_persistence_default": true,

      "secret_api_token": "string",

      "secret_api_token_backup": "string"

    }

---

## Create change organization

#### Path parameters

integer

A unique value identifying this project.

* **organization_id**
* Type: string

* **name**

---

#### Request parameters

string

* **product_description**
* Type: string

* **app_urls**

array

* **slack_incoming_webhook**
* Type: string

* **anonymize_ips**

boolean

* **completed_snippet_onboarding**
* Type: boolean

* **test_account_filters**

* **test_account_filters_default_checked**
* Type: boolean

* **path_cleaning_filters**

* **is_demo**
* Type: boolean

* **timezone**

* **data_attributes**

* **person_display_name_properties**
* Type: array

* **correlation_config**

* **autocapture_opt_out**
* Type: boolean

* **autocapture_exceptions_opt_in**

boolean

* **autocapture_web_vitals_opt_in**
* Type: boolean

* **autocapture_web_vitals_allowed_metrics**

* **autocapture_exceptions_errors_to_ignore**

* **capture_console_log_opt_in**
* Type: boolean

* **capture_performance_opt_in**

boolean

* **session_recording_opt_in**
* Type: boolean

* **session_recording_sample_rate**

string

* **session_recording_minimum_duration_milliseconds**
* Type: integer

* **session_recording_linked_flag**

* **session_recording_network_payload_capture_config**

* **session_recording_masking_config**

* **session_replay_config**

* **survey_config**

* **access_control**
* Type: boolean

* **week_start_day**

* **primary_dashboard**
* Type: integer

* **live_events_columns**

array

* **recording_domains**
* Type: array

* **inject_web_apps**

boolean

* **extra_settings**

* **modifiers**

* **has_completed_onboarding_for**

* **surveys_opt_in**
* Type: boolean

* **heatmaps_opt_in**

boolean

* **flags_persistence_default**
* Type: boolean

* **id**

---

#### Response

Show response

#### Request

`POST ``/api/organizations/:organization_id/projects/:id/change_organization`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl

        -H 'Content-Type: application/json'\

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/projects/:id/change_organization/\

    	-d organization="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

      "name": "string",

      "product_description": "string",

      "created_at": "2019-08-24T14:15:22Z",

      "effective_membership_level": 1,

      "has_group_types": true,

      "group_types": [

        {

          "property1": null,

          "property2": null

        }

      ],

      "live_events_token": "string",

      "updated_at": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

      "api_token": "string",

      "app_urls": [

        "string"

      ],

      "slack_incoming_webhook": "string",

      "anonymize_ips": true,

      "completed_snippet_onboarding": true,

      "ingested_event": true,

      "test_account_filters": null,

      "test_account_filters_default_checked": true,

      "path_cleaning_filters": null,

      "is_demo": true,

      "timezone": "Africa/Abidjan",

      "data_attributes": null,

      "person_display_name_properties": [

        "string"

      ],

      "correlation_config": null,

      "autocapture_opt_out": true,

      "autocapture_exceptions_opt_in": true,

      "autocapture_web_vitals_opt_in": true,

      "autocapture_web_vitals_allowed_metrics": null,

      "autocapture_exceptions_errors_to_ignore": null,

      "capture_console_log_opt_in": true,

      "capture_performance_opt_in": true,

      "session_recording_opt_in": true,

      "session_recording_sample_rate": "string",

      "session_recording_minimum_duration_milliseconds": 30000,

      "session_recording_linked_flag": null,

      "session_recording_network_payload_capture_config": null,

      "session_recording_masking_config": null,

      "session_replay_config": null,

      "survey_config": null,

      "access_control": true,

      "week_start_day": 0,

      "primary_dashboard": 0,

      "live_events_columns": [

        "string"

      ],

      "recording_domains": [

        "string"

      ],

      "person_on_events_querying_enabled": "string",

      "inject_web_apps": true,

      "extra_settings": null,

      "modifiers": null,

      "default_modifiers": "string",

      "has_completed_onboarding_for": null,

      "surveys_opt_in": true,

      "heatmaps_opt_in": true,

      "product_intents": "string",

      "flags_persistence_default": true,

      "secret_api_token": "string",

      "secret_api_token_backup": "string"

    }

---

## Update complete product onboarding

#### Required API key scopes

`team:read`

---

#### Path parameters

integer

A unique value identifying this project.

* **organization_id**
* Type: string

* **name**

---

#### Request parameters

string

* **product_description**
* Type: string

* **app_urls**

array

* **slack_incoming_webhook**
* Type: string

* **anonymize_ips**

boolean

* **completed_snippet_onboarding**
* Type: boolean

* **test_account_filters**

* **test_account_filters_default_checked**
* Type: boolean

* **path_cleaning_filters**

* **is_demo**
* Type: boolean

* **timezone**

* **data_attributes**

* **person_display_name_properties**
* Type: array

* **correlation_config**

* **autocapture_opt_out**
* Type: boolean

* **autocapture_exceptions_opt_in**

boolean

* **autocapture_web_vitals_opt_in**
* Type: boolean

* **autocapture_web_vitals_allowed_metrics**

* **autocapture_exceptions_errors_to_ignore**

* **capture_console_log_opt_in**
* Type: boolean

* **capture_performance_opt_in**

boolean

* **session_recording_opt_in**
* Type: boolean

* **session_recording_sample_rate**

string

* **session_recording_minimum_duration_milliseconds**
* Type: integer

* **session_recording_linked_flag**

* **session_recording_network_payload_capture_config**

* **session_recording_masking_config**

* **session_replay_config**

* **survey_config**

* **access_control**
* Type: boolean

* **week_start_day**

* **primary_dashboard**
* Type: integer

* **live_events_columns**

array

* **recording_domains**
* Type: array

* **inject_web_apps**

boolean

* **extra_settings**

* **modifiers**

* **has_completed_onboarding_for**

* **surveys_opt_in**
* Type: boolean

* **heatmaps_opt_in**

boolean

* **flags_persistence_default**
* Type: boolean

* **id**

---

#### Response

Show response

#### Request

`PATCH ``/api/organizations/:organization_id/projects/:id/complete_product_onboarding`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/projects/:id/complete_product_onboarding/\

    	-d organization="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

      "name": "string",

      "product_description": "string",

      "created_at": "2019-08-24T14:15:22Z",

      "effective_membership_level": 1,

      "has_group_types": true,

      "group_types": [

        {

          "property1": null,

          "property2": null

        }

      ],

      "live_events_token": "string",

      "updated_at": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

      "api_token": "string",

      "app_urls": [

        "string"

      ],

      "slack_incoming_webhook": "string",

      "anonymize_ips": true,

      "completed_snippet_onboarding": true,

      "ingested_event": true,

      "test_account_filters": null,

      "test_account_filters_default_checked": true,

      "path_cleaning_filters": null,

      "is_demo": true,

      "timezone": "Africa/Abidjan",

      "data_attributes": null,

      "person_display_name_properties": [

        "string"

      ],

      "correlation_config": null,

      "autocapture_opt_out": true,

      "autocapture_exceptions_opt_in": true,

      "autocapture_web_vitals_opt_in": true,

      "autocapture_web_vitals_allowed_metrics": null,

      "autocapture_exceptions_errors_to_ignore": null,

      "capture_console_log_opt_in": true,

      "capture_performance_opt_in": true,

      "session_recording_opt_in": true,

      "session_recording_sample_rate": "string",

      "session_recording_minimum_duration_milliseconds": 30000,

      "session_recording_linked_flag": null,

      "session_recording_network_payload_capture_config": null,

      "session_recording_masking_config": null,

      "session_replay_config": null,

      "survey_config": null,

      "access_control": true,

      "week_start_day": 0,

      "primary_dashboard": 0,

      "live_events_columns": [

        "string"

      ],

      "recording_domains": [

        "string"

      ],

      "person_on_events_querying_enabled": "string",

      "inject_web_apps": true,

      "extra_settings": null,

      "modifiers": null,

      "default_modifiers": "string",

      "has_completed_onboarding_for": null,

      "surveys_opt_in": true,

      "heatmaps_opt_in": true,

      "product_intents": "string",

      "flags_persistence_default": true,

      "secret_api_token": "string",

      "secret_api_token_backup": "string"

    }

---

## Update delete secret token backup

#### Path parameters

integer

A unique value identifying this project.

* **organization_id**
* Type: string

* **name**

---

#### Request parameters

string

* **product_description**
* Type: string

* **app_urls**

array

* **slack_incoming_webhook**
* Type: string

* **anonymize_ips**

boolean

* **completed_snippet_onboarding**
* Type: boolean

* **test_account_filters**

* **test_account_filters_default_checked**
* Type: boolean

* **path_cleaning_filters**

* **is_demo**
* Type: boolean

* **timezone**

* **data_attributes**

* **person_display_name_properties**
* Type: array

* **correlation_config**

* **autocapture_opt_out**
* Type: boolean

* **autocapture_exceptions_opt_in**

boolean

* **autocapture_web_vitals_opt_in**
* Type: boolean

* **autocapture_web_vitals_allowed_metrics**

* **autocapture_exceptions_errors_to_ignore**

* **capture_console_log_opt_in**
* Type: boolean

* **capture_performance_opt_in**

boolean

* **session_recording_opt_in**
* Type: boolean

* **session_recording_sample_rate**

string

* **session_recording_minimum_duration_milliseconds**
* Type: integer

* **session_recording_linked_flag**

* **session_recording_network_payload_capture_config**

* **session_recording_masking_config**

* **session_replay_config**

* **survey_config**

* **access_control**
* Type: boolean

* **week_start_day**

* **primary_dashboard**
* Type: integer

* **live_events_columns**

array

* **recording_domains**
* Type: array

* **inject_web_apps**

boolean

* **extra_settings**

* **modifiers**

* **has_completed_onboarding_for**

* **surveys_opt_in**
* Type: boolean

* **heatmaps_opt_in**

boolean

* **flags_persistence_default**
* Type: boolean

* **id**

---

#### Response

Show response

#### Request

`PATCH ``/api/organizations/:organization_id/projects/:id/delete_secret_token_backup`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/projects/:id/delete_secret_token_backup/\

    	-d organization="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

      "name": "string",

      "product_description": "string",

      "created_at": "2019-08-24T14:15:22Z",

      "effective_membership_level": 1,

      "has_group_types": true,

      "group_types": [

        {

          "property1": null,

          "property2": null

        }

      ],

      "live_events_token": "string",

      "updated_at": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

      "api_token": "string",

      "app_urls": [

        "string"

      ],

      "slack_incoming_webhook": "string",

      "anonymize_ips": true,

      "completed_snippet_onboarding": true,

      "ingested_event": true,

      "test_account_filters": null,

      "test_account_filters_default_checked": true,

      "path_cleaning_filters": null,

      "is_demo": true,

      "timezone": "Africa/Abidjan",

      "data_attributes": null,

      "person_display_name_properties": [

        "string"

      ],

      "correlation_config": null,

      "autocapture_opt_out": true,

      "autocapture_exceptions_opt_in": true,

      "autocapture_web_vitals_opt_in": true,

      "autocapture_web_vitals_allowed_metrics": null,

      "autocapture_exceptions_errors_to_ignore": null,

      "capture_console_log_opt_in": true,

      "capture_performance_opt_in": true,

      "session_recording_opt_in": true,

      "session_recording_sample_rate": "string",

      "session_recording_minimum_duration_milliseconds": 30000,

      "session_recording_linked_flag": null,

      "session_recording_network_payload_capture_config": null,

      "session_recording_masking_config": null,

      "session_replay_config": null,

      "survey_config": null,

      "access_control": true,

      "week_start_day": 0,

      "primary_dashboard": 0,

      "live_events_columns": [

        "string"

      ],

      "recording_domains": [

        "string"

      ],

      "person_on_events_querying_enabled": "string",

      "inject_web_apps": true,

      "extra_settings": null,

      "modifiers": null,

      "default_modifiers": "string",

      "has_completed_onboarding_for": null,

      "surveys_opt_in": true,

      "heatmaps_opt_in": true,

      "product_intents": "string",

      "flags_persistence_default": true,

      "secret_api_token": "string",

      "secret_api_token_backup": "string"

    }

---

## Retrieve is generating demo data

#### Path parameters

integer

A unique value identifying this project.

* **organization_id**
* Type: string

* **id**

---

#### Response

Show response

#### Request

`GET ``/api/organizations/:organization_id/projects/:id/is_generating_demo_data`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/projects/:id/is_generating_demo_data/

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

      "name": "string",

      "product_description": "string",

      "created_at": "2019-08-24T14:15:22Z",

      "effective_membership_level": 1,

      "has_group_types": true,

      "group_types": [

        {

          "property1": null,

          "property2": null

        }

      ],

      "live_events_token": "string",

      "updated_at": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

      "api_token": "string",

      "app_urls": [

        "string"

      ],

      "slack_incoming_webhook": "string",

      "anonymize_ips": true,

      "completed_snippet_onboarding": true,

      "ingested_event": true,

      "test_account_filters": null,

      "test_account_filters_default_checked": true,

      "path_cleaning_filters": null,

      "is_demo": true,

      "timezone": "Africa/Abidjan",

      "data_attributes": null,

      "person_display_name_properties": [

        "string"

      ],

      "correlation_config": null,

      "autocapture_opt_out": true,

      "autocapture_exceptions_opt_in": true,

      "autocapture_web_vitals_opt_in": true,

      "autocapture_web_vitals_allowed_metrics": null,

      "autocapture_exceptions_errors_to_ignore": null,

      "capture_console_log_opt_in": true,

      "capture_performance_opt_in": true,

      "session_recording_opt_in": true,

      "session_recording_sample_rate": "string",

      "session_recording_minimum_duration_milliseconds": 30000,

      "session_recording_linked_flag": null,

      "session_recording_network_payload_capture_config": null,

      "session_recording_masking_config": null,

      "session_replay_config": null,

      "survey_config": null,

      "access_control": true,

      "week_start_day": 0,

      "primary_dashboard": 0,

      "live_events_columns": [

        "string"

      ],

      "recording_domains": [

        "string"

      ],

      "person_on_events_querying_enabled": "string",

      "inject_web_apps": true,

      "extra_settings": null,

      "modifiers": null,

      "default_modifiers": "string",

      "has_completed_onboarding_for": null,

      "surveys_opt_in": true,

      "heatmaps_opt_in": true,

      "product_intents": "string",

      "flags_persistence_default": true,

      "secret_api_token": "string",

      "secret_api_token_backup": "string"

    }

---

## Update reset token

#### Path parameters

integer

A unique value identifying this project.

* **organization_id**
* Type: string

* **name**

---

#### Request parameters

string

* **product_description**
* Type: string

* **app_urls**

array

* **slack_incoming_webhook**
* Type: string

* **anonymize_ips**

boolean

* **completed_snippet_onboarding**
* Type: boolean

* **test_account_filters**

* **test_account_filters_default_checked**
* Type: boolean

* **path_cleaning_filters**

* **is_demo**
* Type: boolean

* **timezone**

* **data_attributes**

* **person_display_name_properties**
* Type: array

* **correlation_config**

* **autocapture_opt_out**
* Type: boolean

* **autocapture_exceptions_opt_in**

boolean

* **autocapture_web_vitals_opt_in**
* Type: boolean

* **autocapture_web_vitals_allowed_metrics**

* **autocapture_exceptions_errors_to_ignore**

* **capture_console_log_opt_in**
* Type: boolean

* **capture_performance_opt_in**

boolean

* **session_recording_opt_in**
* Type: boolean

* **session_recording_sample_rate**

string

* **session_recording_minimum_duration_milliseconds**
* Type: integer

* **session_recording_linked_flag**

* **session_recording_network_payload_capture_config**

* **session_recording_masking_config**

* **session_replay_config**

* **survey_config**

* **access_control**
* Type: boolean

* **week_start_day**

* **primary_dashboard**
* Type: integer

* **live_events_columns**

array

* **recording_domains**
* Type: array

* **inject_web_apps**

boolean

* **extra_settings**

* **modifiers**

* **has_completed_onboarding_for**

* **surveys_opt_in**
* Type: boolean

* **heatmaps_opt_in**

boolean

* **flags_persistence_default**
* Type: boolean

* **id**

---

#### Response

Show response

#### Request

`PATCH ``/api/organizations/:organization_id/projects/:id/reset_token`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/projects/:id/reset_token/\

    	-d organization="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

      "name": "string",

      "product_description": "string",

      "created_at": "2019-08-24T14:15:22Z",

      "effective_membership_level": 1,

      "has_group_types": true,

      "group_types": [

        {

          "property1": null,

          "property2": null

        }

      ],

      "live_events_token": "string",

      "updated_at": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

      "api_token": "string",

      "app_urls": [

        "string"

      ],

      "slack_incoming_webhook": "string",

      "anonymize_ips": true,

      "completed_snippet_onboarding": true,

      "ingested_event": true,

      "test_account_filters": null,

      "test_account_filters_default_checked": true,

      "path_cleaning_filters": null,

      "is_demo": true,

      "timezone": "Africa/Abidjan",

      "data_attributes": null,

      "person_display_name_properties": [

        "string"

      ],

      "correlation_config": null,

      "autocapture_opt_out": true,

      "autocapture_exceptions_opt_in": true,

      "autocapture_web_vitals_opt_in": true,

      "autocapture_web_vitals_allowed_metrics": null,

      "autocapture_exceptions_errors_to_ignore": null,

      "capture_console_log_opt_in": true,

      "capture_performance_opt_in": true,

      "session_recording_opt_in": true,

      "session_recording_sample_rate": "string",

      "session_recording_minimum_duration_milliseconds": 30000,

      "session_recording_linked_flag": null,

      "session_recording_network_payload_capture_config": null,

      "session_recording_masking_config": null,

      "session_replay_config": null,

      "survey_config": null,

      "access_control": true,

      "week_start_day": 0,

      "primary_dashboard": 0,

      "live_events_columns": [

        "string"

      ],

      "recording_domains": [

        "string"

      ],

      "person_on_events_querying_enabled": "string",

      "inject_web_apps": true,

      "extra_settings": null,

      "modifiers": null,

      "default_modifiers": "string",

      "has_completed_onboarding_for": null,

      "surveys_opt_in": true,

      "heatmaps_opt_in": true,

      "product_intents": "string",

      "flags_persistence_default": true,

      "secret_api_token": "string",

      "secret_api_token_backup": "string"

    }

---

## Update rotate secret token

#### Path parameters

integer

A unique value identifying this project.

* **organization_id**
* Type: string

* **name**

---

#### Request parameters

string

* **product_description**
* Type: string

* **app_urls**

array

* **slack_incoming_webhook**
* Type: string

* **anonymize_ips**

boolean

* **completed_snippet_onboarding**
* Type: boolean

* **test_account_filters**

* **test_account_filters_default_checked**
* Type: boolean

* **path_cleaning_filters**

* **is_demo**
* Type: boolean

* **timezone**

* **data_attributes**

* **person_display_name_properties**
* Type: array

* **correlation_config**

* **autocapture_opt_out**
* Type: boolean

* **autocapture_exceptions_opt_in**

boolean

* **autocapture_web_vitals_opt_in**
* Type: boolean

* **autocapture_web_vitals_allowed_metrics**

* **autocapture_exceptions_errors_to_ignore**

* **capture_console_log_opt_in**
* Type: boolean

* **capture_performance_opt_in**

boolean

* **session_recording_opt_in**
* Type: boolean

* **session_recording_sample_rate**

string

* **session_recording_minimum_duration_milliseconds**
* Type: integer

* **session_recording_linked_flag**

* **session_recording_network_payload_capture_config**

* **session_recording_masking_config**

* **session_replay_config**

* **survey_config**

* **access_control**
* Type: boolean

* **week_start_day**

* **primary_dashboard**
* Type: integer

* **live_events_columns**

array

* **recording_domains**
* Type: array

* **inject_web_apps**

boolean

* **extra_settings**

* **modifiers**

* **has_completed_onboarding_for**

* **surveys_opt_in**
* Type: boolean

* **heatmaps_opt_in**

boolean

* **flags_persistence_default**
  HelpfulCould be better
* Type: boolean

---

#### Response

Show response

#### Request

`PATCH ``/api/organizations/:organization_id/projects/:id/rotate_secret_token`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/organizations/:organization_id/projects/:id/rotate_secret_token/\

    	-d organization="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": 0,

      "organization": "452c1a86-a0af-475b-b03f-724878b0f387",

      "name": "string",

      "product_description": "string",

      "created_at": "2019-08-24T14:15:22Z",

      "effective_membership_level": 1,

      "has_group_types": true,

      "group_types": [

        {

          "property1": null,

          "property2": null

        }

      ],

      "live_events_token": "string",

      "updated_at": "2019-08-24T14:15:22Z",

      "uuid": "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",

      "api_token": "string",

      "app_urls": [

        "string"

      ],

      "slack_incoming_webhook": "string",

      "anonymize_ips": true,

      "completed_snippet_onboarding": true,

      "ingested_event": true,

      "test_account_filters": null,

      "test_account_filters_default_checked": true,

      "path_cleaning_filters": null,

      "is_demo": true,

      "timezone": "Africa/Abidjan",

      "data_attributes": null,

      "person_display_name_properties": [

        "string"

      ],

      "correlation_config": null,

      "autocapture_opt_out": true,

      "autocapture_exceptions_opt_in": true,

      "autocapture_web_vitals_opt_in": true,

      "autocapture_web_vitals_allowed_metrics": null,

      "autocapture_exceptions_errors_to_ignore": null,

      "capture_console_log_opt_in": true,

      "capture_performance_opt_in": true,

      "session_recording_opt_in": true,

      "session_recording_sample_rate": "string",

      "session_recording_minimum_duration_milliseconds": 30000,

      "session_recording_linked_flag": null,

      "session_recording_network_payload_capture_config": null,

      "session_recording_masking_config": null,

      "session_replay_config": null,

      "survey_config": null,

      "access_control": true,

      "week_start_day": 0,

      "primary_dashboard": 0,

      "live_events_columns": [

        "string"

      ],

      "recording_domains": [

        "string"

      ],

      "person_on_events_querying_enabled": "string",

      "inject_web_apps": true,

      "extra_settings": null,

      "modifiers": null,

      "default_modifiers": "string",

      "has_completed_onboarding_for": null,

      "surveys_opt_in": true,

      "heatmaps_opt_in": true,

      "product_intents": "string",

      "flags_persistence_default": true,

      "secret_api_token": "string",

      "secret_api_token_backup": "string"

    }

### Community questions

Ask a questionLogin

### Was this page useful?
