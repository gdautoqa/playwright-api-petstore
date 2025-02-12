# Playwright API Petstore Tests

This repository contains automated API tests for the [Swagger Petstore](https://petstore.swagger.io/) using [Playwright Test](https://playwright.dev/docs/api-testing). The tests validate endpoints for pet, user, and store operations in a modular, maintainable way following Playwright best practices.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Continuous Integration](#continuous-integration)

## Overview
This project demonstrates how to implement REST API tests using Playwright with TypeScript. It covers key endpoints such as:

- **User Management:** Create, retrieve, update, delete users; login and logout.
- **Pet Management:** Add, update, search (by status or tags) pets.
- **Store Operations:** Place orders and check inventory.

The tests use auto-waiting, robust locators, and TypeScript's strict type checking to ensure that the API behaves according to the Swagger specification.

## Prerequisites
- Node.js v20 or higher
- npm or yarn as the package manager

## Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/playwright-api-petstore.git
cd playwright-api-petstore
npm ci
```

## Running Tests
To run all tests, execute:

```bash
npx playwright test
```

After the tests run, generate an HTML report with:

```bash
npx playwright show-report
```

## Configuration
The API base URL and path prefix are defined in the configuration file at [src/utils/apiConfig.ts](src/utils/apiConfig.ts):

```typescript
export const apiConfig = {
  baseUrl: 'https://petstore.swagger.io',
  pathName: '/v2'
};
```

Endpoints are built using the helper in [src/utils/apiHelper.ts](src/utils/apiHelper.ts), which concatenates the base URL, version path, and specific endpoint.

## Continuous Integration
The project is integrated with GitHub Actions via [`.github/workflows/playwright-api-petstore.yml`](.github/workflows/playwright-api-petstore.yml). It is configured to run:

- **On Schedule:** Weekly at 8am EDT (12:00 UTC on Mondays)
- **On Push:** Every push to the `main` branch
- **On Pull Request:** For PRs targeting `main`