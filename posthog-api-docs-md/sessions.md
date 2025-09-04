# PostHog API - Sessions

## Sessions

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

---

### Endpoints

| `GET` | `/api/projects/:project_id/sessions/property_definitions/` |
|---|---|
`GET`| `/api/projects/:project_id/sessions/values/`

## Retrieve sessions property definitions

#### Required API key scopes

`query:read`

---

#### Path parameters

* **project_id**
* Type: string

* **project_id**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/sessions/property_definitions`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/sessions/property_definitions/

#### Response

##### Status 200 No response body

---

## Retrieve sessions values

#### Required API key scopes

`query:read`

---

#### Path parameters

string

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Request

`GET ``/api/projects/:project_id/sessions/values`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/sessions/values/

#### Response

##### Status 200 No response body

### Community questions

Ask a questionLogin

### Was this page useful?
