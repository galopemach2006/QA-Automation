import {Page, Locator, expect} from "@playwright/test"

export class InventoryPage{
    page : Page
    inventoryName : Locator
    inventoryDescription : Locator
    inventoryPrice : Locator 
    inventoryImage : Locator
    addToCartButton : Locator
    addToCartBadge : Locator
    sortingOptions: Locator
    sortingButton: Locator
    
    constructor(page: Page) {
        this.page = page
        this.inventoryName = page.locator("[data-test='inventory-item-name']")
        this.inventoryDescription = page.locator("[data-test='inventory-item-desc']")
        this.inventoryPrice = page.locator("[data-test='inventory-item-price']")
        this.inventoryImage = page.locator(".inventory_item_img")
        this.addToCartButton = page.locator("button.btn_inventory")
        this.addToCartBadge = page.locator("[data-test='shopping-cart-badge']")
        this.sortingOptions = page.locator("//option")
        this.sortingButton = page.locator(".product_sort_container")
    }

    async inventoryDetailsVisibility(information: Locator): Promise<number>{
        const info = await information.count()

        for(let i = 0; i < info; i++) {
            await expect(information.nth(i)).toBeVisible()
        }
        return info
    }
    
    async inventorySortingOptions() {
        const sort = await this.sortingOptions.allTextContents()
        return sort
    }

    async inventoryNameText() {
        const itemText = await this.inventoryName.allTextContents()
        return itemText
    }
}
