import { Locator, Page } from "@playwright/test"

export class MainPage {
    page: Page;
    readonly acceptCookiesButton: Locator;
    categoriesListItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.acceptCookiesButton = this.page.locator('button.js-accept-all-cookies');
    }

    /**
     * Optional step to click on the Accept Cookies Button if in case the cookies popup panel appears
     */
    async clickAcceptCookiesButton() {
        try {
            // Wait for the element to be visible
            await this.acceptCookiesButton.waitFor({ state: 'visible' })
            // Perform the click operation
            await this.acceptCookiesButton.click()
        } catch (error) {
            // Handle the error if the element does not appear or the click fails
            console.error('Error occurred while trying to click the element:', error)
        }
    }

    /**
     * Click on a Categories List Item based on the provided "value" (Ex. Cables, Drums, Guit/Bass). Wait for it to be visible before performing action.
     */
    async clickCategoriesListItem(value: string) {
        this.categoriesListItem = this.page.locator(`li.categories-list__item:has-text("${value}")`);
        await this.categoriesListItem.waitFor({ state: 'visible' })
        await this.categoriesListItem.click();
    }
}