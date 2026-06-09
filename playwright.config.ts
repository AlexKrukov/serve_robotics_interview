import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,

  projects: [
    {
      name: 'ui-tests',
      testMatch: /ui-tests\/.*\.spec\.ts/,
      use: {
        baseURL: 'https://www.saucedemo.com',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
      }
    },
    {
      name: 'api-tests',
      testMatch: /api-tests\/.*\.spec\.ts/,
      use: {
        baseURL: 'https://api.themoviedb.org'
      }
    }
  ]
});