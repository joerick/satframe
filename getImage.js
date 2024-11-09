const { chromium, firefox, webkit } = require('playwright');
const { fileURLToPath, pathToFileURL } = require('url');

const filePath = pathToFileURL('./index.html').href;

(async () => {
  const browser = await firefox.launch();
  const context = await browser.newContext({
    viewport: { width: 800, height: 480 },
  });
  const page = await context.newPage();
  await page.goto(filePath);
  await page.waitForFunction(() => window.pressureOverlayHasBeenDrawn);
  // give a second for the wind particles to draw
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'output.png' });
  await browser.close();
})();
