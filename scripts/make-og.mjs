// Renders scripts/og-image.html to public/og-image.png (1200x630) with Playwright.
// Usage: npm run og   (needs network for Google Fonts)
import { chromium } from '@playwright/test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = pathToFileURL(path.join(root, 'scripts', 'og-image.html')).href;
const output = path.join(root, 'public', 'og-image.png');

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(source, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const missing = await page.evaluate(() =>
    ['700 112px "Pixelify Sans"', '600 22px "Geist Mono"'].filter((f) => !document.fonts.check(f)),
  );
  if (missing.length) throw new Error(`Fonts not loaded: ${missing.join(', ')}`);
  await page.screenshot({ path: output, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log(`Wrote ${path.relative(root, output)}`);
} finally {
  await browser.close();
}
