import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import {
  PostHogConfig,
  Person,
  Insight,
  FeatureFlag,
  Dashboard,
  Cohort,
  Project,
  PaginatedResponse,
  QueryRequest,
  QueryResponse,
  RefreshMode,
  InsightCreateParams,
  PersonUpdateParams,
  FeatureFlagCreateParams,
  DashboardCreateParams,
  EventCaptureParams,
  CohortCreateParams,
  Annotation,
  AnnotationCreateParams,
  Action,
  ActionCreateParams,
  Survey,
  SurveyCreateParams,
  Experiment,
  ExperimentCreateParams,
  SessionRecording,
} from '../types/posthog';

export class PostHogAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: unknown,
  ) {
    const suffix = statusCode ? ` (HTTP ${statusCode})` : '';
    const detailText = details ? `\n${JSON.stringify(details)}` : '';
    super(`${message}${suffix}${detailText}`);
    this.name = 'PostHogAPIError';
  }
}

const MAX_RETRIES = 2;
const RETRY_BASE_MS = 500;

export class PostHogClient {
  private client: AxiosInstance;
  private readonly projectId?: string;
  private readonly projectApiKey?: string;
  private readonly baseURL: string;

  constructor(config: PostHogConfig) {
    this.projectId = config.projectId;
    this.projectApiKey = config.projectApiKey;
    this.baseURL = config.host.replace(/\/$/, '');

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const cfg = error.config as (AxiosRequestConfig & { __retryCount?: number }) | undefined;
        const status = error.response?.status;

        if (cfg && (status === 429 || (status && status >= 500 && status <= 504))) {
          cfg.__retryCount = (cfg.__retryCount ?? 0) + 1;
          if (cfg.__retryCount <= MAX_RETRIES) {
            const retryAfter = Number(error.response?.headers?.['retry-after']);
            const delay = Number.isFinite(retryAfter) && retryAfter > 0
              ? retryAfter * 1000
              : RETRY_BASE_MS * 2 ** (cfg.__retryCount - 1);
            await new Promise((res) => setTimeout(res, delay));
            return this.client.request(cfg);
          }
        }

        if (error.response) {
          const data = error.response.data as { detail?: string; message?: string } | undefined;
          throw new PostHogAPIError(
            data?.detail ?? data?.message ?? error.message,
            error.response.status,
            data,
          );
        }
        if (error.request) {
          throw new PostHogAPIError('No response from PostHog API', 0);
        }
        throw new PostHogAPIError(error.message);
      },
    );
  }

  getBaseUrl(): string {
    return this.baseURL;
  }

  private projectUrl(endpoint: string, projectId?: string): string {
    const pid = projectId ?? this.projectId;
    if (!pid) {
      throw new PostHogAPIError('Project ID is required but not provided (set POSTHOG_PROJECT_ID)');
    }
    return `/api/projects/${pid}/${endpoint}`;
  }

  // ---- Insights ----
  async createInsight(params: unknown, projectId?: string): Promise<Insight> {
    const { data } = await this.client.post<Insight>(this.projectUrl('insights/', projectId), params);
    return data;
  }

  async getInsight(insightId: string, refreshMode?: RefreshMode, projectId?: string): Promise<Insight> {
    const params = refreshMode ? { refresh: refreshMode } : {};
    const { data } = await this.client.get<Insight>(this.projectUrl(`insights/${insightId}/`, projectId), { params });
    return data;
  }

  async listInsights(limit = 100, offset = 0, search?: string, dashboardId?: number, projectId?: string): Promise<PaginatedResponse<Insight>> {
    const params: Record<string, unknown> = { limit, offset };
    if (search) params.search = search;
    if (dashboardId) params.dashboard_id = dashboardId;
    const { data } = await this.client.get<PaginatedResponse<Insight>>(this.projectUrl('insights/', projectId), { params });
    return data;
  }

  async updateInsight(insightId: string, updates: Partial<InsightCreateParams>, projectId?: string): Promise<Insight> {
    const { data } = await this.client.patch<Insight>(this.projectUrl(`insights/${insightId}/`, projectId), updates);
    return data;
  }

  async deleteInsight(insightId: string, projectId?: string): Promise<void> {
    await this.client.delete(this.projectUrl(`insights/${insightId}/`, projectId));
  }

  // ---- Persons ----
  async searchPersons(
    search?: string,
    properties?: Record<string, unknown>,
    distinctId?: string,
    limit = 100,
    offset = 0,
    projectId?: string,
  ): Promise<PaginatedResponse<Person>> {
    const params: Record<string, unknown> = { limit, offset };
    if (search) params.search = search;
    if (properties) params.properties = JSON.stringify(properties);
    if (distinctId) params.distinct_id = distinctId;
    const { data } = await this.client.get<PaginatedResponse<Person>>(this.projectUrl('persons/', projectId), { params });
    return data;
  }

  async getPerson(personId: string, projectId?: string): Promise<Person> {
    const { data } = await this.client.get<Person>(this.projectUrl(`persons/${personId}/`, projectId));
    return data;
  }

  async updatePerson(personId: string, updates: PersonUpdateParams, projectId?: string): Promise<Person> {
    const { data } = await this.client.patch<Person>(this.projectUrl(`persons/${personId}/`, projectId), updates);
    return data;
  }

  async deletePerson(personId: string, deleteEvents = false, projectId?: string): Promise<void> {
    const params = deleteEvents ? { delete_events: 'true' } : {};
    await this.client.delete(this.projectUrl(`persons/${personId}/`, projectId), { params });
  }

  async mergePersons(primaryPersonId: string, personIdsToMerge: string[], projectId?: string): Promise<Person> {
    const { data } = await this.client.post<Person>(this.projectUrl(`persons/${primaryPersonId}/merge/`, projectId), { ids: personIdsToMerge });
    return data;
  }

  // ---- Feature Flags ----
  async listFeatureFlags(activeOnly = false, search?: string, limit = 100, offset = 0, projectId?: string): Promise<PaginatedResponse<FeatureFlag>> {
    const params: Record<string, unknown> = { limit, offset };
    if (activeOnly) params.active = 'true';
    if (search) params.search = search;
    const { data } = await this.client.get<PaginatedResponse<FeatureFlag>>(this.projectUrl('feature_flags/', projectId), { params });
    return data;
  }

  async createFeatureFlag(params: FeatureFlagCreateParams, projectId?: string): Promise<FeatureFlag> {
    const { data } = await this.client.post<FeatureFlag>(this.projectUrl('feature_flags/', projectId), params);
    return data;
  }

  async getFeatureFlag(flagId: string, projectId?: string): Promise<FeatureFlag> {
    const { data } = await this.client.get<FeatureFlag>(this.projectUrl(`feature_flags/${flagId}/`, projectId));
    return data;
  }

  async updateFeatureFlag(flagId: string, updates: Partial<FeatureFlagCreateParams>, projectId?: string): Promise<FeatureFlag> {
    const { data } = await this.client.patch<FeatureFlag>(this.projectUrl(`feature_flags/${flagId}/`, projectId), updates);
    return data;
  }

  async deleteFeatureFlag(flagId: string, projectId?: string): Promise<void> {
    await this.client.delete(this.projectUrl(`feature_flags/${flagId}/`, projectId));
  }

  // ---- Dashboards ----
  async listDashboards(limit = 100, offset = 0, search?: string, pinnedOnly = false, projectId?: string): Promise<PaginatedResponse<Dashboard>> {
    const params: Record<string, unknown> = { limit, offset };
    if (search) params.search = search;
    if (pinnedOnly) params.pinned = 'true';
    const { data } = await this.client.get<PaginatedResponse<Dashboard>>(this.projectUrl('dashboards/', projectId), { params });
    return data;
  }

  async getDashboard(dashboardId: string, projectId?: string): Promise<Dashboard> {
    const { data } = await this.client.get<Dashboard>(this.projectUrl(`dashboards/${dashboardId}/`, projectId));
    return data;
  }

  async createDashboard(params: DashboardCreateParams, projectId?: string): Promise<Dashboard> {
    const { data } = await this.client.post<Dashboard>(this.projectUrl('dashboards/', projectId), params);
    return data;
  }

  async updateDashboard(dashboardId: string, updates: Partial<DashboardCreateParams>, projectId?: string): Promise<Dashboard> {
    const { data } = await this.client.patch<Dashboard>(this.projectUrl(`dashboards/${dashboardId}/`, projectId), updates);
    return data;
  }

  async deleteDashboard(dashboardId: string, projectId?: string): Promise<void> {
    await this.client.delete(this.projectUrl(`dashboards/${dashboardId}/`, projectId));
  }

  // ---- Events ----
  async captureEvent(params: EventCaptureParams): Promise<void> {
    if (!this.projectApiKey) {
      throw new PostHogAPIError(
        'Event capture requires a project API key (phc_*). Set POSTHOG_PROJECT_API_KEY.',
      );
    }
    const captureClient = axios.create({
      baseURL: this.baseURL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000,
    });
    await captureClient.post('/i/v0/e', { ...params, api_key: this.projectApiKey });
  }

  async queryEvents(query: QueryRequest, projectId?: string): Promise<QueryResponse> {
    const hasLimit = /\bLIMIT\s+\d+/i.test(query.query);
    const finalQuery = !hasLimit && query.limit ? `${query.query.trim()} LIMIT ${query.limit}` : query.query;

    const body: Record<string, unknown> = {
      query: { kind: 'HogQLQuery', query: finalQuery },
    };
    if (query.variables && Object.keys(query.variables).length > 0) {
      body.variables = query.variables;
    }

    const { data } = await this.client.post<QueryResponse>(this.projectUrl('query/', projectId), body);
    return data;
  }

  // ---- Cohorts ----
  async listCohorts(limit = 100, offset = 0, search?: string, projectId?: string): Promise<PaginatedResponse<Cohort>> {
    const params: Record<string, unknown> = { limit, offset };
    if (search) params.search = search;
    const { data } = await this.client.get<PaginatedResponse<Cohort>>(this.projectUrl('cohorts/', projectId), { params });
    return data;
  }

  async getCohort(cohortId: string, projectId?: string): Promise<Cohort> {
    const { data } = await this.client.get<Cohort>(this.projectUrl(`cohorts/${cohortId}/`, projectId));
    return data;
  }

  async createCohort(params: CohortCreateParams, projectId?: string): Promise<Cohort> {
    const { data } = await this.client.post<Cohort>(this.projectUrl('cohorts/', projectId), params);
    return data;
  }

  async getCohortMembers(cohortId: string, limit = 100, offset = 0, projectId?: string): Promise<PaginatedResponse<Person>> {
    const { data } = await this.client.get<PaginatedResponse<Person>>(
      this.projectUrl(`cohorts/${cohortId}/persons/`, projectId),
      { params: { limit, offset } },
    );
    return data;
  }

  // ---- Projects ----
  async listProjects(): Promise<Project[]> {
    if (this.projectId) {
      try {
        const project = await this.getProject(this.projectId);
        return [project];
      } catch (error) {
        if (error instanceof PostHogAPIError && error.message.includes('scoped projects')) {
          throw new PostHogAPIError(
            `Project-scoped API key limits you to project ${this.projectId}. Use an org-level key to list all projects.`,
            error.statusCode,
            error.details,
          );
        }
        throw error;
      }
    }
    try {
      const { data } = await this.client.get<{ results: Project[] }>('/api/projects/');
      return data.results;
    } catch (error) {
      if (error instanceof PostHogAPIError && error.message.includes('scoped projects')) {
        throw new PostHogAPIError(
          'Cannot list projects with a project-scoped API key. Configure POSTHOG_PROJECT_ID.',
          error.statusCode,
          error.details,
        );
      }
      throw error;
    }
  }

  async getProject(projectId: string): Promise<Project> {
    const { data } = await this.client.get<Project>(`/api/projects/${projectId}/`);
    return data;
  }

  // ---- HogQL ----
  async executeHogQL(query: string, variables?: Record<string, unknown>, limit = 100, projectId?: string): Promise<QueryResponse> {
    const hasLimit = /\bLIMIT\s+\d+/i.test(query);
    const finalQuery = !hasLimit && limit ? `${query.trim()} LIMIT ${limit}` : query;

    const body: Record<string, unknown> = {
      query: { kind: 'HogQLQuery', query: finalQuery },
    };
    if (variables && Object.keys(variables).length > 0) {
      body.variables = variables;
    }

    const { data } = await this.client.post<QueryResponse>(this.projectUrl('query/', projectId), body);
    return data;
  }

  // ---- Annotations ----
  async listAnnotations(limit = 100, offset = 0, search?: string, projectId?: string): Promise<PaginatedResponse<Annotation>> {
    const params: Record<string, unknown> = { limit, offset };
    if (search) params.search = search;
    const { data } = await this.client.get<PaginatedResponse<Annotation>>(this.projectUrl('annotations/', projectId), { params });
    return data;
  }

  async createAnnotation(params: AnnotationCreateParams, projectId?: string): Promise<Annotation> {
    const { data } = await this.client.post<Annotation>(this.projectUrl('annotations/', projectId), params);
    return data;
  }

  async getAnnotation(annotationId: number, projectId?: string): Promise<Annotation> {
    const { data } = await this.client.get<Annotation>(this.projectUrl(`annotations/${annotationId}/`, projectId));
    return data;
  }

  async updateAnnotation(
    annotationId: number,
    updates: Partial<AnnotationCreateParams & { deleted?: boolean }>,
    projectId?: string,
  ): Promise<Annotation> {
    const { data } = await this.client.patch<Annotation>(this.projectUrl(`annotations/${annotationId}/`, projectId), updates);
    return data;
  }

  // ---- Actions ----
  async listActions(limit = 100, offset = 0, format?: 'json' | 'csv', projectId?: string): Promise<PaginatedResponse<Action>> {
    const params: Record<string, unknown> = { limit, offset };
    if (format) params.format = format;
    const { data } = await this.client.get<PaginatedResponse<Action>>(this.projectUrl('actions/', projectId), { params });
    return data;
  }

  async createAction(params: ActionCreateParams, projectId?: string): Promise<Action> {
    const { data } = await this.client.post<Action>(this.projectUrl('actions/', projectId), params);
    return data;
  }

  async getAction(actionId: number, format?: 'json' | 'csv', projectId?: string): Promise<Action> {
    const params = format ? { format } : {};
    const { data } = await this.client.get<Action>(this.projectUrl(`actions/${actionId}/`, projectId), { params });
    return data;
  }

  async updateAction(actionId: number, updates: Partial<ActionCreateParams & { deleted?: boolean }>, projectId?: string): Promise<Action> {
    const { data } = await this.client.patch<Action>(this.projectUrl(`actions/${actionId}/`, projectId), updates);
    return data;
  }

  // ---- Surveys ----
  async listSurveys(limit = 100, offset = 0, search?: string, projectId?: string): Promise<PaginatedResponse<Survey>> {
    const params: Record<string, unknown> = { limit, offset };
    if (search) params.search = search;
    const { data } = await this.client.get<PaginatedResponse<Survey>>(this.projectUrl('surveys/', projectId), { params });
    return data;
  }

  async getSurvey(surveyId: string, projectId?: string): Promise<Survey> {
    const { data } = await this.client.get<Survey>(this.projectUrl(`surveys/${surveyId}/`, projectId));
    return data;
  }

  async createSurvey(params: SurveyCreateParams, projectId?: string): Promise<Survey> {
    const { data } = await this.client.post<Survey>(this.projectUrl('surveys/', projectId), params);
    return data;
  }

  async updateSurvey(surveyId: string, updates: Partial<SurveyCreateParams & { archived?: boolean }>, projectId?: string): Promise<Survey> {
    const { data } = await this.client.patch<Survey>(this.projectUrl(`surveys/${surveyId}/`, projectId), updates);
    return data;
  }

  async deleteSurvey(surveyId: string, projectId?: string): Promise<void> {
    await this.client.delete(this.projectUrl(`surveys/${surveyId}/`, projectId));
  }

  async getSurveyStats(surveyId: string, projectId?: string): Promise<unknown> {
    const { data } = await this.client.get<unknown>(this.projectUrl(`surveys/${surveyId}/stats/`, projectId));
    return data;
  }

  // ---- Experiments ----
  async listExperiments(limit = 100, offset = 0, search?: string, projectId?: string): Promise<PaginatedResponse<Experiment>> {
    const params: Record<string, unknown> = { limit, offset };
    if (search) params.search = search;
    const { data } = await this.client.get<PaginatedResponse<Experiment>>(this.projectUrl('experiments/', projectId), { params });
    return data;
  }

  async getExperiment(experimentId: number, projectId?: string): Promise<Experiment> {
    const { data } = await this.client.get<Experiment>(this.projectUrl(`experiments/${experimentId}/`, projectId));
    return data;
  }

  async createExperiment(params: ExperimentCreateParams, projectId?: string): Promise<Experiment> {
    const { data } = await this.client.post<Experiment>(this.projectUrl('experiments/', projectId), params);
    return data;
  }

  async updateExperiment(
    experimentId: number,
    updates: Partial<ExperimentCreateParams & { archived?: boolean }>,
    projectId?: string,
  ): Promise<Experiment> {
    const { data } = await this.client.patch<Experiment>(this.projectUrl(`experiments/${experimentId}/`, projectId), updates);
    return data;
  }

  async deleteExperiment(experimentId: number, projectId?: string): Promise<void> {
    await this.client.delete(this.projectUrl(`experiments/${experimentId}/`, projectId));
  }

  async duplicateExperiment(experimentId: number, projectId?: string): Promise<Experiment> {
    const { data } = await this.client.post<Experiment>(this.projectUrl(`experiments/${experimentId}/duplicate/`, projectId));
    return data;
  }

  // ---- Session Recordings ----
  async listSessionRecordings(
    limit = 50,
    offset = 0,
    distinctId?: string,
    dateFrom?: string,
    dateTo?: string,
    projectId?: string,
  ): Promise<PaginatedResponse<SessionRecording>> {
    const params: Record<string, unknown> = { limit, offset };
    if (distinctId) params.distinct_id = distinctId;
    if (dateFrom) params.date_from = dateFrom;
    if (dateTo) params.date_to = dateTo;
    const { data } = await this.client.get<PaginatedResponse<SessionRecording>>(
      this.projectUrl('session_recordings/', projectId),
      { params },
    );
    return data;
  }

  async getSessionRecording(recordingId: string, projectId?: string): Promise<SessionRecording> {
    const { data } = await this.client.get<SessionRecording>(this.projectUrl(`session_recordings/${recordingId}/`, projectId));
    return data;
  }

  async deleteSessionRecording(recordingId: string, projectId?: string): Promise<void> {
    await this.client.delete(this.projectUrl(`session_recordings/${recordingId}/`, projectId));
  }
}
