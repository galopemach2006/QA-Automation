import {Page, Locator, expect} from "@playwright/test"
import {Login} from "./login-page"
import l from "../test-data/login-data.json"

export class ProductPage1 extends Login {
    productNameLocator : Locator
    productDescriptionLocator : Locator
    productPriceLocator : Locator 
    productImageLocator : Locator
    productButton : Locator
    addToCartBadge : Locator

    constructor(page: Page) {
        super(page)
        this.productNameLocator = page.locator(".inventory_item_name")
        this.productDescriptionLocator = page.locator(".inventory_item_desc")
        this.productPriceLocator = page.locator(".inventory_item_price")
        this.productImageLocator = page.locator(".inventory_item_img")
        this.productButton = page.locator("button.btn_inventory")
        this.addToCartBadge = page.locator("[data-test='shopping-cart-badge']")
    }

    async login(): Promise<void> {
        const d = l.credentials.rightCredentials
        await this.fillLogin(d)
    }

    async productVisibility(information: Locator): Promise<number>{
        await information.first().waitFor();
        const info = await information.all()

        for(let i = 0; i < info.length; i++) {
            await expect(info[i]).toBeVisible()
        }

        return info.length
    }
}