import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../tests/login.spec';
import path from 'path';

export interface AllPages {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
}
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

export const test = base.extend<AllPages>({
    loginPage: async ({ page, request, context }, use) => {
        const res = await request.post('https://api.saucedemo.com', {
            data: {
                email: users.standardUser.login,
                password: users.standardUser.password,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const responseBody: {
          access_token: string;
          token_type: string;
          expires_in: number;
        } = await res.json();
        await page.context().storageState({ path: authFile });
        const loginPage = new LoginPage(page);

        use(loginPage);
        
        await page.close();

    },
    inventoryPage: ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        use(inventoryPage);
    },
});

