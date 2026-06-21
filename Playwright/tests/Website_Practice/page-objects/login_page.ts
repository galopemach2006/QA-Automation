import { Page, Locator } from "@playwright/test";

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

    async email_password(email: string, password: string) {
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.button.click()
    }
}       