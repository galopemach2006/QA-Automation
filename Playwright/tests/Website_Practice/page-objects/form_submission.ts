import {Page, Locator, expect} from "@playwright/test"

export class forms{
    readonly page: Page
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly contactNumberInput: Locator
    readonly dateInput: Locator
    readonly uploadFiles: Locator
    readonly country: Locator
    readonly submit: Locator
    readonly success: Locator

    constructor(page: Page) {
        this.page = page
        this.nameInput = page.getByPlaceholder("eg. Jhon Doe")
        this.emailInput = page.getByPlaceholder("eg. user@user.com")
        this.contactNumberInput = page.getByPlaceholder("880 XXXX XXX XXX")
        this.dateInput = page.getByPlaceholder("Select Date")
        this.uploadFiles = page.getByPlaceholder("Upload")
        this.country = page.locator("select[name='country']")
        this.submit = page.locator('form').getByRole('button', {name: "Submit"})
        this.success = page.getByRole('heading', {name: "successfully submitted"})
    }

    async navigate() {
        await this.page.goto("https://practice.qabrains.com/form-submission")
    }

    async placeholderInformation(name: string, email: string, contactNumber: string, date: string, files: string) {
        await this.nameInput.fill(name)
        await this.emailInput.fill(email)
        await this.contactNumberInput.fill(contactNumber)
        await this.dateInput.fill(date)
        await this.uploadFiles.setInputFiles(files)
    }

    async locatorInformation(checkboxes: string[], country: string) {
        for (const c of checkboxes) {
            await this.page.getByLabel(c).check()
        }
       
        await this.country.selectOption(country)
        await this.submit.click()
    }

    async completeInformation() {
        console.log("Complete Information")
        await expect(this.success).toBeVisible()
    }

    async radioButtonCheck(radioColor: string) {
        await this.page.getByRole('radio', {name: radioColor, exact: true}).check()
    }

    //Email Verifier
    async emailInvalidFormat(text: string) {
        await expect(this.emailInput).toHaveJSProperty("validationMessage", text)
    }

    async noEmail() {
        await expect(this.page.getByText("Email is a required field")).toBeVisible()
    }

    async emailInvalid() {
        await expect(this.page.getByText("Email must be a valid email")).toBeVisible()
    }

    //Blank Information
    async blankInformation() {
        console.log("Blank Information")
        await expect(this.success).toBeHidden()
        await expect(this.page.getByText("Name is a required field")).toBeVisible()
        await expect(this.page.getByText("Email is a required field")).toBeVisible()
        await expect(this.page.getByText("Contact is a required field")).toBeVisible()
        await expect(this.page.getByText("Upload File is a required field")).toBeVisible()
        await expect(this.page.getByText("Color is a required field")).toBeVisible()
        await expect(this.page.getByText("Food is a required field")).toBeVisible()
        await expect(this.page.getByText("Country is a required field")).toBeVisible()
    }

    async submitForm() {
        await this.submit.click()
    }
}

