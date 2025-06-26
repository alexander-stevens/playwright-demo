// tests/api/login.api.spec.ts
import { test, expect } from '@playwright/test';
import { VALID_USER, INVALID_USER } from '../../test-data/users';

test.describe('ParaBank API Login', () => {
  test('should successfully log in with valid credentials', async ({ request }) => {
    const response = await request.get(`/login.htm?username=${VALID_USER.username}&password=${VALID_USER.password}`);
    
    expect(response.status()).toBe(200);
    const responseBody = await response.text();
    expect(responseBody).toContain('Accounts Overview');
  });

  test('should fail to log in with invalid credentials', async ({ request }) => {
    const response = await request.get(`/login.htm?username=${INVALID_USER.username}&password=${INVALID_USER.password}`);
    
    const responseBody = await response.text();
    // The application still returns a 200 OK for a failed login, so we check the body
    expect(responseBody).toContain('The username and password could not be verified.');
  });
});