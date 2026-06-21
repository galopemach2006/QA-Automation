import { test, expect } from "@playwright/test";
import { forms } from "../page-objects/form_submission";
import forms_data from "../test-data/forms_data.json"

test.describe("Submission Forms Testing", () => {
  let f: forms  
  const data = forms_data.completeData
  const bData = forms_data.blankData
  const iData = forms_data.invalidData
  const testData = Object.assign({}, data)

  test.beforeEach(async ({page}) => {
    f = new forms(page)
    await f.navigate();
  })

  test("Complete Information", async () => {
    await f.fillInformation(data)
    await expect(f.success).toBeVisible()
  });

  test("Blank Information", async () => {
    await f.submitForm();
    await f.blankInformation();
  });

  test("Email Verification - Invalid Format", async () => {
    testData.email = iData.invalidEmail2
    await f.fillInformation(testData)
    await f.emailInvalidFormat(`Please include an '@' in the email address. '${iData.invalidEmail2}' is missing an '@'.`);
  });

  test("Email Verification - Blank Email", async () => {
    testData.email = bData.email
    await f.fillInformation(testData)
    await expect(f.page.getByText("Email is a required field")).toBeVisible()
  })

  test("Email Verification - Invalid Email", async () => {
    testData.email = iData.invalidEmail1
    await f.fillInformation(testData);
    await f.emailInvalidFormat(`Please include an '@' in the email address. '${iData.invalidEmail1}' is missing an '@'.`);
  });
});
