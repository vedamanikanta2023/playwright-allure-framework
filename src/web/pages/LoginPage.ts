import { Page } from '@playwright/test';
import { loginLocators } from '../locators/login.locators';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly locators: ReturnType<typeof loginLocators>;

  constructor(page: Page) {
    super(page);
    this.locators = loginLocators(page);
  }

  async open(): Promise<void> {
    await this.goto('/admin/login');
  }

  async login(phone: string, password: string): Promise<void> {
    await this.locators.phoneInput.fill(phone);
    await this.locators.passwordInput.fill(password);
    await this.locators.passwordInput.press('Enter');
  }
}