import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly itemNames: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.itemNames = page.getByTestId('inventory-item-name');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async getItemNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
