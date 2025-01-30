const puppeteer = require('puppeteer');
require('dotenv').config();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

(async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
    const page = await browser.newPage();

    await page.goto('https://teveclub.hu');

    await page.type('#focusme', username);
    await page.type('input[type="password"]', password);
    await page.keyboard.press('Enter');

    await page.waitForNavigation();

    await page.evaluate(() => {
        document.querySelectorAll('input[type="submit"]')[1].click();  // Click the second submit button
    });
    await page.waitForNavigation({ waitUntil: 'load' });  // Wait for the page to load
})();