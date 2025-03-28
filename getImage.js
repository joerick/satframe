const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var http = require('http');

(async () => {
  let browserPath = undefined

  console.log('>> Starting local http server');
  const serve = serveStatic("./");
  const server = http.createServer(function(req, res) {
    const done = finalhandler(req, res);
    serve(req, res, done);
  });
  server.listen(41721);

  // use /usr/bin/chromium if it exists
  if (fs.existsSync('/usr/bin/chromium')) {
    browserPath = '/usr/bin/chromium'
  }

  console.log('>> Launching browser with path:', browserPath);
  const browser = await chromium.launch({executablePath: browserPath});

  const url = 'http://localhost:41721/index.html'
  console.log('>> Loading page:', url);
  const context = await browser.newContext({
    viewport: { width: 800, height: 480 },
  });
  const page = await context.newPage();
  await page.goto(url);

  console.log('>> Waiting for the animation to load');
  await page.waitForFunction(() => window.pressureOverlayHasBeenDrawn);

  console.log('>> Waiting for the wind particles to load');
  await page.waitForTimeout(2000);

  console.log('>> Grabbing screenshot');
  await page.screenshot({ path: 'output.png' });

  console.log('>> Closing browser');
  await browser.close();

  console.log('>> Stopping local http server');
  server.close();
})();
