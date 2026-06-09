import { test } from '@playwright/test';
import { Credentials } from '../../test-data/Credentials';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Swag Labs Cart flow', () => {
  let login: LoginPage;
  let products: ProductsPage;
  let cart: CartPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    products = new ProductsPage(page);
    cart = new CartPage(page);

    await page.goto('/');
    await login.login(
      Credentials.standardUser.username,
      Credentials.standardUser.password
    );
  });

  test('User add and remove items from cart', async () => {
    await products.sortPriceLoHi();
    await products.addItemstoCart();
    await products.verifyCartItemsNumber('2');
    await products.openCart();
    await cart.countCartItems(2);
    await cart.removeOnesieItem();
    await cart.countCartItems(1);
    await products.verifyCartItemsNumber('1');
  });
});