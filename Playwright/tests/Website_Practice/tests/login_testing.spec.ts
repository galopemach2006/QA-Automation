import { test, expect } from "@playwright/test";
import { loginPage } from "../page_objects/login_page";

test.describe("Testing Login", () => {
  let login: loginPage

  test.beforeEach(async ({page}) => {
    login = new loginPage(page)
    login.navigate()
  })

  test("Both Correct Credentials", async () => {
    await login.email_password("qa_testers@qabrains.com", "Password123");
    await login.bothCredentialsTrue();
  });

  test("Wrong Email", async () => {
    await login.email_password("qa_testers@qabrains", "Password123");
    await login.wrongEmail();
  });

  test("Wrong Password", async () => {
    await login.email_password("qa_testers@qabrains.com", "Password");
    await login.wrongPassword();
  });

  test("Both Wrong Credentials", async () => {
    await login.email_password("qa_testers@qabrains", "Password");
    await login.bothCredentialsFalse();
  });

  test("Blank Email", async () => {
    await login.email_password("", "Password123");
    await login.emailBlank();
  });

  test("Blank Password", async () => {
    await login.email_password("qa_testers@qabrains.com", "");
    await login.passwordBlank();
  });
});
