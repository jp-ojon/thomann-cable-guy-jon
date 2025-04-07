import { Page, Locator } from 'playwright';

/**
 * Utility function to wait for a specific network response and wait for the page to reach network idle state
 * @param page 
 */
export async function waitForResponseAndNetworkIdle(page: Page): Promise<void> {
    // Wait for the response where the URL contains "cableguy_ajax.html" and has status 200
    await page.waitForResponse(response =>
        response.url().includes('cableguy_ajax.html') && response.status() === 200
    );

    // Wait for the page to reach network idle state
    await page.waitForLoadState('networkidle');
};

/**
 * Utility function to keep on polling to verify if manufacturer Brands Item Current Count is changing or decreasing with respect to the manufacturer Brands Item Total Count
 * @param manufacturerBrandsItem 
 * @param targetCount 
 */
export async function waitForItemCountToBeLessThan(
    manufacturerBrandsItem: Locator,
    targetCount: number,
) {
    const timeout = 10000; // 10 seconds
    const pollingInterval = 500;
    const stableThreshold = 5000; // 5 seconds stable equal state
    const startTime = Date.now();
    let equalStartTime: number | null = null;

    while (true) {
        const manufacturerBrandsItemCurrentCount = await manufacturerBrandsItem.count();
        console.log(manufacturerBrandsItemCurrentCount);

        if (manufacturerBrandsItemCurrentCount < targetCount) {
            break;
        }

        if (manufacturerBrandsItemCurrentCount === targetCount) {
            if (equalStartTime === null) {
                equalStartTime = Date.now();
            } else if (Date.now() - equalStartTime >= stableThreshold) {
                console.log(`Count has been stable at ${manufacturerBrandsItemCurrentCount} for ${stableThreshold}ms, continue execution`);
                break;
            }
        } else {
            // reset timer if count changes
            equalStartTime = null;
        }

        if (Date.now() - startTime > timeout) {
            throw new Error(`Timed out waiting for manufacturerBrandsItem count to be less than or equal to ${targetCount}`);
        }

        await new Promise(res => setTimeout(res, pollingInterval));
    }
}

/**
 * Utility function to keep on polling and checking if the number of products displayed matches the expected number indicated below the manufacturer’s logo.
 * @param countLocator 
 * @param expectedCount 
 * @returns true if count is equal and false if not.
 */
export async function countCheck(countLocator: any, expectedCount: number): Promise<boolean> {
    const startTime = Date.now();
    const timeout = 10000; // 10 seconds
    const pollingInterval = 500;

    while (Date.now() - startTime < timeout) {
        const actualCount = await countLocator.count();
        console.log(`Checking count, actual: ${actualCount}, expected: ${expectedCount}`);

        if (actualCount === expectedCount) {
            return true; // Condition met, exit function
        }

        // Wait for the specified interval before retrying
        await new Promise(resolve => setTimeout(resolve, pollingInterval));
    }

    // If we exit the loop, the condition was not met in the allowed time
    throw new Error(`Expected count ${expectedCount} but got ${await countLocator.count()}`);
}


