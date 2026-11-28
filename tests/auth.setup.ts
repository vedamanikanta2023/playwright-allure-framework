import { expect, test as setup } from '@playwright/test';
import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { env } from '../src/config/env';
import { LoginPage } from '../src/web/pages/LoginPage';

const authFile = path.resolve(__dirname, '../playwright/.auth/admin.json');

setup('reuse or create admin session', async ({ browser }) => {
  if (existsSync(authFile) && await hasValidSession(browser)) {
    return;
  }

  if (!env.adminPhone || !env.adminPassword) {
    throw new Error(
      'ADMIN_PHONE and ADMIN_PASSWORD must be configured in .env to create an authenticated session',
    );
  }

  await mkdir(path.dirname(authFile), { recursive: true });

  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(env.adminPhone, env.adminPassword);
    await expect(page).toHaveTitle('GoHyderabad Admin');
    await expect(page.getByRole('link', { name: 'New event' })).toBeVisible();

    await context.storageState({ path: authFile });
  } finally {
    await context.close();
  }
});

async function hasValidSession(browser: import('@playwright/test').Browser): Promise<boolean> {
  const context = await browser.newContext({ storageState: authFile });
  try {
    const page = await context.newPage();
    await page.goto(new URL('/admin', env.baseUrl).toString());

    if (await page.getByRole('textbox', { name: 'Phone number' }).isVisible()) {
      return false;
    }

    await expect(page.getByRole('link', { name: 'New event' })).toBeVisible();
    return true;
  } finally {
    await context.close();
  }
}
