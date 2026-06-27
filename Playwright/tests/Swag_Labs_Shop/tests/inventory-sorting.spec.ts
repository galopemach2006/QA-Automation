import {test, expect} from "@playwright/test"
import {InventoryPage} from "../page-objects/inventory-page"
import { LoginPage } from "../page-objects/login-page"
import loginCredentials from "../test-data/login-data.json"

test.describe("Inventory Sorting", () => {
    let inventoryPage : InventoryPage
    let loginPage: LoginPage
    const credentials = loginCredentials.credentials
    
    test.beforeEach(async ({page}) => {
        inventoryPage = new InventoryPage(page)
        loginPage = new LoginPage(page)
        await page.goto("https://www.saucedemo.com/")
        await loginPage.fillLogin(credentials.rightCredentials)
    })

    test.afterEach(async () => {
        console.log("Testing Complete")
    })

    test("Inventory Sorting 001 - Can select all of the sorting options", async () => {
        const inventoryOptions = await inventoryPage.inventorySortingOptions()

        for(const options of inventoryOptions) {
            await inventoryPage.sortingButton.selectOption(options)
        }  
    })

    test("Inventory Sorting 002 - Ensure product is properly sorted", async () => {
        const inventoryOptions = await inventoryPage.inventorySortingOptions()
        const itemName = await inventoryPage.inventoryNameText()
        const firstItem = itemName[0]

        for(const options of inventoryOptions) {
            await inventoryPage.sortingButton.selectOption(options)

            if (options == "Name (A to Z)") {
                expect(firstItem).toBe("Sauce Labs Backpack")
            } else if (options == "Name (Z to A)") {
                expect(firstItem).toBe("Test.allTheThings() T-Shirt (Red)")
            } else if (options == "Price (low to high)") {
                expect(firstItem).toBe("Sauce Labs Onesie")
            } else if (options == "Price (high to low)"){
                expect(firstItem).toBe("Sauce Labs Fleece Jacket")
            }   
        }
    })
})