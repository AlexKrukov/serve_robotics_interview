import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  usernameInput = () => this.page.locator('#user-name');
  passwordInput = () => this.page.locator('#password');
  loginButton = () => this.page.locator('#login-button');

  /*
    Login as a user with the provided username and password, then wait for the page to load completely.
  */
  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
    await this.page.waitForLoadState('load');
  }
}