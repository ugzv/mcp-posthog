export interface PostHogConfig {
  host: string;
  apiKey: string;  // Personal API key for management operations
  projectApiKey?: string;  // Project API key for event capture
  projectId?: string;
}

export interface Person {
  id: string;
  uuid: string;
  distinct_ids: string[];
  properties: Record<string, any>;
  created_at: string;
  name?: string;
}

export interface Insight {
  id: number;
  short_id: string;
  name: string;
  description?: string;
  query?: any;
  filters?: any;
  result?: any;
  dashboards: number[];
  created_at: string;
  created_by?: any;
  tags?: string[];
  last_refresh?: string;
}

export interface FeatureFlag {
  id: number;
  key: string;
  name: string;
  active: boolean;
  filters: any;
  deleted: boolean;
  created_at: string;
  rollout_percentage?: number;
  ensure_experience_continuity?: boolean;
}

export interface Dashboard {
  id: number;
  name: string;
  description?: string;
  pinned: boolean;
  created_at: string;
  created_by?: any;
  tiles?: DashboardTile[];
  filters?: any;
  variables?: any;
  tags?: string[];
}

export interface DashboardTile {
  id: number;
  insight?: Insight;
  text?: any;
  layouts: any;
  color?: string;
}

export interface Event {
  id: string;
  timestamp: string;
  event: string;
  distinct_id: string;
  properties: Record<string, any>;
  elements?: any[];
  person?: Person;
}

export interface Cohort {
  id: number;
  name: string;
  description?: string;
  groups: any[];
  filters?: any;
  created_at: string;
  created_by?: any;
  is_static?: boolean;
  count?: number;
}

export interface Project {
  id: number;
  name: string;
  organization: string;
  created_at: string;
  updated_at: string;
  api_token?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface QueryRequest {
  query: string;
  variables?: Record<string, any>;
  limit?: number;
}

export interface QueryResponse {
  results: any[];
  columns?: string[];
  types?: string[];
  hogql?: string;
  hasMore?: boolean;
  limit?: number;
  offset?: number;
}

export enum RefreshMode {
  ForceCache = 'force_cache',
  Blocking = 'blocking',
  Async = 'async',
  ForceBlocking = 'force_blocking',
  ForceAsync = 'force_async'
}

export interface InsightQuery {
  kind: string;
  source?: {
    kind: string;
    series?: Array<{
      kind: string;
      event?: string;
      name?: string;
      math?: string;
    }>;
    dateRange?: {
      date_from?: string;
      date_to?: string;
    };
    breakdownFilter?: {
      breakdown: string;
      breakdown_type: string;
    };
  };
}

export interface InsightCreateParams {
  name: string;
  description?: string;
  query?: InsightQuery | any;
  filters?: any;
  dashboards?: number[];
  tags?: string[];
}

export interface PersonUpdateParams {
  properties?: Record<string, any>;
}

export interface FeatureFlagCreateParams {
  key: string;
  name: string;
  filters?: any;
  active?: boolean;
  rollout_percentage?: number;
  ensure_experience_continuity?: boolean;
}

export interface DashboardCreateParams {
  name: string;
  description?: string;
  tiles?: any[];
  filters?: any;
  variables?: any;
  tags?: string[];
}

export interface EventCaptureParams {
  event: string;
  distinct_id: string;
  properties?: Record<string, any>;
  timestamp?: string;
}

export interface CohortCreateParams {
  name: string;
  description?: string;
  groups?: any[];
  filters?: any;
  is_static?: boolean;
}

export interface Annotation {
  id: number;
  content: string;
  date_marker: string;
  creation_type?: string;
  dashboard_item?: number;
  dashboard_id?: number;
  dashboard_name?: string;
  insight_short_id?: string;
  insight_name?: string;
  created_by?: any;
  created_at: string;
  updated_at: string;
  deleted?: boolean;
  scope?: string;
}

export interface AnnotationCreateParams {
  content: string;
  date_marker: string;
  scope?: 'organization' | 'project' | 'dashboard_item';
  dashboard_item?: number;
  tags?: string[];
}

export interface Action {
  id: number;
  name: string;
  description?: string;
  tags?: string[];
  post_to_slack?: boolean;
  slack_message_format?: string;
  steps?: ActionStep[];
  created_at: string;
  created_by?: any;
  deleted?: boolean;
  is_calculating?: boolean;
  last_calculated_at?: string;
  team_id?: number;
}

export interface ActionStep {
  event?: string;
  properties?: Record<string, any>[];
  selector?: string;
  tag_name?: string;
  text?: string;
  text_matching?: 'exact' | 'contains' | 'regex';
  href?: string;
  href_matching?: 'exact' | 'contains' | 'regex';
  url?: string;
  url_matching?: 'exact' | 'contains' | 'regex';
}

export interface ActionCreateParams {
  name: string;
  description?: string;
  steps: ActionStep[];
  tags?: string[];
  post_to_slack?: boolean;
  slack_message_format?: string;
}

export interface Survey {
  id: string;
  name: string;
  description?: string;
  type: string;
  linked_flag?: number | null;
  targeting_flag?: number | null;
  questions?: any[];
  conditions?: any;
  appearance?: any;
  created_at: string;
  created_by?: any;
  start_date?: string | null;
  end_date?: string | null;
  archived?: boolean;
}

export interface SurveyCreateParams {
  name: string;
  description?: string;
  type: 'popover' | 'button' | 'email' | 'api' | 'widget';
  questions?: any[];
  conditions?: any;
  appearance?: any;
  linked_flag_id?: number;
  targeting_flag_filters?: any;
  start_date?: string | null;
  end_date?: string | null;
  archived?: boolean;
}

export interface Experiment {
  id: number;
  name: string;
  description?: string;
  feature_flag?: any;
  parameters?: any;
  start_date?: string | null;
  end_date?: string | null;
  archived?: boolean;
  created_at: string;
  created_by?: any;
  filters?: any;
  metrics?: any[];
}

export interface ExperimentCreateParams {
  name: string;
  description?: string;
  feature_flag_key?: string;
  parameters?: any;
  filters?: any;
  metrics?: any[];
  start_date?: string | null;
  end_date?: string | null;
}

export interface SessionRecording {
  id: string;
  distinct_id?: string;
  viewed?: boolean;
  recording_duration?: number;
  active_seconds?: number;
  inactive_seconds?: number;
  start_time?: string;
  end_time?: string;
  click_count?: number;
  keypress_count?: number;
  console_log_count?: number;
  console_warn_count?: number;
  console_error_count?: number;
  start_url?: string;
  person?: Person;
}