import {Page, Locator} from "@playwright/test"

export class InventoryPage {
    readonly page: Page
    readonly inventoryName: Locator
    readonly inventoryDescription: Locator
    readonly inventoryPrice: Locator
    readonly inventoryImage: Locator
    readonly addToCartButton: Locator
    readonly addToCartBadge: Locator
    readonly sortingOptions: Locator
    readonly sortingButton: Locator

    constructor(page: Page) {
        this.page = page
        this.inventoryName = page.locator("[data-test='inventory-item-name']")
        this.inventoryDescription = page.locator("[data-test='inventory-item-desc']")
        this.inventoryPrice = page.locator("[data-test='inventory-item-price']")
        this.inventoryImage = page.locator(".inventory_item_img")
        this.addToCartButton = page.locator("button.btn_inventory")
        this.addToCartBadge = page.locator("[data-test='shopping-cart-badge']")
        this.sortingOptions = page.locator("select.product_sort_container option")
        this.sortingButton = page.locator(".product_sort_container")
    }

    async inventoryDetailsVisibility(information: Locator): Promise<number> {
        await information.first().waitFor({ state: 'visible' });
        return await information.count()
    }

    async addToCartButtons(button : Locator): Promise<number> {
        await button.first().waitFor({state : 'visible'})
        return await button.count()
    }
}

