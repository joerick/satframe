import { chromium, firefox, webkit } from 'playwright';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';
const filePath = pathToFileURL('./dist/index.html').href;

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 800, height: 480 },
  });
  const page = await context.newPage();
  await page.goto(filePath);
  await page.waitForFunction(() => (window as any).pressureOverlayHasBeenDrawn);
  // give a second for the wind particles to draw
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'output.png' });
  await browser.close();
})();
