import {Page, Locator} from "@playwright/test"

export interface Information {
    firstName: string
    lastName: string
    zipPostalCode: string
}

export class CheckoutPage {
    readonly page: Page
    readonly shoppingCartLink: Locator
    readonly addBackpackToCartButton: Locator
    readonly backpackProductLink: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly postalCodeInput: Locator
    readonly checkoutButton: Locator
    readonly continueButton: Locator

    constructor(page: Page) {
        this.page = page
        this.shoppingCartLink = page.locator("[data-test='shopping-cart-link']")
        this.addBackpackToCartButton = page.locator("button[name='add-to-cart-sauce-labs-backpack']")
        this.backpackProductLink = page.getByText("Sauce Labs Backpack")
        this.firstNameInput = page.locator("[data-test='firstName']")
        this.lastNameInput = page.locator("[data-test='lastName']")
        this.postalCodeInput = page.locator("[data-test='postalCode']")
        this.checkoutButton = page.locator("[data-test='checkout']")
        this.continueButton = page.locator("[data-test='continue']")
    }

    async fillInformation(info: Information) {
        await this.firstNameInput.fill(info.firstName)
        await this.lastNameInput.fill(info.lastName)
        await this.postalCodeInput.fill(info.zipPostalCode)
    }
}

