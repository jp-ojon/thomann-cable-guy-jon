import { test, expect, BrowserContext, Page } from '@playwright/test';
import { PageObjectsManager } from '../../page-objects/page-objects-manager'
import { baseURL } from '../../playwright.config'
import { countCheck } from '../../utilities/general-utilities';

test.describe('Cable Guy', () => {

    let context: BrowserContext;
    let page: Page;
    let testData: any; //for storing data from testdata json files.
    let matchFound: boolean; //used for general boolean match checking

    test.beforeAll(async () => {
        //testData = await readJSONTestData('test-data-file.json')
    });

    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext(); // Create a new browser context
        page = await context.newPage(); // Create a new page in that context
        await page.goto(baseURL);
    });

    test.afterEach(async () => {
        await context.close(); // Ensure the context is closed after each test
    });

    test('Test #1: Cable Guy filtering - Happy Path', async () => {
        const pom = new PageObjectsManager(page);

        //Optional Step/s
        await pom.mainPage.clickAcceptCookiesButton();

        //Pre-requisite Step/s: Navigate to Cable Guy page
        await pom.mainPage.clickCategoriesListItem('Cables');
        await pom.cablesAndPlugsPage.clickCategoryGridImage('CableGuy');

        //○ Step 1:
        //■ Click on the "Cable Beginning" section.
        //■ Select a random Cable Type and then the random Cable.
        await pom.cableguyPage.clickCableBeginningButton();
        await pom.cableguyPage.clickRandomCableType();
        await pom.cableguyPage.clickRandomPlugType();

        //○ Step 2:
        //■ Click on the "Cable End" section.
        //■ Select another random Cable Type and then random Cable.
        await pom.cableguyPage.clickCableEndButton();
        await pom.cableguyPage.clickRandomCableType();
        await pom.cableguyPage.clickRandomPlugType();

        /* Use if a specific cable type and plug type is to be selected
        await pom.cableguyPage.clickSpecificCableType('Multicore cable');
        await pom.cableguyPage.clickSpecificPlugType('XLR-plug male (3-pol)');
        */

        //○ Step 3:
        //■ Choose a random Manufacturer from the available options.
        //■ Validate that the number of products displayed matches the expected number indicated below the manufacturer’s logo.
        await pom.cableguyPage.clickRandomManufacturerBrandsItem();
        expect(await countCheck(pom.cableguyPage.productsListEntry, pom.cableguyPage.manufacturerBrandsItemElementCount)).toBeTruthy();

        //○ Step 4:
        //■ Click on one of the products filtered by the selection.
        //■ Verify that the correct product page is opened.
        await pom.cableguyPage.clickRandomProductsListEntry();
        // Get the current URL and check if it contains the expected string
        const currentUrl = page.url();
        expect(currentUrl).toContain(pom.cableguyPage.productsListEntryElementHref);

        //Verify product page main product title 
        const mainProductTitleText = (await pom.generalProductPage.mainProductTitle.textContent())?.trim() || '';
        console.log(`Product page main product title: ${mainProductTitleText}`);
        // Check if the selected product list entry element array contains a string that includes the main product title
        matchFound = await pom.cableguyPage.productsListEntryElementAllTextContents.some(title => title.includes(mainProductTitleText));
        expect(matchFound).toBe(true);

        //○ Step 5:
        //■ Add the selected product (cable) to the shopping basket.
        //■ Verify the Basket Notification Popup for accuracy.
        await pom.generalProductPage.clickAddToBasketButton();

        // Check if the notification infobox array contains a string that includes the main product title
        const notificationMessages = await pom.shoppingBasketPage.notificationInfobox.allInnerTexts();
        console.log(`Shopping Basket notification message: ${notificationMessages}`);
        matchFound = notificationMessages.some(msg => msg.includes(mainProductTitleText));
        expect(matchFound).toBe(true);

    });

});