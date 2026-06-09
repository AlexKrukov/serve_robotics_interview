import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  sortDropDown = () => this.page.locator('[data-test="product-sort-container"]');
  fleeceJacketATCBtn = () => this.page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
  onesieATCBtn = () => this.page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');
  cartBtn = () => this.page.locator('[data-test="shopping-cart-link"]');
  cartBtnLabel = () => this.page.locator('[data-test="shopping-cart-badge"]');
  cartInventoryItem = () => this.page.locator('[data-test="inventory-item"]');
  onesieRemoveBtn = () => this.page.locator('[data-test="remove-sauce-labs-onesie"]');

  /*
    Sort the products by price from low to high
  */
  async sortPriceLoHi() {
    await this.sortDropDown().selectOption('lohi');
  }

  /*
    Scroll to the provided element if needed, then click it
  */
  async scrollToElementAndClick(element: Locator): Promise<void> {
    await element.scrollIntoViewIfNeeded();
    await element.click();
    }

  /*
    Add the fleece jacket and onesie products to the cart
  */
  async addItemstoCart() {
    await this.scrollToElementAndClick(this.fleeceJacketATCBtn());
    await this.scrollToElementAndClick(this.onesieATCBtn());
  }

  /*
    Verify that the cart items number is correct
  */
  async verifyCartItemsNumber(itemsAmount: string) {
    await expect(this.cartBtnLabel()).toBeVisible();
    await expect(this.cartBtnLabel())
      .toContainText(itemsAmount);
  }

  /*
    Open the cart page
  */
  async openCart() {
    await this.cartBtn().click();
  }
}