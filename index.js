const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Set to true to hide browser
    const page = await browser.newPage();

    await page.goto('https://example.com/login'); // Replace with actual URL

    await page.type('#username', 'yourUsername'); // Replace with actual input field selector
    await page.type('#password', 'yourPassword'); // Replace with actual input field selector
    await page.click('#loginButton'); // Replace with actual button selector

    await page.waitForNavigation();

    // Do actions after login, e.g., click a button
    await page.click('#someButton'); 

    // Close browser
    await browser.close();
})();