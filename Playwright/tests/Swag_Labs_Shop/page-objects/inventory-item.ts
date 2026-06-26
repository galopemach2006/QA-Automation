import {expect, Page, Locator} from "@playwright/test"

export class InventoryItem { 
    page: Page
    inventoryName: Locator
    inventoryItemName : Locator
    inventoryItemDescription : Locator
    inventoryItemPrice : Locator 
    inventoryItemImage : Locator
    backToProductsButton : Locator
    
    constructor(page: Page) {
        this.page = page
        this.inventoryName = page.locator(".inventory_item_name")
        this.inventoryItemName = page.locator("[data-test='inventory-item-name']")
        this.inventoryItemDescription = page.locator("[data-test='inventory-item-desc']")
        this.inventoryItemPrice = page.locator("[data-test='inventory-item-price']")
        this.inventoryItemImage = page.locator("img[class='inventory_details_img']")
        this.backToProductsButton = page.locator("[data-test='back-to-products']")
    }

    async inventoryItemCount() : Promise<number>{
        const button = await this.inventoryName.count()
        return button
    }
}