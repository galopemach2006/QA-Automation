import { test, expect } from "@playwright/test";
import { loginPage } from "../page-objects/login_page";
import login_data from "../test-data/login_data.json"

test.describe("Testing Login", () => {
  let login: loginPage
  let c = login_data.differentCredentials

  test.beforeEach(async ({page}) => {
    login = new loginPage(page)
    await page.goto("https://practice.qabrains.com/")
  })  

  test("Both Correct Credentials", async () => {
    await login.email_password(c.rightEmail, c.rightPassword);
    await expect(login.successHeader).toBeVisible()
  });

  test("Wrong Email", async () => {
    await login.email_password(c.wrongEmail, c.rightPassword);
    await expect(login.wrongEmailError).toBeVisible()
  });

  test("Wrong Password", async () => {
    await login.email_password(c.rightEmail, c.wrongPassword);
    await expect(login.wrongPasswordError).toBeVisible()
  });

  test("Both Wrong Credentials", async () => {
    const c = login_data.differentCredentials.bothWrongCredentials
    await login.email_password(c.email, c.password);
    await expect(login.bothCredentialsError).toBeVisible()
  });

  test("Blank Email", async () => {
    await login.email_password(c.blankEmail, c.rightPassword);
    await expect(login.requiredEmail).toBeVisible()
  });

  test("Blank Password", async () => {
    await login.email_password(c.rightEmail, c.blankPassword);
    await expect(login.requiredPassword).toBeVisible()
  });
});
