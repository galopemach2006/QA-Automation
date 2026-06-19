const {test, expect} = require("@playwright/test");

test("New Tab", async function({page}) {
    //New Tab Link
    await page.goto('https://www.qa-practice.com/elements/input/simple');
    await page.locator('a[href="/elements/new_tab"]').click();
    
    //New Tab Button
    await page.locator('a[href="/elements/new_tab/button"]').click();
    await page.locator('a[href="/elements/new_tab/new_page"]').click();
    await page.waitForTimeout(5000);
})