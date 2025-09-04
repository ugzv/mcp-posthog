# PostHog API - Property Definitions

## Property definitions

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/property_definitions/` |
|---|---|
`GET`| `/api/projects/:project_id/property_definitions/:id/`
| `PATCH` | `/api/projects/:project_id/property_definitions/:id/` |
| `DELETE` | `/api/projects/:project_id/property_definitions/:id/` |
| `GET` | `/api/projects/:project_id/property_definitions/seen_together/` |

## List all property definitions

#### Required API key scopes

`property_definition:read`

---

#### Path parameters

* **project_id**
* Type: string

* **event_names**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

If sent, response value will have `is_seen_on_filtered_events` populated. JSON-encoded

* **exclude_core_properties**
* Type: boolean

* **exclude_hidden**

Default: `false`

Whether to exclude core properties

boolean

Default: `false`

Whether to exclude properties marked as hidden

* **excluded_properties**
* Type: string

* **filter_by_event_names**

JSON-encoded list of excluded properties

boolean

Whether to return only properties for events in `event_names`

* **group_type_index**
* Type: integer

* **is_feature_flag**

What group type is the property for. Only should be set if `type=group`

boolean

Whether to return only (or excluding) feature flag properties

* **is_numerical**
* Type: boolean

* **limit**

Whether to return only (or excluding) numerical property definitions

integer

Number of results to return per page.

* **offset**
* Type: integer

* **properties**

The initial index from which to return the results.

string

Comma-separated list of properties to filter

* **search**
* Type: string

* **type**

Searches properties by name

string

Default: `event`

One of: `event` `person``"group"` `session`

What property definitions to return

    * `event` \- event
    * `person` \- person
    * `group` \- group
    * `session` \- session

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/property_definitions`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/property_definitions/

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

          "is_numerical": true,

          "property_type": "DateTime",

          "tags": [

            null

          ],

          "is_seen_on_filtered_events": "string"

        }

      ]

    }

---

## Retrieve property definitions

#### Required API key scopes

`property_definition:read`

---

#### Path parameters

* **id**
* Type: string

* **project_id**

A UUID string identifying this property definition.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/property_definitions/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/property_definitions/:id/

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "name": "string",

      "is_numerical": true,

      "property_type": "DateTime",

      "tags": [

        null

      ],

      "is_seen_on_filtered_events": "string"

    }

---

## Update property definitions

#### Required API key scopes

`property_definition:write`

---

#### Path parameters

* **id**
* Type: string

* **project_id**

A UUID string identifying this property definition.

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request parameters

* **name**
* Type: string

* **is_numerical**

boolean

* **property_type**

* **tags**
* Type: array

* **id**

---

#### Response

Show response

#### Request

`PATCH ``/api/projects/:project_id/property_definitions/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl -X PATCH \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/property_definitions/:id/\

    	-d name="string"

#### Response

##### Status 200

RESPONSE

    {

      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

      "name": "string",

      "is_numerical": true,

      "property_type": "DateTime",

      "tags": [

        null

      ],

      "is_seen_on_filtered_events": "string"

    }

---

## Delete property definitions

#### Required API key scopes

`property_definition:write`

---

#### Path parameters

string

A UUID string identifying this property definition.

* **project_id**
* Type: string

* **project_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`DELETE ``/api/projects/:project_id/property_definitions/:id`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl  -X DELETE \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/property_definitions/:id/

#### Response

##### Status 204 No response body

---

## Retrieve property definitions seen together

Allows a caller to provide a list of event names and a single property name Returns a map of the event names to a boolean representing whether that property has ever been seen with that event_name

#### Required API key scopes

`property_definition:read`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/property_definitions/seen_together`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/property_definitions/seen_together/

#### Response

##### Status 200 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
