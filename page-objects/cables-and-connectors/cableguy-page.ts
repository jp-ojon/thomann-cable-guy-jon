import { Locator, Page } from "@playwright/test"
import { waitForResponseAndNetworkIdle, waitForItemCountToBeLessThan } from '../../utilities/general-utilities';

export class CableguyPage {
    page: Page;
    readonly cableBeginningButton: Locator;
    readonly cableEndButton: Locator;
    readonly cableType: Locator;
    readonly plugType: Locator;
    readonly brandsSection: Locator;
    readonly manufacturerBrandsItem: Locator;
    readonly articlesList: Locator;
    readonly productsListEntry: Locator;

    manufacturerBrandsItemTotalCount: number;
    manufacturerBrandsItemElementCount: number;
    productsListEntryElementAllTextContents: any;
    productsListEntryElementHref: string;

    constructor(page: Page) {
        this.page = page;
        this.cableBeginningButton = this.page.locator('button.cg-plugButton--left');
        this.cableEndButton = this.page.locator('button.cg-plugButton--right');
        this.cableType = this.page.locator('div.cg-plugmodal__category__item:not(.inactive)');
        this.plugType = this.page.locator('div.cg-plugItem');
        this.brandsSection = this.page.locator('div.cg-brands.cg-section');
        this.manufacturerBrandsItem = this.brandsSection.locator('div.item');
        this.articlesList = this.page.locator('div.cg-articles-list');
        this.productsListEntry = this.articlesList.locator('div.fx-product-list-entry');
    }

    /**
     * Click on Cable Beginning Button. Wait for it to be visible before performing action.
     */
    async clickCableBeginningButton() {
        await this.cableBeginningButton.waitFor({ state: 'visible' })
        await this.cableBeginningButton.click();
    }

    /**
     * Click on Cable End Button. Wait for it to be visible before performing action.
     */
    async clickCableEndButton() {
        await this.cableEndButton.waitFor({ state: 'visible' })
        await this.cableEndButton.click();
    }

    /**
     * Selects and returns a random element from the list of available elements found for a certain locator
     * Useful for testing scenarios that require non-deterministic selection of many elements
     * @returns one element of randomIndex from a list of many elements
     */
    async getRandomElement(locatorGroup: Locator): Promise<Locator> {
        const count = await locatorGroup.count();
        const randomIndex = Math.floor(Math.random() * count);
        return locatorGroup.nth(randomIndex);
    }
    
    /**
     * Click on the selected cable type. Wait for it to be visible before performing action. Printout its text content.
     * @param cableTypeElement 
     */
    async clickCableType(cableTypeElement: Locator): Promise<void> {
        await cableTypeElement.waitFor({ state: 'visible' });
        await cableTypeElement.click();
        const text = await cableTypeElement.textContent();
        console.log(`Clicked on Cable Type: ${text?.trim()}`);
    }

