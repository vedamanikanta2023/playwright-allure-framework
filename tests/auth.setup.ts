import { Browser, expect, test as setup } from '@playwright/test';
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

async function hasValidSession(browser: Browser): Promise<boolean> {
  const context = await browser.newContext({ storageState: authFile });
  try {
    const page = await context.newPage();
    await page.goto(new URL('/admin', env.baseUrl).toString());

    // Logged in = the "New event" link appears. Anything else = session is not valid.
    return await page
      .getByRole('link', { name: 'New event' })
      .waitFor({ state: 'visible', timeout: 7_000 })
      .then(() => true, () => false);
  } finally {
    await context.close();
  }
}