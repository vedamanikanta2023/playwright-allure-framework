import { expect, test } from '@playwright/test';
import { CartPage } from '../../src/web/pages/CartPage';
import { InventoryPage } from '../../src/web/pages/InventoryPage';
import { LoginPage } from '../../src/web/pages/LoginPage';

test('a user can add a product to the shopping cart @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await test.step('Log in to SauceDemo', async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.title).toHaveText('Products');
  });

  await test.step('Add a product and verify it in the cart', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.openCart();
    await expect.poll(() => cartPage.getItemNames()).toEqual(['Sauce Labs Backpack']);
  });
});
