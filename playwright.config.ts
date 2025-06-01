import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src', // где будут лежать .spec.ts файлы
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3000', // адрес твоего фронта
    headless: true, // показывать браузер
    viewport: { width: 1280, height: 800 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
