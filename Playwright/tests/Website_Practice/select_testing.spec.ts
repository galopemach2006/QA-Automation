const {test, expect} = require("@playwright/test");

test("Select", async function({page}){
    //Single Select
    await page.goto("https://www.qa-practice.com/elements/input/simple");
    await page.locator('a[href="/elements/select"]').click();
    await page.locator('select[name=choose_language]').selectOption({label: "Python"});
    await page.locator('select[name=choose_language]').selectOption({label: "C#"});
    await page.getByRole('button', {name: "Submit"}).click();

    //Multiple Select
    await page.locator('a[href="/elements/select/mult_select"]').click();
    await page.locator('select[name=choose_the_place_you_want_to_go]').selectOption({label: "Sea"});
    await page.locator('select[name=choose_the_place_you_want_to_go]').selectOption({label: "Mountains"});
    await page.locator('select[name=choose_how_you_want_to_get_there]').selectOption({label: "Car"});
    await page.locator('select[name=choose_how_you_want_to_get_there]').selectOption({label: "Bus"});
    await page.locator('select[name=choose_when_you_want_to_go]').selectOption({label: "Today"});
    await page.locator('select[name=choose_when_you_want_to_go]').selectOption({label: "Tomorrow"});
    await page.getByRole('button', {name: "Submit"}).click();
    await page.waitForTimeout(4000);
})