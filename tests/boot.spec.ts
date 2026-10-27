import { test, expect } from '@playwright/test';

// These tests start as a brand-new visitor (the config pre-seeds booted=1 for every other test).
test.use({ storageState: { cookies: [], origins: [] } });

const overlay = (page: import('@playwright/test').Page) => page.locator('.boot');

test('Boot - 001 | Shows on first visit and is gone within 2s', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit' });
  await expect(overlay(page)).toBeVisible();
  await expect(overlay(page)).toHaveAttribute('aria-hidden', 'true');
  await expect(overlay(page)).toContainText('Bugs detected');
  // The page is rendered underneath the whole time
  await expect(page.getByRole('heading', { level: 1 })).toBeAttached();

  await expect(overlay(page)).toHaveCount(0, { timeout: 2000 });
  expect(await page.evaluate(() => localStorage.getItem('booted'))).toBe('1');
});

test('Boot - 002 | Never shows on a second visit', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit' });
  await expect(overlay(page)).toBeVisible();
  await expect(overlay(page)).toHaveCount(0, { timeout: 2000 });

  await page.reload({ waitUntil: 'domcontentloaded' });
  expect(await page.evaluate(() => !!document.querySelector('.boot'))).toBe(false);
});

test('Boot - 003 | Skips on keypress', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit' });
  await expect(overlay(page)).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(overlay(page)).toHaveCount(0, { timeout: 300 });
  // Focus wasn't hijacked: the first Tab lands on the skip link as usual
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('Boot - 004 | Not shown with prefers-reduced-motion', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(await page.evaluate(() => !!document.querySelector('.boot'))).toBe(false);
  });
});
