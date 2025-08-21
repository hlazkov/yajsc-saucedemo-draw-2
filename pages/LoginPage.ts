import { Locator, Page } from "@playwright/test";
import { BasePage } from "./InventoryPage";

// extends BasePage
export class LoginPage extends BasePage {
    url = '';
    
    loginInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;

    constructor(page: Page){
        super(page);
        this.loginInput = this.page.getByTestId("username");
        this.passwordInput = this.page.getByTestId("password");
        this.loginButton = this.page.getByTestId("login-button");
    }

}