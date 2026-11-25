import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }
}
