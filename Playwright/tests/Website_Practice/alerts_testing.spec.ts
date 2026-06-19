import {test, expect} from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.qa-practice.com/elements/alert/alert');
  await page.getByRole('link', { name: 'Alerts' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'Click' }).click();
});