# MCP Server for PostHog - Implementation Plan

## Executive Summary

This document outlines the implementation plan for a Model Context Protocol (MCP) server for PostHog, enabling AI assistants like Claude to interact with PostHog analytics data directly. The server will provide structured access to PostHog's API through MCP tools, allowing for analytics queries, user management, feature flag operations, and dashboard management.

## Project Overview

### Goals
1. Provide seamless integration between AI assistants and PostHog analytics
2. Enable programmatic access to PostHog data and operations
3. Support both data retrieval and management operations
4. Ensure secure authentication and proper rate limiting
5. Optimize for developer experience with clear, intuitive tools

### Target Instance
- Self-hosted PostHog: `https://posthog.myteam.network/`
- Support for both cloud and self-hosted deployments

## Architecture

### Core Components

```
┌─────────────────┐
│   AI Assistant  │
│  (Claude, etc)  │
└────────┬────────┘
         │
         v
┌─────────────────┐
│   MCP Server    │
│  (TypeScript)   │
├─────────────────┤
│ - Tools         │
│ - Resources     │
│ - Authentication│
│ - Rate Limiting │
└────────┬────────┘
         │
         v
┌─────────────────┐
│  PostHog API    │
│   (REST API)    │
└─────────────────┘
```

### Technology Stack
- **Language**: TypeScript
- **MCP SDK**: @modelcontextprotocol/sdk
- **HTTP Client**: Axios or Fetch API
- **Validation**: Zod
- **Build System**: TypeScript compiler + esbuild
- **Package Manager**: npm

## Proposed MCP Tools

### 1. Analytics & Insights Tools

#### `insights_create`
Create new analytics insights with custom queries
- **Inputs**: name, query_type (trends/funnel/retention/paths/lifecycle/stickiness), filters, date_range
- **Output**: Created insight with ID and results
- **Use Case**: Building custom analytics queries

#### `insights_retrieve`
Retrieve existing insights or execute queries
- **Inputs**: insight_id or short_id, refresh_mode (force_cache/blocking/async)
- **Output**: Query results with data points
- **Use Case**: Getting analytics data for analysis

#### `insights_list`
List all available insights with filtering
- **Inputs**: limit, offset, search, created_by, dashboard_id
- **Output**: List of insights with metadata
- **Use Case**: Discovering available analytics

#### `insights_update`
Update existing insight configuration
- **Inputs**: insight_id, name, query, description, tags
- **Output**: Updated insight details
- **Use Case**: Modifying analytics queries

### 2. Person/User Management Tools

#### `persons_search`
Search and filter persons/users
- **Inputs**: search_query, properties_filter, distinct_id, limit
- **Output**: List of persons with properties
- **Use Case**: Finding specific users or segments

#### `persons_get`
Get detailed information about a specific person
- **Inputs**: person_id or distinct_id
- **Output**: Person details, properties, activity
- **Use Case**: User profile investigation

#### `persons_update`
Update person properties
- **Inputs**: person_id, properties (object)
- **Output**: Updated person record
- **Use Case**: Updating user attributes

#### `persons_merge`
Merge multiple person records
- **Inputs**: primary_person_id, person_ids_to_merge
- **Output**: Merged person record
- **Use Case**: Deduplication and data cleanup

#### `persons_delete`
Delete person records (GDPR compliance)
- **Inputs**: person_id or distinct_ids[], delete_events (boolean)
- **Output**: Deletion confirmation
- **Use Case**: Data privacy and compliance

### 3. Feature Flag Tools

#### `feature_flags_list`
List all feature flags with their status
- **Inputs**: active_only, search, limit
- **Output**: List of feature flags with configuration
- **Use Case**: Feature management overview

#### `feature_flags_create`
Create new feature flag
- **Inputs**: key, name, filters, rollout_percentage, active
- **Output**: Created feature flag details
- **Use Case**: Setting up new features

