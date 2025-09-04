# PostHog API - Web Analytics

Web Analytics

## Web analytics

> For instructions on how to authenticate to use this endpoint, see [API overview](/docs/api/overview).

This endpoint is in Concept state, please join the feature preview to try it out when it's ready. Get a breakdown by a property (e.g. browser, device type, country, etc.).

---

### Endpoints

| `GET` | `/api/projects/:project_id/web_analytics/breakdown/` |
|---|---|
`GET`| `/api/projects/:project_id/web_analytics/overview/`

## Retrieve web analytics breakdown

#### Required API key scopes

`query:read`

---

#### Path parameters

* **project_id**
* Type: string

* **apply_path_cleaning**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

boolean

Default: `true`

Apply URL path cleaning

* **breakdown_by**
      * `DeviceType` \- DeviceType
* Type: string

One of: `DeviceType` `Browser``"OS"` `Viewport``"InitialReferringDomain"` `InitialUTMSource``"InitialUTMMedium"` `InitialUTMCampaign``"InitialUTMTerm"` `InitialUTMContent``"Country"` `Region``"City"` `InitialPage``"Page"` `ExitPage``"InitialChannelType"`

Property to break down by
    * `Browser` \- Browser
    * `OS` \- OS
    * `Viewport` \- Viewport
    * `InitialReferringDomain` \- InitialReferringDomain
    * `InitialUTMSource` \- InitialUTMSource
    * `InitialUTMMedium` \- InitialUTMMedium
    * `InitialUTMCampaign` \- InitialUTMCampaign
    * `InitialUTMTerm` \- InitialUTMTerm
    * `InitialUTMContent` \- InitialUTMContent
    * `Country` \- Country
    * `Region` \- Region
    * `City` \- City
    * `InitialPage` \- InitialPage
    * `Page` \- Page
    * `ExitPage` \- ExitPage
    * `InitialChannelType` \- InitialChannelType

* **date_from**
* Type: string

* **date_to**

Start date for the query (format: YYYY-MM-DD)

string

End date for the query (format: YYYY-MM-DD)

* **filter_test_accounts**
* Type: boolean

* **host**

Default: `true`

Filter out test accounts

string

Host to filter by (e.g. example.com)

* **limit**
* Type: integer

* **offset**

Default: `100`

Number of results to return

integer

Default: `0`

Number of results to skip

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/web_analytics/breakdown`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/web_analytics/breakdown/

#### Response

##### Status 200 Get a breakdown of web analytics data by supported properties.

RESPONSE

    {

      "next": "https://us.posthog.com/api/web_analytics/breakdown?offset=2&limit=2",

      "results": [

        {

          "breakdown_value": "/home",

          "visitors": 8500,

          "views": 12000,

          "sessions": 9200

        },

        {

          "breakdown_value": "/about",

          "visitors": 2100,

          "views": 2800,

          "sessions": 2300

        }

      ]

    }

---

## Retrieve web analytics overview

This endpoint is in Concept state, please join the feature preview to try it out when it's ready. Get an overview of web analytics data including visitors, views, sessions, bounce rate, and session duration.

#### Required API key scopes

`query:read`

---

#### Path parameters

* **project_id**
* Type: string

* **date_from**

Project ID of the project you're trying to access. To find the ID of the project, make a call to /api/projects/.

---

#### Query parameters

string

Start date for the query (format: YYYY-MM-DD)

* **date_to**
* Type: string

* **filter_test_accounts**

End date for the query (format: YYYY-MM-DD)

boolean

Default: `true`

Filter out test accounts

* **host**
  HelpfulCould be better
* Type: string

Host to filter by (e.g. example.com)

---

#### Response

Show response

#### Request

`GET ``/api/projects/:project_id/web_analytics/overview`

cURL

    export POSTHOG_PERSONAL_API_KEY=[your personal api key]

    curl \

        -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \

        <ph_app_host>/api/projects/:project_id/web_analytics/overview/

#### Response

##### Status 200 Get simple overview metrics: visitors, views, sessions, bounce rate, session duration

RESPONSE

    {

      "visitors": 12500,

      "views": 45000,

      "sessions": 18200,

      "bounce_rate": 0.32,

      "session_duration": 185.5

    }

### Community questions

Ask a questionLogin

### Was this page useful?
