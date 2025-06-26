// page-objects/LoginPage.ts
import { type Locator, type Page } from '@playwright/test';
import { VALID_USER } from '../test-data/users';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[type="submit"][value="Log In"]');
    this.errorMessage = page.locator('.error');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username = VALID_USER.username, password = VALID_USER.password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}