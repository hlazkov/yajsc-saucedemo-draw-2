import { test, expect } from '@playwright/test';

export const users = {
  standardUser: {
    login: 'standard_user',
    password: 'secret_sauce',
  },
  problemUser: {
    login: 'problem_user',
    password: 'secret_sauce',
  }
}

test('Login positive scenario with standard user', async ({ page }) => {
  await page.goto('');
  await page.getByTestId('username').fill(users.standardUser.login);
  await page.getByTestId('password').fill(users.standardUser.password);
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('title')).toBeVisible();
  await expect(page.getByTestId('shopping-cart-link')).toBeVisible();
});

test('Login negative scenario with standard user', async ({ page }) => {
  await page.goto('');
  await page.locator('[data-test="username"]').fill(users.standardUser.login);
  await page.locator('[data-test="password"]').fill('wrong_password');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="title"]')).not.toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-link"]')).not.toBeVisible();
});
