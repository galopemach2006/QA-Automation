import {test, expect} from "@playwright/test"

test("Login Test: Username - admin, Password - admin123", async ({page}) => {
    await page.goto("https://practice.qabrains.com/")
    await page.getByPlaceholder("eg. user@user.com").fill("admin")
    await page.getByPlaceholder('*******').fill("admin123")
    await page.getByRole('button', {name: "Login"}).click()
    await page.waitForTimeout(5000)
})

test("Login Test", async ({page}) => {
    await page.goto("https://practice.qabrains.com/")
})