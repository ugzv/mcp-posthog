import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  PostHogConfig,
  Person,
  Insight,
  FeatureFlag,
  Dashboard,
  Event,
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
  CohortCreateParams
} from '../types/posthog';

export class PostHogAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'PostHogAPIError';
  }
}

export class PostHogClient {
  private client: AxiosInstance;
  private projectId?: string;

  constructor(config: PostHogConfig) {
    this.projectId = config.projectId;
    
    this.client = axios.create({
      baseURL: config.host.replace(/\/$/, ''),
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          throw new PostHogAPIError(
            error.response.data?.detail || error.message,
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          throw new PostHogAPIError('No response from PostHog API', 0);
        } else {
          throw new PostHogAPIError(error.message);
        }
      }
    );
  }

  private getProjectUrl(endpoint: string, projectId?: string): string {
    const pid = projectId || this.projectId;
    if (!pid) {
      throw new PostHogAPIError('Project ID is required but not provided');
    }
    return `/api/projects/${pid}/${endpoint}`;
  }

  // Insights
  async createInsight(params: InsightCreateParams, projectId?: string): Promise<Insight> {
    const { data } = await this.client.post<Insight>(
      this.getProjectUrl('insights/', projectId),
      params
    );
    return data;
  }

  async getInsight(insightId: string, refreshMode?: RefreshMode, projectId?: string): Promise<Insight> {
    const params = refreshMode ? { refresh: refreshMode } : {};
    const { data } = await this.client.get<Insight>(
      this.getProjectUrl(`insights/${insightId}/`, projectId),
      { params }
    );
    return data;
  }

  async listInsights(
    limit = 100,
    offset = 0,
    search?: string,
    dashboardId?: number,
    projectId?: string
  ): Promise<PaginatedResponse<Insight>> {
    const params: any = { limit, offset };
    if (search) params.search = search;
    if (dashboardId) params.dashboard_id = dashboardId;
    
    const { data } = await this.client.get<PaginatedResponse<Insight>>(
      this.getProjectUrl('insights/', projectId),
      { params }
    );
    return data;
  }

  async updateInsight(
    insightId: string,
    updates: Partial<InsightCreateParams>,
    projectId?: string
  ): Promise<Insight> {
    const { data } = await this.client.patch<Insight>(
      this.getProjectUrl(`insights/${insightId}/`, projectId),
      updates
    );
    return data;
  }

  async deleteInsight(insightId: string, projectId?: string): Promise<void> {
    await this.client.delete(this.getProjectUrl(`insights/${insightId}/`, projectId));
  }

  // Persons
  async searchPersons(
    search?: string,
    properties?: Record<string, any>,
    distinctId?: string,
    limit = 100,
    offset = 0,
    projectId?: string
  ): Promise<PaginatedResponse<Person>> {
    const params: any = { limit, offset };
    if (search) params.search = search;
    if (properties) params.properties = JSON.stringify(properties);
    if (distinctId) params.distinct_id = distinctId;
    
    const { data } = await this.client.get<PaginatedResponse<Person>>(
      this.getProjectUrl('persons/', projectId),
      { params }
    );
    return data;
  }

  async getPerson(personId: string, projectId?: string): Promise<Person> {
    const { data } = await this.client.get<Person>(
      this.getProjectUrl(`persons/${personId}/`, projectId)
    );
    return data;
  }

  async updatePerson(
    personId: string,
    updates: PersonUpdateParams,
    projectId?: string
  ): Promise<Person> {
    const { data } = await this.client.patch<Person>(
      this.getProjectUrl(`persons/${personId}/`, projectId),
      updates
    );
    return data;
  }

  async deletePerson(personId: string, deleteEvents = false, projectId?: string): Promise<void> {
    const params = deleteEvents ? { delete_events: 'true' } : {};
    await this.client.delete(
      this.getProjectUrl(`persons/${personId}/`, projectId),
      { params }
    );
  }

  async mergePersons(
    primaryPersonId: string,
    personIdsToMerge: string[],
    projectId?: string
  ): Promise<Person> {
    const { data } = await this.client.post<Person>(
      this.getProjectUrl(`persons/${primaryPersonId}/merge/`, projectId),
      { ids: personIdsToMerge }
    );
    return data;
  }

  // Feature Flags
  async listFeatureFlags(
    activeOnly = false,
    search?: string,
    limit = 100,
    offset = 0,
    projectId?: string
  ): Promise<PaginatedResponse<FeatureFlag>> {
    const params: any = { limit, offset };
    if (activeOnly) params.active = 'true';
    if (search) params.search = search;
    
    const { data } = await this.client.get<PaginatedResponse<FeatureFlag>>(
      this.getProjectUrl('feature_flags/', projectId),
      { params }
    );
    return data;
  }

  async createFeatureFlag(
    params: FeatureFlagCreateParams,
    projectId?: string
  ): Promise<FeatureFlag> {
    const { data } = await this.client.post<FeatureFlag>(
      this.getProjectUrl('feature_flags/', projectId),
      params
    );
    return data;
  }

