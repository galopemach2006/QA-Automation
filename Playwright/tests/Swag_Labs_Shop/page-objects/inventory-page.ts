import {Page, Locator, expect} from "@playwright/test"

export class InventoryPage{
    page : Page
    inventoryName : Locator
    inventoryDescription : Locator
    inventoryPrice : Locator 
    inventoryImage : Locator
    addToCartButton : Locator
    addToCartBadge : Locator
    
    constructor(page: Page) {
        this.page = page
        this.inventoryName = page.locator(".inventory_item_name")
        this.inventoryDescription = page.locator(".inventory_item_desc")
        this.inventoryPrice = page.locator(".inventory_item_price")
        this.inventoryImage = page.locator(".inventory_item_img")
        this.addToCartButton = page.locator("button.btn_inventory")
        this.addToCartBadge = page.locator("[data-test='shopping-cart-badge']")
    }

    async inventoryPageVisibility(information: Locator): Promise<number>{
        const info = await information.count()

        for(let i = 0; i < info; i++) {
            await expect(information.nth(i)).toBeVisible()
        }
        return info
    }
}