#### `feature_flags_update`
Update feature flag configuration
- **Inputs**: flag_id, active, filters, rollout_percentage
- **Output**: Updated flag configuration
- **Use Case**: Managing feature rollouts

#### `feature_flags_evaluate`
Evaluate feature flags for a specific user
- **Inputs**: distinct_id, flag_keys[]
- **Output**: Flag evaluation results
- **Use Case**: Testing flag behavior

#### `feature_flags_delete`
Delete feature flag
- **Inputs**: flag_id
- **Output**: Deletion confirmation
- **Use Case**: Cleaning up old flags

### 4. Dashboard Tools

#### `dashboards_list`
List available dashboards
- **Inputs**: limit, search, pinned_only
- **Output**: List of dashboards with metadata
- **Use Case**: Dashboard discovery

#### `dashboards_get`
Get dashboard with all tiles/insights
- **Inputs**: dashboard_id
- **Output**: Dashboard configuration and tile data
- **Use Case**: Dashboard analysis

#### `dashboards_create`
Create new dashboard
- **Inputs**: name, description, tiles[], filters
- **Output**: Created dashboard details
- **Use Case**: Building custom dashboards

#### `dashboards_update`
Update dashboard configuration
- **Inputs**: dashboard_id, name, description, tiles
- **Output**: Updated dashboard
- **Use Case**: Dashboard maintenance

### 5. Event Tracking Tools

#### `events_capture`
Send custom events to PostHog
- **Inputs**: event_name, distinct_id, properties, timestamp
- **Output**: Event confirmation
- **Use Case**: Custom event tracking

#### `events_query`
Query events using PostHog Query Language
- **Inputs**: query (HogQL), date_range, limit
- **Output**: Query results
- **Use Case**: Ad-hoc event analysis

### 6. Cohort Tools

#### `cohorts_list`
List available cohorts
- **Inputs**: limit, search
- **Output**: List of cohorts with member counts
- **Use Case**: Segment discovery

#### `cohorts_create`
Create new cohort
- **Inputs**: name, filters, groups[]
- **Output**: Created cohort details
- **Use Case**: Building user segments

#### `cohorts_get_members`
Get members of a cohort
- **Inputs**: cohort_id, limit
- **Output**: List of person IDs in cohort
- **Use Case**: Segment analysis

### 7. Project Management Tools

#### `projects_list`
List all projects
- **Inputs**: None
- **Output**: List of available projects
- **Use Case**: Multi-project management

#### `projects_get_settings`
Get project configuration
- **Inputs**: project_id
- **Output**: Project settings and metadata
- **Use Case**: Configuration review

### 8. Query Tools

#### `query_hogql`
Execute HogQL queries directly
- **Inputs**: query, variables, limit
- **Output**: Query results in tabular format
- **Use Case**: Advanced data analysis

#### `query_export`
Export query results in various formats
- **Inputs**: query, format (csv/json), date_range
- **Output**: Exported data or download link
- **Use Case**: Data extraction

## MCP Resources (Optional)

### `analytics_reports`
Pre-configured analytics reports as resources
- Weekly/monthly summaries
- Key metrics dashboards
- Performance indicators

### `feature_flag_status`
Real-time feature flag status as a resource
- Current flag states
- Rollout percentages
- Recent changes

## Authentication & Configuration

### Environment Variables
```env
POSTHOG_HOST=https://posthog.myteam.network
POSTHOG_API_KEY=<personal_api_key>
POSTHOG_PROJECT_ID=<default_project_id>
MCP_SERVER_NAME=posthog-mcp
MCP_SERVER_VERSION=1.0.0
```

### Configuration File (optional)
```json
{
  "host": "https://posthog.myteam.network",
  "apiKey": "<personal_api_key>",
  "projectId": "<project_id>",
  "rateLimit": {
    "maxRequestsPerMinute": 200
  },
  "cache": {
    "enabled": true,
    "ttl": 300
  }
}
```

