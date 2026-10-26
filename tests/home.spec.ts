import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const SECTIONS = ['work', 'experience', 'stack', 'writing', 'contact'];
const NAV_LABELS = ['Work', 'Experience', 'Stack', 'Writing', 'Contact'];

const isPhoneLayout = async (page: Page) => page.getByRole('button', { name: /Menu/ }).isVisible();

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Home - 001 | Hero, nav and all sections render', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1, name: /I break things\s*before users do/ })).toBeVisible();

  if (await isPhoneLayout(page)) {
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeHidden();
  } else {
    const nav = page.getByRole('navigation', { name: 'Primary' });
    for (const label of NAV_LABELS) await expect(nav.getByRole('link', { name: `[ ${label} ]` })).toBeVisible();
  }

  for (const id of SECTIONS) await expect(page.locator(`section#${id}`)).toBeVisible();
  const highlights = page.getByRole('region', { name: 'Highlights' });
  for (const value of ['4+', '75%', '200+', '0 to 1']) await expect(highlights).toContainText(value);
  await expect(page.locator('#experience li')).toHaveCount(4);
  await expect(page.locator('#writing a[href*="medium.com"]')).not.toHaveCount(0);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow, 'no horizontal scroll').toBeLessThanOrEqual(0);
});

test('Home - 002 | Skip link moves focus to main', async ({ page }) => {
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main#main')).toBeFocused();
});

test('Work - 001 | Filter "Automation" shows only Automation cards and updates the item count', async ({ page }) => {
  const work = page.locator('section#work');
  const total = await work.locator('[data-cat]').count();

  const tab = work.getByRole('tab', { name: '[ Automation ]' });
  await tab.click();
  await expect(tab).toHaveAttribute('aria-selected', 'true');

  const visible = work.locator('[data-cat]:visible');
  const shown = await visible.count();
  expect(shown).toBeGreaterThan(0);
  expect(shown).toBeLessThan(total);
  await expect(work.locator('[data-cat]:not([data-cat="Automation"]):visible')).toHaveCount(0);
  for (const kind of await visible.locator('article > div:first-child > span:first-child').allTextContents()) {
    expect(kind).toBe('AUTOMATION');
  }
  await expect(work.locator('[data-count]')).toHaveText(String(shown).padStart(2, '0'));
});

test('Work - 002 | Arrow keys move between filter tabs', async ({ page }) => {
  const tabs = page.locator('section#work').getByRole('tab');
  const all = tabs.filter({ hasText: 'All' });
  await all.focus();

  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');

  await page.keyboard.press('ArrowLeft');
  await expect(all).toBeFocused();

  await page.keyboard.press('End');
  await expect(tabs.last()).toBeFocused();
  await page.keyboard.press('ArrowRight'); // wraps around
  await expect(all).toBeFocused();
  await expect(all).toHaveAttribute('aria-selected', 'true');
});

test('Nav - 001 | Mobile menu opens, closes on Escape, and links scroll to sections', async ({ page, baseURL }, info) => {
  test.skip(info.project.name !== 'mobile', 'Menu button only exists below 640px');
  const home = `${baseURL!.replace(/\/$/, '')}/`;
  const button = page.getByRole('button', { name: /Menu/ });
  const panel = page.locator('#mobile-menu');

  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(panel).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();
  await expect(button).toBeFocused();

  await button.click();
  await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: '[ Experience ]' }).click();
  await expect(panel).toBeHidden();
  await expect(page.locator('section#experience')).toBeInViewport();
  await expect(page).toHaveURL(home);

  // Shared deep links still land, then the hash is tidied away
  await page.goto('/#contact');
  await expect(page.locator('section#contact')).toBeInViewport();
  await expect(page).toHaveURL(home);
});

test('Contact - 001 | Email, GitHub, LinkedIn and Medium links have correct hrefs', async ({ page }) => {
  const contact = page.locator('section#contact');
  const expected: Record<string, string> = {
    'Email me': 'mailto:aerryasmani@protonmail.com',
    GitHub: 'https://github.com/aerryasmani',
    LinkedIn: 'https://www.linkedin.com/in/aerryasmani/',
    Medium: 'https://medium.com/@BukanJun',
  };
  for (const [label, href] of Object.entries(expected)) {
    await expect(contact.getByRole('link', { name: `[ ${label} ]` })).toHaveAttribute('href', href);
  }
});

test('A11y - 001 | No serious or critical axe violations', async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .analyze();
  const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(
    blocking.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`),
  ).toEqual([]);
});
