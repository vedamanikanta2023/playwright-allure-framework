import { test, expect } from '@fixtures/base.fixture';
import { loadTestData } from '@utils/dataLoader';
import { applyAllureMeta } from '@utils/allureHelper';
import { ProductsData } from '@types-app/testData.types';

const { checkoutScenarios } = loadTestData<ProductsData>('products.json');

test.describe('Checkout', () => {
  for (const scenario of checkoutScenarios) {
    test(`${scenario.id}: ${scenario.description} @smoke @regression`, async ({
      loggedInInventoryPage,
      cartPage,
      checkoutPage,
    }) => {
      await applyAllureMeta({
        epic: 'Shopping',
        feature: 'Checkout',
        story: 'Place an order',
        severity: 'blocker',
        testId: scenario.id,
      });

      await test.step('Add products and open cart', async () => {
        await loggedInInventoryPage.addProductsToCart(scenario.products);
        await loggedInInventoryPage.openCart();
      });

      await test.step('Proceed to checkout and enter customer details', async () => {
        await cartPage.proceedToCheckout();
        await checkoutPage.fillCustomerInfo(scenario.customer);
      });

      await test.step('Finish order', () => checkoutPage.finishOrder());

      await test.step('Verify order confirmation', async () => {
        await expect(checkoutPage.confirmationHeader).toHaveText(scenario.expectedConfirmation);
      });
    });
  }
});
