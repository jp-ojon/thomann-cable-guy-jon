import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Mapping for the environments
const environments = {
  local: process.env.LOCAL_BASE_URL,
  network: process.env.TESTING_BASE_URL,
  production: process.env.PRODUCTION_BASE_URL,
};

// Determine the current environment (default to 'production' if not set)
const currentEnv = process.env.ENVIRONMENT || 'production';

// Get the base URL for the current environment
const baseURL = environments[currentEnv];

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 60000, // Global test timeout
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }], // HTML report
    ['json', { outputFile: 'report.json' }],         // JSON report
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
/* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    screenshot: 'only-on-failure', // Capture screenshots for failed tests
    video: 'retain-on-failure',     // Capture video on failure
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    actionTimeout: 10000, // Timeout for each Playwright action (e.g., click, type)
    navigationTimeout: 15000, // Timeout for navigation (e.g., page.goto())
    headless: false,
    //viewport: { width: 1280, height: 720 },
    
    ignoreHTTPSErrors: true, //For testing sites with invalid SSL certificates.
    launchOptions: {
      slowMo: 50, // Slow down by 50 milliseconds
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
       },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
       },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
       },
    },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

export { baseURL }; // Export baseURL for use in tests