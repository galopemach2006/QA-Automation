import {Page, Locator, expect} from "@playwright/test"

export interface credentials {
    email: string
    password: string
}

export class Login{
    page: Page
    emailInput: Locator
    passwordInput: Locator
    button: Locator

    constructor(page: Page) {
        this.page = page
        this.emailInput = page.locator("input[type='text']")
        this.passwordInput = page.locator("input[type='password']")
        this.button = page.locator("input[type='submit']")
    }

    async fillLogin(c: credentials) {
        await this.emailInput.fill(c.email)
        await this.passwordInput.fill(c.password)
        await this.button.click()
    }
}