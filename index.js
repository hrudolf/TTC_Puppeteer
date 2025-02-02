const puppeteer = require('puppeteer');
require('dotenv').config();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const egyszamtipp = process.env.EGYSZAM;
const randomGuess = process.env.RANDOM_UPTO;

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://teveclub.hu');

    await page.type('#focusme', username);
    await page.type('input[type="password"]', password);
    await page.keyboard.press('Enter');

    await page.waitForNavigation();

    console.log(`- Szia, ${username}, hogy vagy ma?`)
    console.log(`- Szia, kis gazdám!!! Most már nagyon jól, úgy örülök neked!`)

    let missingFood = 0;

    while (true) {
        const feedButton = await page.$('input[name="etet"]');
        
        if (feedButton) {
            missingFood++;
            await feedButton.click();    
            await page.waitForNavigation({ waitUntil: 'load' });
        } else {
            console.log("- Bekészítettem a kajádat a hétre!");
            break;
        }
    }

    console.log(`- Gazdi, annyira hiányoztál, ${missingFood} napja voltál utoljára itt.`);
    

    await page.goto('https://teveclub.hu/tanit.pet');

    const learnButton = await page.$('input[name="learn"]');
    if (learnButton) {
        await learnButton.click();
        await page.waitForNavigation();
        console.log("- Tanulj szépen, kicsi csillagom!");
    } else {
        console.log("- Ma már tanultam, inkább játsszunk!");
    }

    await page.goto('https://teveclub.hu/egyszam.pet');
    
    const egyszamButton = await page.$('input[name="tipp"]');

    if (egyszamButton) {
        const maxNum = +egyszamtipp;
        const isRandom = randomGuess === "true";
        const guessForToday = isRandom ? (1 + Math.floor((Math.random() * maxNum))).toString() : egyszamtipp;
        console.log(`- A mai tippünk: ${guessForToday}`);
        
        await page.type('input[name="honnan"]', guessForToday);
        await egyszamButton.click();
        await page.waitForNavigation({ waitUntil: 'load' });
    } else {
        console.log("- Ma már tippeltünk! :)");
    }

    console.log(`- Legyen szép napod, ${username}! <3`)
    console.log(`- Neked is, Gazdi! <3`)
    process.exit();

})();