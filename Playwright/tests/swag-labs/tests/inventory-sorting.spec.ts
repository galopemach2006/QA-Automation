import { test, expect } from "@playwright/test"
import { InventoryPage } from "../page-objects/inventory-page"
import { LoginPage } from "../page-objects/login-page"
import loginCredentials from "../fixtures/login-data.json"

test.describe("Inventory Sorting", () => {
    let inventoryPage: InventoryPage
    let loginPage: LoginPage
    const credentials = loginCredentials.credentials

    test.beforeEach(async ({page}) => {
        inventoryPage = new InventoryPage(page)
        loginPage = new LoginPage(page)
        await page.goto("https://www.saucedemo.com/")
        await loginPage.fillLogin(credentials.rightCredentials)
    })

    test("Inventory Sorting 001 - Can select all of the sorting options", async () => {
        const inventoryOptions = await inventoryPage.sortingOptions.allTextContents()

        for(const option of inventoryOptions) {
            await inventoryPage.sortingButton.selectOption(option)
        }
    })

    test("Inventory Sorting 002 - Ensure product is properly sorted", async () => {
        const inventoryOptions = await inventoryPage.sortingOptions.allTextContents()

        for(const option of inventoryOptions) {
            await inventoryPage.sortingButton.selectOption(option)
            const itemName = await inventoryPage.inventoryName.allTextContents()

            if (option == "Name (A to Z)") {
                expect(itemName[0]).toBe("Sauce Labs Backpack")
            } else if (option == "Name (Z to A)") {
                expect(itemName[0]).toBe("Test.allTheThings() T-Shirt (Red)")
            } else if (option == "Price (low to high)") {
                expect(itemName[0]).toBe("Sauce Labs Onesie")
            } else if (option == "Price (high to low)") {
                expect(itemName[0]).toBe("Sauce Labs Fleece Jacket")
            }
        }
    })
})
