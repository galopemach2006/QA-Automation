import { test, expect } from "@playwright/test"
import loginData from "../fixtures/login-data.json"
import { InventoryPage } from "../page-objects/inventory-page"
import { LoginPage } from "../page-objects/login-page"
import { CheckoutPage } from "../page-objects/checkout-page"
import checkoutData from "../fixtures/checkout-data.json"
import { checkoutConstants } from "../constants/checkout-constants"

test.describe("Checkout Process", () => {
    let loginPage: LoginPage
    let checkoutPage: CheckoutPage
    let inventoryPage: InventoryPage
    const credentials = loginData.credentials.rightCredentials
    const wrongInformation = checkoutData.wrongInformation

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        checkoutPage = new CheckoutPage(page)
        inventoryPage = new InventoryPage(page)
        await page.goto("https://www.saucedemo.com/")
        await loginPage.fillLogin(credentials)
        await checkoutPage.addBackpackToCartButton.click()
        await checkoutPage.backpackProductLink.click()
        await checkoutPage.shoppingCartLink.click()
    })

    test("Checkout Process 001 - Ensure all product ready for checkout is accurate", async () => {
        await expect(inventoryPage.inventoryName).toBeVisible()
        await expect(inventoryPage.inventoryDescription).toBeVisible()
        await expect(inventoryPage.inventoryPrice).toBeVisible()
    })

    const checkoutAuth = [
        {
            scenario: "Checkout Process 002 - Filling checkout page with accurate information",
            information: checkoutData.rightInformation,
            type: "locator",
            expected: checkoutConstants.titles.checkoutOverview
        },

        {
            scenario: "Checkout Process 003 - Filling checkout page with blank information",
            information: checkoutData.blankInformation,
            type: "locator",
            expected: checkoutConstants.errorMessages.blankError
        },

        
        {
            scenario: "Checkout Process 004 - Filling checkout page with numberized first name",
            information: {...checkoutData.rightInformation, firstName: wrongInformation.numberizedFirstName},
            expected: checkoutConstants.errorMessages.numberizedFirstName,
            type: "getByText"
        },

        {
            scenario: "Checkout Process 005 - Filling checkout page with numberized last name",
            information: {...checkoutData.rightInformation, lastName: wrongInformation.numberizedLastName},
            expected: checkoutConstants.errorMessages.numberizedLastname,
            type: "getByText"
        },

        {
            scenario: "Checkout Process 006 - Filling checkout page with alphabetic postal code",
            information: {...checkoutData.rightInformation, zipPostalCode: wrongInformation.alphabeticZipCode},
            expected: checkoutConstants.errorMessages.alphabeticPostalCode,
            type: "getByText"
        },
        

        {
            scenario: "Checkout Process 007 - Filling checkout page with blank first name",
            information: {...checkoutData.rightInformation, firstName: checkoutData.blankInformation.firstName},
            type: "getByText",
            expected: checkoutConstants.errorMessages.blankFirstName
        },

        {
            scenario: "Checkout Process 008 - Filling checkout page with blank last name",
            information: {...checkoutData.rightInformation, lastName: checkoutData.blankInformation.lastName},
            type: "getByText",
            expected: checkoutConstants.errorMessages.blankLastName
        },

        {
            scenario: "Checkout Process 009 - Filling checkout page with blank postal code",
            information: {...checkoutData.rightInformation, zipPostalCode: checkoutData.blankInformation.zipPostalCode},
            type: "getByText",
            expected: checkoutConstants.errorMessages.blankPostalCode
        }
    ]

    for(const checkout of checkoutAuth) {
        test(checkout.scenario, async () => {
            await checkoutPage.checkoutButton.click()
            await checkoutPage.fillInformation(checkout.information)
            await checkoutPage.continueButton.click()

            if(checkout.type == "locator") {
                await expect(checkoutPage.page.locator(checkout.expected)).toBeVisible()
            } else if(checkout.type == "getByText") {
                await expect(checkoutPage.page.getByText(checkout.expected)).toBeVisible()
            }
        })
    }
})
