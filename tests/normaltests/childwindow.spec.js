import { test, expect } from '@playwright/test'

test('handling child window', async ({ context, page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator('#username');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator('.blinkingText').click()
    ]);

    await newPage.waitForLoadState();

    const newPageElement = newPage.locator('p.im-para.red');

    const fullText = await newPageElement.textContent();

    await expect(newPageElement).toHaveText('Please email us at mentor@rahulshettyacademy.com with below template to receive response')

    const emailId = fullText.split('at ')[1].split(' ')[0];

    await userName.fill(emailId);

    //if we want to print enetered email we can use inputvalue method, because it is not attached to the dom.

    console.log(await userName.inputValue())

    await expect(userName).toHaveValue(emailId)

})