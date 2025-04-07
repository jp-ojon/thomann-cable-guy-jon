import { Locator, Page } from "@playwright/test"

export class CablesAndPlugsPage {
    page: Page;
    categoryGridImage: Locator;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Click on a Category Grid Image based on the the attribute "alt" Text value. Wait for it to be visible before performing action.
     * @param value 
     */
    async clickCategoryGridImage(value: string) {
        this.categoryGridImage = this.page.locator(`img[alt="${value}"]`);
        await this.categoryGridImage.waitFor({ state: 'visible' })
        await this.categoryGridImage.click();
        await this.page.waitForLoadState('networkidle');
    }
}