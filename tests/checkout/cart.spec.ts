import { test, expect } from '@fixtures/base.fixture';
import { loadTestData } from '@utils/dataLoader';
import { applyAllureMeta } from '@utils/allureHelper';
import { ProductsData } from '@types-app/testData.types';

const { cartScenarios } = loadTestData<ProductsData>('products.json');

test.describe('Shopping cart', () => {
  for (const scenario of cartScenarios) {
    test(`${scenario.id}: ${scenario.description} @regression`, async ({
      loggedInInventoryPage,
      cartPage,
    }) => {
      await applyAllureMeta({
        epic: 'Shopping',
        feature: 'Cart',
        story: 'Add products to cart',
        severity: 'critical',
        testId: scenario.id,
      });

      await test.step(`Add products: ${scenario.products.join(', ')}`, () =>
        loggedInInventoryPage.addProductsToCart(scenario.products));

      await test.step('Verify cart badge count', async () => {
        await expect(loggedInInventoryPage.cartBadge).toHaveText(String(scenario.products.length));
      });

      await test.step('Open cart and verify contents', async () => {
        await loggedInInventoryPage.openCart();
        expect((await cartPage.getItemNames()).sort()).toEqual([...scenario.products].sort());
      });
    });
  }
});
