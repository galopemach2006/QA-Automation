import { test, expect } from "@playwright/test";
import { forms } from "../page-objects/form_submission";
import forms_data from "../test-data/forms_data.json";

test.describe("Submission Forms Testing", () => {
  let f: forms;
  const data = forms_data.allData;

  test.beforeEach(async ({ page }) => {
      f = new forms(page);
      await f.navigate();
  });

  test.afterEach(async() => {
      console.log("Test Case Complete")
  })

  test("Complete Information", async () => {
      await f.fillInformation(data.completeData);
      await expect(f.success).toBeVisible();
  });

  test("Blank Information", async () => {
      await f.submitForm();
      await f.blankInformation();
  });

  test("Email Verification - Invalid Format", async () => {
      const newData = { ...data.completeData, email: data.invalidData.invalidEmail1 };
      await f.fillInformation(newData);
      await f.emailInvalidFormat(data.expectedMessage.jsMessage1);
  });

  test("Email Verification - Blank Email", async () => {
      const newData = { ...data.completeData, email: data.blankData.email };
      await f.fillInformation(newData);
      await expect(f.page.getByText("Email is a required field")).toBeVisible();
  });

  test("Email Verification - Invalid Email", async () => {
      const newData = { ...data.completeData, email: data.invalidData.invalidEmail2 };
      await f.fillInformation(newData);
      await f.emailInvalidFormat(data.expectedMessage.jsMessage2);
  });

  test("All Countries", async ({page}) => {
      await page.locator("select[name='country']").selectOption("Andorra");
      let allElements = await page.locator("select[name='country'] option").allTextContents()
      let countCountries = 0

      for (const e of allElements) {
        console.log("Country: " + e);
        countCountries++
      }

      console.log("\n" + "Number of Countries: " + countCountries)
    
  });
});
