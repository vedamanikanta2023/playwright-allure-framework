import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { loadTestData } from '../utils/dataLoader';
import { UsersData } from '../types/testData.types';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  /** Logs in with the first valid user and lands on the inventory page. */
  loggedInInventoryPage: InventoryPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),

  loggedInInventoryPage: async ({ loginPage, inventoryPage }, use) => {
    const { validUsers } = loadTestData<UsersData>('users.json');
    await loginPage.open();
    await loginPage.login(validUsers[0].username, validUsers[0].password);
    await expect(inventoryPage.title).toHaveText('Products');
    await use(inventoryPage);
  },
});

export { expect };
