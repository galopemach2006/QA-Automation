import {Page, Locator} from "@playwright/test"

export interface Credentials {
    email: string
    password: string
}

export class LoginPage{
    page: Page
    emailInput: Locator
    passwordInput: Locator
    button: Locator

    constructor(page: Page) {
        this.page = page
        this.emailInput = page.locator("[data-test='username']")
        this.passwordInput = page.locator("[data-test='password']")
        this.button = page.locator("[data-test='login-button']")
    }

    async fillLogin(c: Credentials) {
        await this.emailInput.fill(c.email)
        await this.passwordInput.fill(c.password)
        await this.button.click()
    }
}