import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly cartBadge: Locator;
  private readonly cartLink: Locator;
  private readonly items: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.items = page.getByTestId('inventory-item');
  }

  /** "Sauce Labs Backpack" -> "sauce-labs-backpack" */
  private slug(productName: string): string {
    return productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async addToCart(productName: string): Promise<void> {
    await this.page.getByTestId(`add-to-cart-${this.slug(productName)}`).click();
  }

  async addProductsToCart(productNames: string[]): Promise<void> {
    for (const name of productNames) {
      await this.addToCart(name);
    }
  }

  async getInventoryCount(): Promise<number> {
    return this.items.count();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
