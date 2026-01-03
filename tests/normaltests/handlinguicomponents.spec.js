import { test, expect } from '@playwright/test'

test("dropdowns checkbox, radiobuttons", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userRadio = page.locator('input[value="user"]');

    await expect(userRadio).not.toBeChecked();
    await userRadio.check();
    await expect(userRadio).toBeChecked();
    
})