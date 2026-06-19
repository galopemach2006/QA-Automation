import {test, expect} from "@playwright/test"

test("Input Testing", async function({page}) {
    //Text Input
    await page.goto('https://www.qa-practice.com/elements/input/simple');
    await page.getByPlaceholder("Submit me").type("____---fdfsdfds77978788");
    await page.locator('a[href="/elements/input/email"]').click();
})










