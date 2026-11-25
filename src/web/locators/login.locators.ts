import { Page } from '@playwright/test';

export const loginLocators = (page: Page) => ({
  phoneInput: page.getByRole('textbox', { name: 'Phone number' }),
  passwordInput: page.getByRole('textbox', { name: 'Password' }),
});