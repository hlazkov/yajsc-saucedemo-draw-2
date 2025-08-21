import { expect } from '@playwright/test';
import { test } from '../fixtures/auth.fixture';

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

test('Login positive scenario with standard user', async ({ loginPage, inventoryPage }) => {
  await loginPage.navigate();
  await loginPage.loginInput.fill(users.standardUser.login);
  await loginPage.passwordInput.fill(users.standardUser.password);
  await loginPage.loginButton.click();

  await expect(inventoryPage.title).toBeVisible();
  await expect(inventoryPage.cartLink).toBeVisible();
});

test('Login negative scenario with standard user', async ({ page }) => {
  await page.goto('');
  await page.locator('[data-test="username"]').fill(users.standardUser.login);
  await page.locator('[data-test="password"]').fill('wrong_password');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="title"]')).not.toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-link"]')).not.toBeVisible();
});
 
 // Generics:

const myFunction = <T, U>(myArgument: number | T): {value: number | T, date: Date} => {
  return {value: myArgument, date: new Date()};
}

class Box <T extends Animal<any>> {
  private animal: T;

  constructor(animal: T) {
    this.animal = animal;
  }

  getContent(): T {
    return this.animal;
  }

  triggerInteraction() {
    return this.animal.interact();
  }
}

abstract class Animal <T> {
  abstract saySomething();
  abstract interact(): Promise<T>;
}

class Dog extends Animal <string> {
  saySomething() {
    return "WoooF!";
  }
  interact(): Promise<string> {
    return Promise.resolve("I'm walking");
  }
}

class Cat extends Animal <number> {
  saySomething() {
    return "Meow!";
  }
  interact() {
    return Promise.resolve(4);
  }
}

const myBox = new Box(new Cat());
const myBox2 = new Box(new Dog());

myBox.getContent().saySomething(); // "Meow!"
myBox2.getContent().saySomething(); //"WoooF!"

myBox.getContent().interact(); // 4
myBox2.getContent().interact(); // "I'm walking"

myBox2.triggerInteraction();  // "I'm walking"

// const myBox3 = new Box("I'm a Cat"); // Error Argument of type 'string' is not assignable to parameter of type 'Animal<any>'.ts(2345)
