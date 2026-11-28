import { test as base, expect } from '@playwright/test';
import { LoginPage } from "@pages/LoginPage";
import { CreateEvent } from '@pages/CreateEvent';

type WebFixtures = {
  loginPage: LoginPage;  
  createEvent: CreateEvent;
   loggedInAdmin: void;
 // ...your other fixtures
};

export const test = base.extend<WebFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  createEvent: async ({ page }, use) => use(new CreateEvent(page)),

  loggedInAdmin: async ({ page }, use) => {
    await page.goto('/admin');
    await expect(page).toHaveTitle('GoHyderabad Admin');
    await expect(page.getByRole('link', { name: 'New event' })).toBeVisible();
    await use();
  },
});

export { expect };