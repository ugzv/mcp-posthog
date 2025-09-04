# MCP PostHog Server

A Model Context Protocol (MCP) server for interacting with self-hosted PostHog instances.

## Overview

This MCP server provides a standardized interface to interact with PostHog's API, enabling AI assistants to query analytics data, manage feature flags, and perform various PostHog operations.

## API Documentation

The `posthog-api-docs-md` directory contains comprehensive markdown documentation for all PostHog API endpoints, including:

- **Analytics**: Events, Persons, Cohorts, Insights
- **Feature Management**: Feature Flags, Experiments, Surveys
- **Data Management**: Batch Exports, Properties, Queries
- **Organization**: Projects, Teams, Members, Roles
- **Recording**: Session Recordings, Playlists
- **And more...**

## Setup

This server is designed to work with self-hosted PostHog instances. Configure it with your PostHog instance URL and API key.

## Development

Built using the [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk).

## License

MIT