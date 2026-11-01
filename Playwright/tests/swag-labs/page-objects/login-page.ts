import {Page, Locator} from "@playwright/test"

export interface Credentials {
    email: string
    password: string
}

export class LoginPage {
    readonly page: Page
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator

    constructor(page: Page) {
        this.page = page
        this.emailInput = page.locator("[data-test='username']")
        this.passwordInput = page.locator("[data-test='password']")
        this.loginButton = page.locator("[data-test='login-button']")
    }

    async fillLogin(credentials: Credentials) {
        await this.emailInput.fill(credentials.email)
        await this.passwordInput.fill(credentials.password)
        await this.loginButton.click()
    }
}

