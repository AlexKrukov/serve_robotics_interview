import { expect, Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  cartInventoryItem = () => this.page.locator('[data-test="inventory-item"]');
  onesieRemoveBtn = () => this.page.locator('[data-test="remove-sauce-labs-onesie"]');

  /*
    Remove the onesie item from the cart
  */
  async removeOnesieItem() {
    await this.onesieRemoveBtn().click();
  }

  /*
    Count the number of items in the cart and verify it matches the expected count
  */
  async countCartItems(expectedCount: number): Promise<void> {
    await expect(this.cartInventoryItem()).toHaveCount(expectedCount);
  }
}