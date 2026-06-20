import { test, expect } from "@playwright/test";
import { forms } from "../page_objects/form_submission";

test.describe("Submission Forms Testing", () => {
  let f: forms

  test.beforeEach(async ({page}) => {
    f = new forms(page)
    await f.navigate();
  })

  test("Complete Information", async ({ page }) => {
    await f.placeholderInformation(
      "Mach",
      "galopemach@gmail.com",
      "09659637179",
      "2026-05-12",
      "./upload/jack.txt",
    );
    await f.radioButtonCheck("Red");
    await f.locatorInformation(["Pasta", "Pizza"], "Andorra");
    await f.completeInformation();
  });

  test("Blank Information", async ({ page }) => {
    await f.submitForm();
    await f.blankInformation();
  });

  test("Email Verification", async ({ page }) => {
    //Wrong Format
    await f.placeholderInformation(
      "Mach",
      "galopemachgmail.com",
      "09659637179",
      "2026-05-12",
      "./upload/jack.txt",
    );
    await f.locatorInformation(["Pasta", "Pizza"], "Andorra");
    await f.submitForm();
    await f.emailInvalidFormat(
      "Please include an '@' in the email address. 'galopemachgmail.com' is missing an '@'.",
    );

    //Blank Email
    await f.placeholderInformation(
      "Mach",
      "",
      "09659637179",
      "2026-05-12",
      "./upload/jack.txt",
    );
    await f.locatorInformation(["Pasta", "Pizza"], "Andorra");
    await f.submitForm();
    await f.noEmail();
  });
});
