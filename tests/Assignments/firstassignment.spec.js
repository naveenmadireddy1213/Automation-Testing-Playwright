import { test, expect } from '@playwright/test'

test("Register, Login and find First product", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.getByText('Register here').click();

    await page.locator('#firstName').fill('Playwright');

    await page.locator('#lastName').fill('Tester');

    const emailId = `automation${Math.floor(Math.random() * 10000)}@example.com`;
    const password = 'Test12345!';

    // await page.locator('#userEmail').fill('automation${Math.floor(Math.random() * 10000)}@example.com');
    // Change ' ' to ` `
    await page.locator('#userEmail').fill(emailId);

    await page.locator('#userMobile').fill('9876543210');

    await page.locator('select[formcontrolname="occupation"]').selectOption('Engineer');

    await page.locator('[value="Male"]').click();

    await page.locator('#userPassword').fill(password);

    await page.locator('#confirmPassword').fill(password);

    await page.locator('input[type="checkbox"]').click();

    await page.locator('input[value="Register"]').click();

    await page.getByRole('button', { name: 'Login' }).click();

    await page.locator('#userEmail').fill(emailId);

    await page.locator('#userPassword').fill(password);

    await page.locator('#login').click();

    const allProducts = page.locator('.card-body > h5 > b')

    // await page.waitForLoadState("networkidle");
    await allProducts.last().waitFor();

    console.log(await allProducts.allTextContents());

    const expectedProducts = ['ZARA COAT 3', 'ADIDAS ORIGINAL', 'iphone 13 pro'];

    await expect(allProducts).toHaveText(expectedProducts);


})