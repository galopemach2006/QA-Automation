import { test, expect } from "@playwright/test"
import { InventoryPage } from "../page-objects/inventory-page"
import { LoginPage } from "../page-objects/login-page"
import loginCredentials from "../fixtures/login-data.json"
import { InventoryItemPage } from "../page-objects/inventory-item-page"

test.describe("Inventory Item", () => {
    let inventoryPage: InventoryPage
    let loginPage: LoginPage
    let inventoryItemPage: InventoryItemPage
    const credentials = loginCredentials.credentials

    test.beforeEach(async ({page}) => {
        inventoryItemPage = new InventoryItemPage(page)
        inventoryPage = new InventoryPage(page)
        loginPage = new LoginPage(page)
        await page.goto("https://www.saucedemo.com/")
        await loginPage.fillLogin(credentials.rightCredentials)
    })

    test("Inventory Item 001 - Verify items visibility on details page", async () => {
        const itemCount = await inventoryItemPage.inventoryItemName.count()

        for(let i = 0; i < itemCount; i++) {
            await inventoryItemPage.inventoryName.nth(i).click()
            await expect(inventoryItemPage.inventoryItemName).toBeVisible()
            await expect(inventoryItemPage.inventoryItemDescription).toBeVisible()
            await expect(inventoryItemPage.inventoryItemPrice).toBeVisible()
            await expect(inventoryItemPage.inventoryItemImage).toBeVisible()
            await inventoryItemPage.backToProductsButton.click()
        }
    })
})

