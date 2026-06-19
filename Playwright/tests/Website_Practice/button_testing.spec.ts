import {test, expect} from "@playwright/test";

test("Button Testing", async function ({page}) {
    //Simple Button
    await page.goto('https://www.qa-practice.com/elements/input/simple');
    await page.locator('a[href="/elements/button"]').click();
    await page.getByRole('button', {name: "Click"}).click();
    
    //Looks like a button   
    await page.locator('a[href="/elements/button/like_a_button"]').click();
    await page.locator('a[href="#"]').click();

    //Disabled
    await page.locator('a[href="/elements/button/disabled"]').click();
    await page.locator('select[name=select_state]').selectOption({label: "Enabled"});
    await page.getByRole('button', {name: "Submit"}).click();
    await page.waitForTimeout(5000);
})