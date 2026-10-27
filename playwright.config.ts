import { defineConfig, devices } from '@playwright/test';

// BASE_URL set (e.g. https://heiyoaerry.one) → test that site as-is.
// Unset → build and serve the local site with `astro preview`.
const PORT = 4321;
const BASE_URL = process.env.BASE_URL || undefined; // empty string counts as unset
const baseURL = BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    // Pretend every visitor has already seen the boot overlay; Boot-* tests clear this.
    storageState: { cookies: [], origins: [{ origin: new URL(baseURL).origin, localStorage: [{ name: 'booted', value: '1' }] }] },
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: BASE_URL
    ? undefined
    : {
        command: `npm run build && npx astro preview --port ${PORT}`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