## Implementation Phases

### Phase 1: Core Infrastructure (Week 1)
1. ✅ Set up TypeScript project structure
2. ✅ Implement MCP server base
3. ✅ Create PostHog API client wrapper
4. ✅ Add authentication handling
5. ✅ Implement error handling and rate limiting

### Phase 2: Essential Tools (Week 1-2)
1. Implement insights tools (create, retrieve, list)
2. Implement persons tools (search, get, update)
3. Implement feature flags tools (list, create, update)
4. Add basic testing

### Phase 3: Extended Tools (Week 2)
1. Implement dashboard tools
2. Implement event capture and query tools
3. Implement cohort tools
4. Add HogQL query support

### Phase 4: Polish & Documentation (Week 2-3)
1. Comprehensive error handling
2. Rate limiting optimization
3. Caching layer for frequently accessed data
4. Documentation and examples
5. Integration testing

## Security Considerations

### API Key Management
- Store API keys securely (environment variables)
- Never expose keys in logs or responses
- Support key rotation

### Data Privacy
- Implement proper access controls
- Support GDPR compliance operations
- Audit logging for sensitive operations

### Rate Limiting
- Respect PostHog API rate limits
- Implement client-side rate limiting
- Exponential backoff for retries

## Performance Optimizations

### Caching Strategy
- Cache frequently accessed data (insights, dashboards)
- TTL-based cache invalidation
- Cache-aside pattern for updates

### Batch Operations
- Support bulk operations where available
- Optimize for minimal API calls
- Parallel request handling

### Connection Management
- Connection pooling
- Keep-alive connections
- Graceful degradation

## Error Handling

### Error Categories
1. **Authentication Errors**: Invalid or expired API keys
2. **Rate Limit Errors**: Too many requests
3. **Validation Errors**: Invalid input parameters
4. **Not Found Errors**: Resource doesn't exist
5. **Server Errors**: PostHog API issues

### Error Responses
```typescript
{
  type: "error",
  code: "RATE_LIMIT_EXCEEDED",
  message: "Rate limit exceeded. Please wait 60 seconds.",
  details: {
    retryAfter: 60,
    limit: 240,
    window: "1m"
  }
}
```

## Testing Strategy

### Unit Tests
- Tool input validation
- API client methods
- Error handling logic

### Integration Tests
- End-to-end tool execution
- Authentication flow
- Rate limiting behavior

### Manual Testing
- Claude Desktop integration
- Real PostHog instance testing
- Performance benchmarking

## Documentation Requirements

### README.md
- Quick start guide
- Installation instructions
- Configuration examples
- Tool usage examples

### API Documentation
- Tool specifications
- Input/output schemas
- Error codes and handling

### Examples
- Common use cases
- Integration patterns
- Best practices

## Success Metrics

1. **Functionality**: All proposed tools working correctly
2. **Performance**: < 500ms average response time for cached queries
3. **Reliability**: 99.9% uptime for server operations
4. **Usability**: Clear documentation and intuitive tool names
5. **Security**: No exposed credentials or data leaks

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| API Breaking Changes | High | Version pinning, comprehensive testing |
| Rate Limiting | Medium | Caching, request batching, backoff strategies |
| Large Data Sets | Medium | Pagination, streaming responses |
| Authentication Issues | High | Multiple auth methods, clear error messages |
| Network Failures | Medium | Retry logic, timeout handling |

## Future Enhancements

### Phase 5+ (Future)
1. WebSocket support for real-time data
2. Advanced caching with Redis
3. Multi-tenant support
4. Custom plugin system
5. GraphQL support (if PostHog adds it)
6. Streaming responses for large datasets
7. Scheduled report generation
8. Natural language query translation

## Conclusion

This MCP server for PostHog will provide comprehensive access to analytics data and management operations, enabling AI assistants to effectively interact with PostHog. The phased implementation approach ensures quick delivery of core functionality while maintaining quality and extensibility.