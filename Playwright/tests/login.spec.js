const { test, expect } = require('@playwright/test');

test('Youtube title test', async ({ page }) => {
    await page.goto('https://www.youtube.com');

    await expect(page).toHaveTitle(/YouTube/);
});