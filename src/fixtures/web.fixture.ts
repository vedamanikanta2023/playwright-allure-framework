import { test as base, expect } from '@playwright/test';
import { LoginPage } from "@pages/LoginPage";
import { CreateEvent } from '@pages/CreateEvent';
import credentials from "../test-data/web/login.json";

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
    await loginPage.open();
    await loginPage.login(credentials.ADMIN_PHONE, credentials.ADMIN_PASSWORD);
    await expect(page).toHaveTitle('GoHyderabad Admin');
    await use();
  },
});

export { expect };