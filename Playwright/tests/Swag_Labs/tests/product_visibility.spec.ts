import {test, expect} from "@playwright/test"
import {products} from "../page-objects/product"
import productData from "../test-data/product_data.json"

test.describe("Product Testing", () => {
    let p : products
    const pData = productData

    test.beforeEach(async ({page}) => {
        p = new products(page)
        await page.goto("https://www.saucedemo.com/")
        await p.productNameVerifier()
    })

    test.afterEach(async () => {
        console.log("Testing Complete")
    })

    test("Product Verifier 001 - Sees Product Name after Valid Login", async () => {
        const v = await p.productVisibility(p.productNameLocator)
        expect(v).toEqual(6)
    })

    test("Product Verifier 002 - Sees Product Description after Valid Login", async () => {
        const v = await p.productVisibility(p.productDescriptionLocator)
        expect(v).toEqual(6)
    })

    test("Product Verifier 003 - Sees Product Price after Valid Login", async () => {
        const v = await p.productVisibility(p.productPriceLocator)
        expect(v).toEqual(6)
    })
})