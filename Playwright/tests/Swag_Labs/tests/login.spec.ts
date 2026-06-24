import {test, expect} from "@playwright/test"
import {Login} from "../page-objects/login"
import data from "../test-data/login_data.json"

test.describe("Swag Labs Login", () => {
    let c : Login
    const d = data.credentials
    const e = data.errorLoginMessages

    test.beforeEach(async ({page}) => {
        c = new Login(page)
        await page.goto("https://www.saucedemo.com/")
    })

    /*
    test.afterEach(async () => {
        console.log("Testing Complete")
    })
        */

    test("Login 001 - Valid Login", async ({page}) => {
        await c.fillLogin(d.rightCredentials)
        await expect(page.getByText("Swag Labs")).toBeVisible()
    })

    test("Login 002 - Invalid Login", async ({page}) => {
        await c.fillLogin(d.wrongCredentials)
        await expect(page.getByText(e.errorMessage1)).toBeVisible()
    })

    test("Login 003 - Wrong Username", async ({page}) => {
        const wrongUsername = {...d.rightCredentials, email: d.wrongCredentials.email}
        await c.fillLogin(wrongUsername)
        await expect(page.getByText(e.errorMessage1)).toBeVisible()
    })

    test("Login 004 - Wrong Password", async ({page}) => {
        const wrongPassword = {...d.rightCredentials, email: d.wrongCredentials.password}
        await c.fillLogin(wrongPassword)
        await expect(page.getByText(e.errorMessage1)).toBeVisible()
    })

    test("Login 005 - Blank Credentials", async ({page}) => {
        await c.fillLogin(d.blank)
        await expect(page.getByText("Epic sadface: Username is required")).toBeVisible()
    })
})