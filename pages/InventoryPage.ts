import { Locator, Page } from "@playwright/test";

export class BasePage {
    page: Page;
    url;

    constructor(page: Page){
        this.page = page;
    }

    navigate() {
        return this.page.goto(this.url);
    }
}

// extends BasePage
export class InventoryPage extends BasePage {
    url = '/inventory'
    title: Locator;
    cartLink: Locator;

    constructor(page: Page){
        super(page);
        this.title = this.page.getByTestId('title');
        this.cartLink = this.page.getByTestId('shopping-cart-link');
    }
}
