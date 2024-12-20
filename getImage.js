const { chromium, firefox, webkit } = require('playwright');
const { fileURLToPath, pathToFileURL } = require('url');
const path = require('path');

const filePath = pathToFileURL('./index.html').href;

(async () => {
  let browserPath = undefined
  // use /usr/bin/chromium if it exists
  if (path.existsSync('/usr/bin/chromium')) {
    browserPath = '/usr/bin/chromium'
  }

  const browser = await chromium.launch({executablePath: browserPath});
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
