import { expect, test } from '@playwright/test';
import { CartPage } from '../../src/web/pages/CartPage';
import { CheckoutPage } from '../../src/web/pages/CheckoutPage';
import { InventoryPage } from '../../src/web/pages/InventoryPage';
import { LoginPage } from '../../src/web/pages/LoginPage';

test('a user can complete a purchase @smoke @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await test.step('Log in and add a product', async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.title).toHaveText('Products');
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
  });

  await test.step('Enter customer details and place the order', async () => {
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCustomerInfo({
      firstName: 'Test',
      lastName: 'Customer',
      postalCode: '10001',
    });
    await checkoutPage.finishOrder();
  });

  await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');
});
