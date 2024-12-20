const { chromium, firefox, webkit } = require('playwright');
const { fileURLToPath, pathToFileURL } = require('url');
const fs = require('fs');

const filePath = pathToFileURL('./index.html').href;

(async () => {
  let browserPath = undefined
  // use /usr/bin/chromium if it exists
  if (fs.existsSync('/usr/bin/chromium')) {
    browserPath = '/usr/bin/chromium'
  }

  console.log('>> Launching browser with path:', browserPath);
  const browser = await chromium.launch({executablePath: browserPath});

  console.log('>> Loading page:', filePath);
  const context = await browser.newContext({
    viewport: { width: 800, height: 480 },
  });
  const page = await context.newPage();
  await page.goto(filePath);

  console.log('>> Waiting for the animation to load');
  await page.waitForFunction(() => window.pressureOverlayHasBeenDrawn);

  console.log('>> Waiting for the wind particles to load');
  await page.waitForTimeout(2000);

  console.log('>> Grabbing screenshot');
  await page.screenshot({ path: 'output.png' });

  console.log('>> Closing browser');
  await browser.close();
})();
