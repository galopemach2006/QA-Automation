import {test, expect} from "@playwright/test"
import {InventoryPage} from "../page-objects/inventory-page"
import { LoginPage } from "../page-objects/login-page"
import loginCredentials from "../test-data/login-data.json"
import { InventoryItem } from "../page-objects/inventory-item"

test.describe("Inventory Item", () => {
    
    let inventoryPage : InventoryPage
    let loginPage: LoginPage
    let inventoryItem: InventoryItem
    const credentials = loginCredentials.credentials

    test.beforeEach(async ({page}) => {
        inventoryItem = new InventoryItem(page)
        inventoryPage = new InventoryPage(page)
        loginPage = new LoginPage(page)
        await page.goto("https://www.saucedemo.com/")
        await loginPage.fillLogin(credentials.rightCredentials)
    })

    test("Inventory Item 001 - Verify items visibility on details page", async () => {
        const itemCount = await inventoryItem.inventoryItemCount()

        for(let i = 0; i < itemCount; i++) {
            await inventoryItem.inventoryName.nth(i).click()
            await expect(inventoryItem.inventoryItemName).toBeVisible()
            await expect(inventoryItem.inventoryItemDescription).toBeVisible()
            await expect(inventoryItem.inventoryItemPrice).toBeVisible()
            await expect(inventoryItem.inventoryItemImage).toBeVisible()
            await inventoryItem.backToProductsButton.click()
        }
    })

})