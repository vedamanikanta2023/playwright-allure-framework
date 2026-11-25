import { expect, test } from '@playwright/test';
import { InventoryPage } from '../../src/web/pages/InventoryPage';
import { LoginPage } from '../../src/web/pages/LoginPage';

test.describe('SauceDemo login', () => {
  test('a standard user can log in @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('invalid credentials show an error @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('invalid_user', 'wrong_password');

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });
});
