import { test, expect } from '@playwright/test'


test("first test but navigate to new page and assert new page title", async ({ page }) => {


    await page.goto("https://rahulshettyacademy.com/")

    await expect(page).toHaveTitle("Rahul Shetty Academy | QA Automation, Playwright, AI Testing & QA Online Training");

    // 1. Create the promise listener HERE (This was missing!)
    const popupPromise = page.waitForEvent('popup');

    await page.getByRole('link', { name: 'Browse Courses' }).click();

    const newPage = await popupPromise;

    // 4. Wait for the new page to finish loading (important!)
    await newPage.waitForLoadState();

    // 5. Assert the title of the NEW page
    await expect(newPage).toHaveTitle('Rahul Shetty Academy');

});

