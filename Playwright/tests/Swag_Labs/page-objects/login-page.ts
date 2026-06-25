import {Page, Locator, expect} from "@playwright/test"
import Data from "../test-data/login-data.json"

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
        this.emailInput = page.locator("[data-test='username']")
        this.passwordInput = page.locator("[data-test='password']")
        this.button = page.locator("[data-test='login-button']")
    }

    async fillLogin(c: credentials) {
        await this.emailInput.fill(c.email)
        await this.passwordInput.fill(c.password)
        await this.button.click()
    }
    
}