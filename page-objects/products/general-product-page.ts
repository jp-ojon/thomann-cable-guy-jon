import { Locator, Page } from "@playwright/test"

export class GeneralProductPage {
    page: Page;
    readonly mainProductTitle: Locator;
    readonly addToBasketButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainProductTitle = this.page.locator('div.fx-content-product__main.product-title h1');
        this.addToBasketButton = this.page.locator('button[type="submit"]:has-text("Add to Basket")');
    }

    /**
     * Click on Add To Basket Button. Wait for it to be visible before performing action.
     */
    async clickAddToBasketButton() {
        await this.addToBasketButton.waitFor({ state: 'visible' })
        await this.addToBasketButton.click();
        await this.page.waitForLoadState('load');
    }
}