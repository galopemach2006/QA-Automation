import {test, expect} from "@playwright/test"
import {LoginPage} from "../page-objects/login-page"
import data from "../test-data/login-data.json"

test.describe("Swag Labs Login", () => {
    let c : LoginPage
    const credentials = data.credentials
    const errorMessages = data.errorLoginMessages

    test.beforeEach(async ({page}) => {
        c = new LoginPage(page)
        await page.goto("https://www.saucedemo.com/")
    })

    test.afterEach(async () => {
        console.log("Testing Complete")
    })

    const loginTest = [
        {
            name: "Login 001 - Valid Login",
            credentials: credentials.rightCredentials,
            text:  "Swag Labs"
        },

        {
            name: "Login 002 - Invalid Login",
            credentials: credentials.wrongCredentials,
            text: errorMessages.invalidUserPass
        },

        {
            name: "Login 003 - Wrong Username",
            credentials: {...credentials.rightCredentials, email: credentials.wrongCredentials.email},
            text: errorMessages.invalidUserPass
        },

        {
            name: "Login 004 - Wrong Password",
            credentials: {...credentials.rightCredentials, password: credentials.wrongCredentials.password},
            text: errorMessages.invalidUserPass
        },

        {
            name: "Login 005 - Blank Credentials",
            credentials: credentials.blank,
            text: "Epic sadface: Username is required"
        },

        {
            name: "Login 006 - Blank Username",
            credentials: {...credentials.rightCredentials, email: credentials.blank.email},
            text: "Epic sadface: Username is required"
        },

        {
            name: "Login 007 - Blank Password",
            credentials: {...credentials.rightCredentials, password: credentials.blank.password},
            text: "Epic sadface: Password is required"
        }
    ]

    for(const login of loginTest) {
        test(login.name, async ({page}) => {
            await c.fillLogin(login.credentials)
            await expect(page.getByText(login.text)).toBeVisible()
        })
    }
})