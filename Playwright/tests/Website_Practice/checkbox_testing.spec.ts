const {test, expect} = require("@playwright/test");

test("Checkbox Testing", async function({page}) {
    //Single Checkbox
    await page.goto('https://www.qa-practice.com/elements/input/simple');
    await page.locator('a[href="/elements/checkbox"]').click();
    await page.locator('#id_checkbox_0').check();
    await page.locator('#id_checkbox_0').uncheck();
    await page.locator('#id_checkbox_0').check();
    await page.getByRole('button', {name: 'Submit'}).click();

    //Multiple Checkbox
    await page.locator('a[href="/elements/checkbox/mult_checkbox"]').click();
    await page.locator('#id_checkboxes_0').check();
    await page.locator('#id_checkboxes_1').check();
    await page.locator('#id_checkboxes_2').check();
    await page.getByRole('button', {name: 'Submit'}).click();
    await page.waitForTimeout(10000);
})