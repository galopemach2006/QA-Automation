import {test, expect} from "@playwright/test"

//Should show invalid credentials
test("Login Test: Username - admin, Password - admin123", async ({page}) => {
    await page.goto("https://practice.qabrains.com/")
    await page.getByPlaceholder("eg. user@user.com").fill("admin")
    await page.getByPlaceholder('*******').fill("admin123")
    await page.getByRole('button', {name: "Login"}).click()
    await page.waitForTimeout(5000)
})

//Should require a password
test("Login Test: Username - admin, Password - Blank Field", async ({page}) => {
    await page.goto("https://practice.qabrains.com/")
    await page.getByPlaceholder("eg. user@user.com").fill("admin@1234")
    await page.getByRole('button', {name: "Login"}).click()
})