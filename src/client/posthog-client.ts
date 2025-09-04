import axios, { AxiosInstance, AxiosError } from 'axios';
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
  ActionCreateParams
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
  private projectApiKey?: string;

  constructor(config: PostHogConfig) {
    this.projectId = config.projectId;
    this.projectApiKey = config.projectApiKey;
    
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
          const data = error.response.data as any;
          throw new PostHogAPIError(
            data?.detail || error.message,
            error.response.status,
            data
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
  async captureEvent(params: EventCaptureParams): Promise<void> {
    // The capture endpoint requires a project API key, not a personal API key
    // Use the configured project API key if available
    const apiKey = this.projectApiKey;
    
    if (!apiKey) {
      throw new PostHogAPIError(
        'Event capture requires a project API key. Personal API keys cannot capture events. ' +
        'Please configure a project API key (projectApiKey) in your configuration.'
      );
    }
    
    // Create a separate client for the capture endpoint with the project API key
    const captureClient = axios.create({
      baseURL: this.client.defaults.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
    
    await captureClient.post('/capture/', {
      ...params,
      api_key: apiKey,
    });
  }

  async queryEvents(
    query: QueryRequest,
    projectId?: string
  ): Promise<QueryResponse> {
    // Check if the query already has a LIMIT clause
    const hasLimit = /\bLIMIT\s+\d+/i.test(query.query);
    
    // If no LIMIT in query and limit is specified, add it to the SQL
    let finalQuery = query.query;
    if (!hasLimit && query.limit) {
      finalQuery = `${query.query.trim()} LIMIT ${query.limit}`;
    }
    
    // Build the request body
    const requestBody: any = {
      query: {
        kind: 'HogQLQuery',
        query: finalQuery
      }
    };
    
    // Add variables at root level if provided
    if (query.variables && Object.keys(query.variables).length > 0) {
      requestBody.variables = query.variables;
    }
    
    const { data } = await this.client.post<QueryResponse>(
      this.getProjectUrl('query/', projectId),
      requestBody
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
    // Note: /api/projects/ endpoint doesn't work with project-scoped personal API keys
    // If we have a configured project ID, return just that project
    if (this.projectId) {
      try {
        const project = await this.getProject(this.projectId);
        return [project];
      } catch (error: any) {
        // If the error is about scoped projects, provide a helpful message
        if (error.message?.includes('scoped projects')) {
          throw new PostHogAPIError(
            'Cannot list all projects with a project-scoped API key. ' +
            'Your API key is limited to project ' + this.projectId + '. ' +
            'To list all projects, use an organization-level API key.',
            error.statusCode,
            error.details
          );
        }
        throw error;
      }
    }
    
    // Try the standard projects endpoint for non-scoped keys
    try {
      const { data } = await this.client.get<{ results: Project[] }>('/api/projects/');
      return data.results;
    } catch (error: any) {
      // If this fails with scoped project error, provide helpful message
      if (error.message?.includes('scoped projects')) {
        throw new PostHogAPIError(
          'Cannot list projects with a project-scoped API key. ' +
          'Configure a project ID in your settings to work with a specific project.',
          error.statusCode,
          error.details
        );
      }
      throw error;
    }
  }

  async getProject(projectId: string): Promise<Project> {
    // Use the project-specific endpoint which works with scoped keys
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
    // Check if the query already has a LIMIT clause
    const hasLimit = /\bLIMIT\s+\d+/i.test(query);
    
    // If no LIMIT in query and limit is specified, add it to the SQL
    let finalQuery = query;
    if (!hasLimit && limit) {
      finalQuery = `${query.trim()} LIMIT ${limit}`;
    }
    
    // HogQLQuery doesn't accept a separate limit parameter
    const requestBody: any = {
      query: {
        kind: 'HogQLQuery',
        query: finalQuery
      }
    };
    
    // Add variables at root level if provided
    if (variables && Object.keys(variables).length > 0) {
      requestBody.variables = variables;
    }
    
    const { data } = await this.client.post<QueryResponse>(
      this.getProjectUrl('query/', projectId),
      requestBody
    );
    return data;
  }

  // Annotations
  async listAnnotations(
    limit = 100,
    offset = 0,
    search?: string,
    projectId?: string
  ): Promise<PaginatedResponse<Annotation>> {
    const params: any = { limit, offset };
    if (search) params.search = search;
    
    const { data } = await this.client.get<PaginatedResponse<Annotation>>(
      this.getProjectUrl('annotations/', projectId),
      { params }
    );
    return data;
  }

  async createAnnotation(
    params: AnnotationCreateParams,
    projectId?: string
  ): Promise<Annotation> {
    const { data } = await this.client.post<Annotation>(
      this.getProjectUrl('annotations/', projectId),
      params
    );
    return data;
  }

  async getAnnotation(annotationId: number, projectId?: string): Promise<Annotation> {
    const { data } = await this.client.get<Annotation>(
      this.getProjectUrl(`annotations/${annotationId}/`, projectId)
    );
    return data;
  }

  async updateAnnotation(
    annotationId: number,
    updates: Partial<AnnotationCreateParams & { deleted?: boolean }>,
    projectId?: string
  ): Promise<Annotation> {
    const { data } = await this.client.patch<Annotation>(
      this.getProjectUrl(`annotations/${annotationId}/`, projectId),
      updates
    );
    return data;
  }

  // Actions
  async listActions(
    limit = 100,
    offset = 0,
    format?: 'json' | 'csv',
    projectId?: string
  ): Promise<PaginatedResponse<Action>> {
    const params: any = { limit, offset };
    if (format) params.format = format;
    
    const { data } = await this.client.get<PaginatedResponse<Action>>(
      this.getProjectUrl('actions/', projectId),
      { params }
    );
    return data;
  }

  async createAction(
    params: ActionCreateParams,
    projectId?: string
  ): Promise<Action> {
    const { data } = await this.client.post<Action>(
      this.getProjectUrl('actions/', projectId),
      params
    );
    return data;
  }

  async getAction(
    actionId: number,
    format?: 'json' | 'csv',
    projectId?: string
  ): Promise<Action> {
    const params = format ? { format } : {};
    const { data } = await this.client.get<Action>(
      this.getProjectUrl(`actions/${actionId}/`, projectId),
      { params }
    );
    return data;
  }

  async updateAction(
    actionId: number,
    updates: Partial<ActionCreateParams & { deleted?: boolean }>,
    projectId?: string
  ): Promise<Action> {
    const { data } = await this.client.patch<Action>(
      this.getProjectUrl(`actions/${actionId}/`, projectId),
      updates
    );
    return data;
  }
}