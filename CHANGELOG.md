# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Updated `@modelcontextprotocol/sdk` from 1.0.0 to 1.21.1
  - Brings 21 minor versions of improvements, bug fixes, and performance enhancements
  - Maintains full backwards compatibility with existing code patterns
  - Includes latest MCP protocol features and stability improvements
- Fixed PostHog event capture endpoint from `/capture/` to `/i/v0/e`
  - Aligns with current PostHog API documentation (2025 standard)
  - Uses the actively supported and recommended endpoint path
  - Ensures better reliability and future compatibility

### Technical Details
- All existing `setRequestHandler` patterns remain fully compatible
- No breaking changes in MCP SDK upgrade path
- Build and type checking pass successfully with updated dependencies

## [1.0.0] - 2024-01-XX

### Added
- Initial release of PostHog MCP Server
- **Analytics & Insights**: Create, retrieve, and manage analytics insights
- **Person Management**: Search, update, and manage user data with GDPR compliance
- **Feature Flags**: Full lifecycle management of feature flags
- **Dashboards**: Create and manage dashboards and visualizations
- **Event Tracking**: Capture custom events and query event data
- **Cohorts**: Create and manage user segments
- **HogQL Queries**: Execute advanced queries using PostHog Query Language
- **Project Management**: Multi-project support
- **Annotations**: Mark important events and deployments on charts
- **Actions**: Define and track custom user actions

### Features
- Dual-key authentication support (Personal API key + Project API key)
- Project-scoped API key support with automatic endpoint handling
- Comprehensive error handling and validation
- Rate limit awareness and documentation
- Full TypeScript support with type definitions
- MCP protocol compliance for AI assistant integration

### Documentation
- Complete README with installation and usage instructions
- Configuration examples for various use cases
- API documentation for all available tools
- Troubleshooting guide for common issues
