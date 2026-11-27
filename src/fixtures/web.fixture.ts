import { test as base, expect } from '@playwright/test';
import { LoginPage } from "@pages/LoginPage";
import { CreateEvent } from '@pages/CreateEvent';
import { env } from "@config/env";

type WebFixtures = {
  loginPage: LoginPage;  
  createEvent: CreateEvent;
   loggedInAdmin: void;
 // ...your other fixtures
};

export const test = base.extend<WebFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  createEvent: async ({ page }, use) => use(new CreateEvent(page)),

  loggedInAdmin: async ({ loginPage, page }, use) => {
    if (!env.adminPhone || !env.adminPassword) {
      throw new Error(
        "ADMIN_PHONE and ADMIN_PASSWORD must be configured in .env",
      );
    }

    await loginPage.open();
    await loginPage.login(env.adminPhone, env.adminPassword);
    await expect(page).toHaveTitle('GoHyderabad Admin');
    await use();
  },
});

export { expect };