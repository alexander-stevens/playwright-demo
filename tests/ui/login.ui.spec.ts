// tests/ui/login.ui.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { INVALID_USER } from '../../test-data/users';

test.describe('ParaBank UI Login', () => {
  test('should successfully log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
    
    // Assertion: Verify we are on the Accounts Overview page
    await expect(page.locator('h1.title')).toHaveText('Accounts Overview');
  });

  test('should show an error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(INVALID_USER.username, INVALID_USER.password);
    
    // Assertion: Verify the error message is visible
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('The username and password could not be verified.');
  });
});