  async getFeatureFlag(flagId: string, projectId?: string): Promise<FeatureFlag> {
    const { data } = await this.client.get<FeatureFlag>(
      this.getProjectUrl(`feature_flags/${flagId}/`, projectId)
    );
    return data;
  }

  async updateFeatureFlag(
    flagId: string,
    updates: Partial<FeatureFlagCreateParams>,
    projectId?: string
  ): Promise<FeatureFlag> {
    const { data } = await this.client.patch<FeatureFlag>(
      this.getProjectUrl(`feature_flags/${flagId}/`, projectId),
      updates
    );
    return data;
  }

  async deleteFeatureFlag(flagId: string, projectId?: string): Promise<void> {
    await this.client.delete(this.getProjectUrl(`feature_flags/${flagId}/`, projectId));
  }

  async evaluateFeatureFlags(
    distinctId: string,
    flagKeys?: string[],
    projectId?: string
  ): Promise<Record<string, boolean | string>> {
    const params: any = { distinct_id: distinctId };
    if (flagKeys) params.feature_flags = flagKeys;
    
    const { data } = await this.client.post<Record<string, boolean | string>>(
      this.getProjectUrl('feature_flags/evaluation/', projectId),
      params
    );
    return data;
  }

  // Dashboards
  async listDashboards(
    limit = 100,
    offset = 0,
    search?: string,
    pinnedOnly = false,
    projectId?: string
  ): Promise<PaginatedResponse<Dashboard>> {
    const params: any = { limit, offset };
    if (search) params.search = search;
    if (pinnedOnly) params.pinned = 'true';
    
    const { data } = await this.client.get<PaginatedResponse<Dashboard>>(
      this.getProjectUrl('dashboards/', projectId),
      { params }
    );
    return data;
  }

  async getDashboard(dashboardId: string, projectId?: string): Promise<Dashboard> {
    const { data } = await this.client.get<Dashboard>(
      this.getProjectUrl(`dashboards/${dashboardId}/`, projectId)
    );
    return data;
  }

  async createDashboard(
    params: DashboardCreateParams,
    projectId?: string
  ): Promise<Dashboard> {
    const { data } = await this.client.post<Dashboard>(
      this.getProjectUrl('dashboards/', projectId),
      params
    );
    return data;
  }

  async updateDashboard(
    dashboardId: string,
    updates: Partial<DashboardCreateParams>,
    projectId?: string
  ): Promise<Dashboard> {
    const { data } = await this.client.patch<Dashboard>(
      this.getProjectUrl(`dashboards/${dashboardId}/`, projectId),
      updates
    );
    return data;
  }

  async deleteDashboard(dashboardId: string, projectId?: string): Promise<void> {
    await this.client.delete(this.getProjectUrl(`dashboards/${dashboardId}/`, projectId));
  }

  // Events
  async captureEvent(params: EventCaptureParams, projectId?: string): Promise<void> {
    await this.client.post('/capture/', {
      ...params,
      api_key: this.projectId, // Use project API key for capture endpoint
    });
  }

  async queryEvents(
    query: QueryRequest,
    projectId?: string
  ): Promise<QueryResponse> {
    const { data } = await this.client.post<QueryResponse>(
      this.getProjectUrl('query/', projectId),
      query
    );
    return data;
  }

  // Cohorts
  async listCohorts(
    limit = 100,
    offset = 0,
    search?: string,
    projectId?: string
  ): Promise<PaginatedResponse<Cohort>> {
    const params: any = { limit, offset };
    if (search) params.search = search;
    
    const { data } = await this.client.get<PaginatedResponse<Cohort>>(
      this.getProjectUrl('cohorts/', projectId),
      { params }
    );
    return data;
  }

  async getCohort(cohortId: string, projectId?: string): Promise<Cohort> {
    const { data } = await this.client.get<Cohort>(
      this.getProjectUrl(`cohorts/${cohortId}/`, projectId)
    );
    return data;
  }

  async createCohort(
    params: CohortCreateParams,
    projectId?: string
  ): Promise<Cohort> {
    const { data } = await this.client.post<Cohort>(
      this.getProjectUrl('cohorts/', projectId),
      params
    );
    return data;
  }

  async getCohortMembers(
    cohortId: string,
    limit = 100,
    offset = 0,
    projectId?: string
  ): Promise<PaginatedResponse<Person>> {
    const params = { limit, offset };
    const { data } = await this.client.get<PaginatedResponse<Person>>(
      this.getProjectUrl(`cohorts/${cohortId}/persons/`, projectId),
      { params }
    );
    return data;
  }

  // Projects
  async listProjects(): Promise<Project[]> {
    const { data } = await this.client.get<{ results: Project[] }>('/api/projects/');
    return data.results;
  }

  async getProject(projectId: string): Promise<Project> {
    const { data } = await this.client.get<Project>(`/api/projects/${projectId}/`);
    return data;
  }

  // HogQL
  async executeHogQL(
    query: string,
    variables?: Record<string, any>,
    limit = 100,
    projectId?: string
  ): Promise<QueryResponse> {
    const { data } = await this.client.post<QueryResponse>(
      this.getProjectUrl('query/', projectId),
      {
        query: { kind: 'HogQLQuery', query },
        variables,
        limit
      }
    );
    return data;
  }
}