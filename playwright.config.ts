import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';
import path from 'node:path';

const authFile = path.join(__dirname, 'playwright', '.auth', 'admin.json');

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  timeout: 3*60*1000,
  expect: { timeout: 2*60*1000 },

  fullyParallel: true,
  // forbidOnly: process.env.isCI,
  retries: env.isCI ? 2 : 0,
  workers: env.isCI ? 2 : undefined,

  reporter: [
    ['list'],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          Environment: env.environment,
          BaseURL: env.baseUrl,
          Node: process.version,
          OS: process.platform,
        },
      },
    ],
  ],

  use: {
    baseURL: env.baseUrl,
    // The demo app uses `data-test` attributes, so getByTestId() maps to them.
    testIdAttribute: 'data-test',
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
    },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
