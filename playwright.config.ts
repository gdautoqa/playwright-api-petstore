import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  captureGitInfo: { diff: true},
  fullyParallel: true,
  retries: 2,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    trace: 'on',
    video: 'retain-on-failure',
    screenshot: 'on',
  },
  projects: [
    {
      name: 'API',
      testDir: './src/tests/api',
      use: {
        baseURL: process.env.BASE_API_URL || 'https://petstore.swagger.io/',
        extraHTTPHeaders: { 'Content-Type': 'application/json' },
      },
    },
  ],
  outputDir: 'test-results/',
});
