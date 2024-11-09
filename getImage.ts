import { chromium, firefox, webkit } from 'playwright';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';
const filePath = pathToFileURL('./dist/index.html').href;

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 500, height: 400 },
  });
  const page = await context.newPage();
  await page.goto(filePath);
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'output.png' });
  await browser.close();
})();
