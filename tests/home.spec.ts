import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Home - 001 | Hero, nav and all sections render', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: /I break things before users do/ })).toBeVisible();

    const nav = page.getByRole('navigation', { name: 'Primary' });
    for (const label of ['Work', 'Experience', 'Stack', 'Writing', 'Contact']) {
      await expect(nav.getByRole('link', { name: `[ ${label} ]` })).toBeVisible();
    }

    for (const id of ['work', 'experience', 'stack', 'writing', 'contact']) {
      await expect(page.locator(`section#${id}`)).toBeVisible();
    }
    await expect(page.getByRole('region', { name: 'Highlights' })).toBeVisible();
    await expect(page.locator('#experience li')).toHaveCount(4);
    await expect(page.locator('#writing a[href*="medium.com"]')).not.toHaveCount(0);

    // No horizontal scroll at any viewport
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('Home - 002 | Project filter shows only Automation cards', async ({ page }) => {
    const work = page.locator('section#work');
    const cards = work.locator('[data-cat]');
    const total = await cards.count();

    const tab = work.getByRole('tab', { name: '[ Automation ]' });
    await tab.click();
    await expect(tab).toHaveAttribute('aria-selected', 'true');

    const visible = work.locator('[data-cat]:visible');
    const shown = await visible.count();
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(total);
    for (const kind of await visible.locator('article > div:first-child > span:first-child').allTextContents()) {
      expect(kind).toBe('AUTOMATION');
    }
    await expect(work.locator('[data-cat]:not([data-cat="Automation"]):visible')).toHaveCount(0);
    await expect(work.locator('[data-count]')).toHaveText(String(shown).padStart(2, '0'));
  });

  test('Home - 003 | Section links scroll without a #hash in the URL', async ({ page, baseURL }) => {
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: '[ Stack ]' }).click();
    await expect(page.locator('section#stack')).toBeInViewport();
    await expect(page).toHaveURL(`${baseURL}/`);

    // Shared deep links still land on the section, then the URL is tidied
    await page.goto('/#contact');
    await expect(page.locator('section#contact')).toBeInViewport();
    await expect(page).toHaveURL(`${baseURL}/`);
  });
});
