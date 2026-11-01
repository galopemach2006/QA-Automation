import { test, expect } from "@playwright/test"
import { LoginPage } from "../page-objects/login-page"
import data from "../fixtures/login-data.json"
import { loginConstants } from "../constants/login-constants"

test.describe("Login Page", () => {
    let loginPage: LoginPage
    const credentials = data.credentials

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await page.goto("https://www.saucedemo.com/")
    })

    const loginTest = [
        {
            name: "Login 001 - Valid Login",
            credentials: credentials.rightCredentials,
            expected: "Swag Labs"
        },

        {
            name: "Login 002 - Invalid Login",
            credentials: credentials.wrongCredentials,
            expected: loginConstants.errorMessages.invalidUserPass
        },

        {
            name: "Login 003 - Wrong Username",
            credentials: {...credentials.rightCredentials, email: credentials.wrongCredentials.email},
            expected: loginConstants.errorMessages.wrongUsername
        },

        {
            name: "Login 004 - Wrong Password",
            credentials: {...credentials.rightCredentials, password: credentials.wrongCredentials.password},
            expected: loginConstants.errorMessages.wrongPassword
        },

        {
            name: "Login 005 - Blank Credentials",
            credentials: credentials.blank,
            expected: loginConstants.errorMessages.blankCredentials
        },

        {
            name: "Login 006 - Blank Username",
            credentials: {...credentials.rightCredentials, email: credentials.blank.email},
            expected: loginConstants.errorMessages.blankUsername
        },

        {
            name: "Login 007 - Blank Password",
            credentials: {...credentials.rightCredentials, password: credentials.blank.password},
            expected: loginConstants.errorMessages.blankPassword
        }
    ]

    for(const login of loginTest) {
        test(login.name, async () => {
            await loginPage.fillLogin(login.credentials)
            await expect(loginPage.page.getByText(login.expected)).toBeVisible()
        })
    }
})