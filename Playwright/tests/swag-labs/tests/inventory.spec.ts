import { test, expect } from "@playwright/test"
import { InventoryPage } from "../page-objects/inventory-page"
import { LoginPage } from "../page-objects/login-page"
import loginCredentials from "../fixtures/login-data.json"

test.describe("Product Inventory", () => {
    let inventoryPage: InventoryPage
    let loginPage: LoginPage
    const credentials = loginCredentials.credentials

    test.beforeEach(async ({page}) => {
        inventoryPage = new InventoryPage(page)
        loginPage = new LoginPage(page)
        await page.goto("https://www.saucedemo.com/")
        await loginPage.fillLogin(credentials.rightCredentials)
    })

    test("Product Visibility 001 - Sees Product Name after Valid Login", async () => {
        const name = await inventoryPage.inventoryDetailsVisibility(inventoryPage.inventoryName)
        expect(name).toBe(6)
    })

    test("Product Visibility 002 - Sees Product Description after Valid Login", async () => {
        const description = await inventoryPage.inventoryDetailsVisibility(inventoryPage.inventoryDescription)
        expect(description).toBe(6)
    })

    test("Product Visibility 003 - Sees Product Price after Valid Login", async () => {
        const price = await inventoryPage.inventoryDetailsVisibility(inventoryPage.inventoryPrice)
        expect(price).toBe(6)
    })

    test("Product Visibility 004 - Sees Product Image after Valid Login", async () => {
        const image = await inventoryPage.inventoryDetailsVisibility(inventoryPage.inventoryImage)
        expect(image).toBe(12)
    })

    test("Product Visibility 005 - Six products can be added to cart & displays no. of items.", async () => {
        const allButtons = await inventoryPage.addToCartButtons(inventoryPage.addToCartButton)

        for(let i = 0; i < allButtons; i++) {
            await inventoryPage.addToCartButton.nth(i).click()
        }

        await expect(inventoryPage.addToCartBadge).toHaveText("6")
    })
})