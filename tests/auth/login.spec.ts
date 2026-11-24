import { test, expect } from '@fixtures/base.fixture';
import { loadTestData } from '@utils/dataLoader';
import { applyAllureMeta } from '@utils/allureHelper';
import { UsersData } from '@types-app/testData.types';

const { validUsers, invalidUsers } = loadTestData<UsersData>('users.json');

test.describe('Login', () => {
  for (const data of validUsers) {
    test(`${data.id}: ${data.description} @smoke @regression`, async ({ loginPage, inventoryPage }) => {
      await applyAllureMeta({
        epic: 'Authentication',
        feature: 'Login',
        story: 'Successful login',
        severity: 'blocker',
        testId: data.id,
      });

      await test.step('Open login page', () => loginPage.open());
      await test.step(`Log in as "${data.username}"`, () => loginPage.login(data.username, data.password));

      await test.step('Verify inventory page is displayed', async () => {
        await expect(inventoryPage.title).toHaveText('Products');
        expect(await inventoryPage.getInventoryCount()).toBeGreaterThan(0);
      });
    });
  }

  for (const data of invalidUsers) {
    test(`${data.id}: ${data.description} @regression`, async ({ loginPage }) => {
      await applyAllureMeta({
        epic: 'Authentication',
        feature: 'Login',
        story: 'Failed login',
        severity: 'critical',
        testId: data.id,
      });

      await test.step('Open login page', () => loginPage.open());
      await test.step('Submit invalid credentials', () => loginPage.login(data.username, data.password));

      await test.step('Verify error message', async () => {
        await expect(loginPage.errorMessage).toHaveText(data.expectedError);
      });
    });
  }
});
