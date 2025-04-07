import { Locator, Page } from "@playwright/test"

export class ShoppingBasketPage {
    page: Page;
    readonly notificationInfobox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.notificationInfobox = this.page.locator('div.fx-notification');
    }
}