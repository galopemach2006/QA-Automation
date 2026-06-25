import {test, expect} from "@playwright/test"
import {ProductPage1} from "../page-objects/product-page-1"

test.describe("Product Testing", () => {
    let p : ProductPage1
    
    test.beforeEach(async ({page}) => {
        p = new ProductPage1(page)
        await page.goto("https://www.saucedemo.com/")
        await p.login()
    })

    test.afterEach(async () => {
        console.log("Testing Complete")
    })

    test("Product Visibility 001 - Sees Product Name after Valid Login", async () => {
        const name = await p.productVisibility(p.productNameLocator)
        expect(name).toEqual(6)
    })

    test("Product Visibility 002 - Sees Product Description after Valid Login", async () => {
        const description = await p.productVisibility(p.productDescriptionLocator)
        expect(description).toEqual(6)
    })

    test("Product Visibility 003 - Sees Product Price after Valid Login", async () => {
        const price = await p.productVisibility(p.productPriceLocator)
        expect(price).toEqual(6)
    })

    test("Product Visibility 004 - Sees Product Image after Valid Login", async () => {
        const image = await p.productVisibility(p.productImageLocator)
        expect(image).toEqual(12)
    })

    test("Product Visibility 005 - Six products can be added to cart & displays no. of items.", async ({page}) => {
        await p.productButton.first().waitFor()
        const b = await p.productButton.all()

        for(const button of b) {
            await button.click()
            await page.waitForTimeout(1000)
        }

        expect(p.addToCartBadge).toHaveText("6")
    })
})