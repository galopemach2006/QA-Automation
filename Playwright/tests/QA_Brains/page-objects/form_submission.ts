import {Page, Locator, expect} from "@playwright/test"

export interface Information {
    name: string
    email: string, 
    contactNo: string
    date: string
    uploadFiles: string
    radioColor: string
    checkboxes: string[]
    country: string
}

export class forms{
     page: Page
     nameInput: Locator
     emailInput: Locator
     contactNumberInput: Locator
     dateInput: Locator
     uploadFiles: Locator
     country: Locator
     submit: Locator
     success: Locator

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

    async fillInformation(i: Information) {
        await this.nameInput.fill(i.name)
        await this.emailInput.fill(i.email)
        await this.contactNumberInput.fill(i.contactNo)
        await this.dateInput.fill(i.date)
        await this.uploadFiles.setInputFiles(i.uploadFiles)
        await this.page.getByRole('radio', {name: i.radioColor, exact: true}).check()

        for (const c of i.checkboxes) {
            await this.page.getByLabel(c).check()
        }
       
        await this.country.selectOption(i.country)
        await this.submit.click()
    }

    async emailInvalidFormat(text: string) {
        await expect(this.emailInput).toHaveJSProperty("validationMessage", text)
    }

    async emailInvalid() {
        await expect(this.page.getByText("Email must be a valid email")).toBeVisible()
    }

    async blankInformation() {
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

