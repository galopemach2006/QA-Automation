import { Page, expect, Locator } from "@playwright/test";

export class loginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly successHeader: Locator;
    readonly button: Locator;
    readonly bothCredentialsError: Locator;
    readonly wrongEmailError: Locator;
    readonly wrongPasswordError: Locator;
    readonly requiredEmail: Locator;
    readonly requiredPassword: Locator;

    constructor(page : Page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder("eg. user@user.com")
        this.passwordInput = page.getByPlaceholder("*******")
        this.successHeader = page.getByRole('heading', {name: "Login Successful"})
        this.button = page.getByRole('button', {name: "Login"})
        this.bothCredentialsError = page.getByText("Your email and password both are invalid!")
        this.wrongEmailError = page.getByText("Your email is invalid!")
        this.wrongPasswordError = page.getByText("Your password is invalid!")
        this.requiredEmail = page.getByText("Email is a required field")
        this.requiredPassword = page.getByText("Password is a required field")
    }

    async navigate() {
        await this.page.goto("https://practice.qabrains.com/")
    }

    async email_password(email : string, password : string) {
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.button.click()
    }

    async bothCredentialsTrue() {
        console.log("Both Credentials Correct")
        await expect(this.successHeader).toBeVisible()
    }

    async wrongEmail() {
        console.log("Wrong Email")
        await expect(this.wrongEmailError).toBeVisible()
    }

    async wrongPassword() {
        console.log("Wrong Password")
        await expect(this.wrongPasswordError).toBeVisible()
    }

    async bothCredentialsFalse() {
        console.log("Both Credentials Wrong")
        await expect(this.bothCredentialsError).toBeVisible()
    }
        
    async emailBlank() {
        console.log("Blank Email")
        await expect(this.requiredEmail).toBeVisible()
    }

    async passwordBlank() {
        console.log("Blank Password")
        await expect(this.requiredPassword).toBeVisible()
    }
}