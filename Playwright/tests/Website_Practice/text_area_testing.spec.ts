const {test, expect} = require("@playwright/test");

test("Text Area", async function({page}) {
    //Text Area
    await page.goto('https://www.qa-practice.com/elements/input/simple');
    await page.locator('a[href="/elements/textarea"]').click();
    await page.locator('#id_text_area').fill("ohhhhhh, hindi ko maisip kung wala ka");
    await page.getByRole('button', {name: "Submit"}).click();
    await page.waitForTimeout(5000);
})
