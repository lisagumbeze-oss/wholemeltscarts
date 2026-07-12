import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.type().toUpperCase() + ': ' + msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR: ' + error.message));
  try {
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle0', timeout: 15000 });
  } catch (err) {
    console.log('GOTO ERROR: ' + err.message);
  }
  await browser.close();
})();
