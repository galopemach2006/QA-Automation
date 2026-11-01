import {Page, Locator} from "@playwright/test"

export class InventoryItemPage {
    readonly page: Page
    readonly inventoryName: Locator
    readonly inventoryItemName: Locator
    readonly inventoryItemDescription: Locator
    readonly inventoryItemPrice: Locator
    readonly inventoryItemImage: Locator
    readonly backToProductsButton: Locator

    constructor(page: Page) {
        this.page = page
        this.inventoryName = page.locator(".inventory_item_name")
        this.inventoryItemName = page.locator("[data-test='inventory-item-name']")
        this.inventoryItemDescription = page.locator("[data-test='inventory-item-desc']")
        this.inventoryItemPrice = page.locator("[data-test='inventory-item-price']")
        this.inventoryItemImage = page.locator("img[class='inventory_details_img']")
        this.backToProductsButton = page.locator("[data-test='back-to-products']")
    }

    async inventoryItemCount(): Promise<number> {
        return await this.inventoryName.count()
    }
}

