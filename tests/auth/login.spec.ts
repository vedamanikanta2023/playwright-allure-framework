import { test, expect } from "@fixtures/web.fixture";
import { env } from "@config/env";

test("check login", async ({ loginPage, page }) => {
  if (!env.adminPhone || !env.adminPassword) {
    throw new Error(
      "ADMIN_PHONE and ADMIN_PASSWORD must be configured in .env",
    );
  }

  await loginPage.open();
  await loginPage.login(env.adminPhone, env.adminPassword);

  await expect(page).toHaveTitle("GoHyderabad Admin");
  await page.screenshot({ path: "./screenshots/passed/screenshot.png" });
});
