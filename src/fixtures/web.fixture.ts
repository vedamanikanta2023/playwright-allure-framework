import { test as base, expect } from '@playwright/test';
import { LoginPage } from "@pages/LoginPage";

type WebFixtures = {
  loginPage: LoginPage;   // add this line
  // ...your other fixtures
};

export const test = base.extend<WebFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  // ...
});

export { expect };