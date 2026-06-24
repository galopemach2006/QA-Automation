import {Page, Locator, expect} from "@playwright/test"
import {Login} from "./login"
import l from "../test-data/login_data.json"
import p from "../test-data/product_data.json"

export class products extends Login {
    productNameLocator : Locator
    productDescriptionLocator : Locator
    productPriceLocator : Locator 


    constructor(page: Page) {
        super(page)
        this.productNameLocator = page.locator(p.productNameLocator)
        this.productDescriptionLocator = page.locator(p.productDescriptionLocator)
        this.productPriceLocator = page.locator(p.productPriceLocator)
    }

    async productNameVerifier(): Promise<void> {
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