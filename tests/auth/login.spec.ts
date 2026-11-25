// import { LoginPage } from "@pages/LoginPage";
// import { test, expect } from "@playwright/test";

// test("check login", async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   loginPage.
//   // await page.goto("https://hyderabad.goadventure.in/admin");
//   await page.goto("https://hyderabad.goadventure.in/admin/login");
//   await page.getByRole("textbox", { name: "Phone number" }).click();
//   await page.getByRole("textbox", { name: "Phone number" }).fill("9553322717");
//   await page.getByRole("textbox", { name: "Password" }).click();
//   await page.getByRole("textbox", { name: "Password" }).click();
//   await page.getByRole("textbox", { name: "Password" }).fill("Admin@1234");
//   await page.getByRole("textbox", { name: "Password" }).press("Enter");
//   await expect(page).toHaveTitle("GoHyderabad Admin");
// });

import { test, expect } from '@fixtures/web.fixture';
import { env } from '@config/env';

test('check login', async ({ loginPage, page }) => {
  if (!env.adminPhone || !env.adminPassword) {
    throw new Error('ADMIN_PHONE and ADMIN_PASSWORD must be configured in .env');
  }

  await loginPage.open();
  await loginPage.login(env.adminPhone, env.adminPassword);

  await expect(page).toHaveTitle('GoHyderabad Admin');
});