    /**
     * Click on a random Cable Type from many cable types available
     */
    async clickRandomCableType(): Promise<void> {
        const cableTypeElement = await this.getRandomElement(this.cableType);
        await this.clickCableType(cableTypeElement);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Click on the selected plug type. Wait for it to be visible before performing action. Printout its text content.
     * @param plugTypeElement 
     */
    async clickPlugType(plugTypeElement: Locator): Promise<void> {
        await plugTypeElement.waitFor({ state: 'visible' });
        const subheadline = plugTypeElement.locator('div.cg-plugItem__subheadline');
        const subheadlineText = await subheadline.textContent();
        console.log(`Clicked on Plug Type: ${subheadlineText}`);
        await plugTypeElement.click();
    }

    /**
     * Click on a random Plug Type from many plug types available. Also update avaialble Manufacturer Brands Item Total Count for tracking purposes.
     */
    async clickRandomPlugType(): Promise<void> {
        const plugTypeElement = await this.getRandomElement(this.plugType);
        await this.clickPlugType(plugTypeElement);
        await waitForResponseAndNetworkIdle(this.page);
        await this.updateManufacturerBrandsItemTotalCount();
    }  

    /**
     * Method to keep track of currently available Manufacturer Brands Item for selection. To be used for polling and verifying if count changes.
     */
    async updateManufacturerBrandsItemTotalCount(): Promise<void> {
        this.manufacturerBrandsItemTotalCount = await this.manufacturerBrandsItem.count();
        console.log(`Total Manufacturer Brands available for selection: ${this.manufacturerBrandsItemTotalCount}`);
    }

    /**
     * Method to wait for network to idle and keep on polling until Manufacturer Brands Item for selection decreases in count after some time.
     */
    async waitForManufacturerBrandsSectionUpdate(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await waitForItemCountToBeLessThan(this.manufacturerBrandsItem, this.manufacturerBrandsItemTotalCount);
    }

    /**
     * Use if a specific cable type is to be selected. Wait for it to be visible before performing action.
     * @param value 
     */
    async clickSpecificCableType(value: string) {
        const cableTypeElement = this.cableType.filter({ hasText: `${value}` });
        await cableTypeElement.waitFor({ state: 'visible' });
        await cableTypeElement.click();
    }

    /**
     * Use if a specific plug type is to be selected. Wait for it to be visible before performing action.
     * @param value 
     */
    async clickSpecificPlugType(value: string) {
        const plugTypeElement = this.plugType.filter({ hasText: `${value}` });
        await plugTypeElement.waitFor({ state: 'visible' });
        await plugTypeElement.click();
        await waitForResponseAndNetworkIdle(this.page);
    }

    /**
     * Click on the selected manufacturer brand item. Wait for it to be visible before performing action.
     * Printout and/or store its text content and the number indicated below the manufacturer’s logo. 
     * @param brandItem 
     */
    async clickManufacturerBrand(brandItem: Locator): Promise<void> {
        await brandItem.waitFor({ state: 'visible' });
        const altText = await brandItem.locator('div.cg-brands__item img').getAttribute('alt');
        console.log(`Clicked on Manufacturer Brand: ${altText}`);
        await brandItem.click();

        //Store count to validate that the number of products displayed matches the expected number indicated below the manufacturer’s logo.
        const countText = await brandItem.locator('div.cg-brands__item__count').textContent();
        this.manufacturerBrandsItemElementCount = countText ? parseInt(countText, 10) : 0;
        console.log(`Clicked on Manufacturer Brand Count: ${this.manufacturerBrandsItemElementCount}`);
    }

    /**
     * Click on a random Manufacturer Brand Item from many Manufacturer Brand Items available. Also wait for API to finish successfully and network to idle.
     */
    async clickRandomManufacturerBrandsItem(): Promise<void> {
        await this.waitForManufacturerBrandsSectionUpdate();
        const brandItem = await this.getRandomElement(this.manufacturerBrandsItem);
        await this.clickManufacturerBrand(brandItem);
        //Wait for API Request to finish successfully and network to be idle
        await waitForResponseAndNetworkIdle(this.page);
    }

    /**
     * Extract details and href value of a selected product entry from the list of all available displayed product entries. To be used for verification later.
     * @param entryElement 
     */
    async extractProductEntryDetails(entryElement: Locator): Promise<void> {
        const details = entryElement.locator('div.product__details');
        await details.waitFor({ state: 'visible' });
        this.productsListEntryElementAllTextContents = await details.allInnerTexts(); //Store text contents for verification later

        const imageLink = entryElement.locator('a.product__image');
        this.productsListEntryElementHref = (await imageLink.getAttribute('href')) || ''; //Store href value for verification later. Empty string instead of null in case href is empty.

        console.log(`Clicked on Product Entry: ${this.productsListEntryElementAllTextContents}`);
        console.log(`Href: ${this.productsListEntryElementHref}`);
    }

    /**
     * Click on the product entry element. Wait for it to be visible before performing action. Calls method extractProductEntryDetails.
     * @param entryElement 
     */
    async clickProductEntry(entryElement: Locator): Promise<void> {
        await entryElement.waitFor({ state: 'visible' });
        await this.extractProductEntryDetails(entryElement);
        await entryElement.click();
    }

    /**
     * Click on a random products list entry from many product list entries available.
     */
    async clickRandomProductsListEntry(): Promise<void> {
        const entry = await this.getRandomElement(this.productsListEntry);
        await this.clickProductEntry(entry);
    }
}