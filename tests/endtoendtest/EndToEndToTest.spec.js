import { test, expect } from '@playwright/test';

test('End to end to test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  const emailId = 'automation3179@example.com';

  await page.locator('#userEmail').fill(emailId);

  await page.locator('#userPassword').fill('Test12345!');

  await page.locator('#login').click();

  const products = page.locator('.card');

  const prodcutCount = await products.count();

  for (let i = 0; i < prodcutCount; i++) {
    const product = products.nth(i);

    const productName = await products.nth(i).locator('h5  b').textContent();

    if (productName === 'ADIDAS ORIGINAL') {
      await product.getByRole('button', { name: 'Add To Cart' }).click();

      await expect(page.locator("div[aria-label='Product Added To Cart']")).toContainText(
        'Product Added To Cart'
      );

      break;
    }
  }

  await page.getByRole('button', { name: 'Cart 1' }).click();

  await expect(page.locator("div[class='cartSection'] h3")).toHaveText('ADIDAS ORIGINAL');

  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.waitForLoadState('networkidle');

  const shippingEmail = page.locator('.user__name input').first();

  // Verify it contains the correct pre-filled email
  await expect(shippingEmail).toHaveValue(emailId);

  // If you must re-fill it:
  await shippingEmail.fill(emailId);

  await page.locator('[placeholder*=Country]').pressSequentially('ind');

  await page.locator('.ta-results').waitFor();

  const countries = page.locator('.ta-results button');

  for (let index = 0; index < (await countries.count()); index++) {
    const element = countries.nth(index);

    const productName = await element.textContent();

    if (productName.trim() === 'India') {
      await element.click();
      break;
    }
  }

  await page.locator('.action__submit').click();

  expect(await page.locator('.hero-primary').textContent()).toEqual(' Thankyou for the order. ');

  const oId = await page.locator('label.ng-star-inserted').textContent();

  const orderId = oId.replaceAll('|', '').trim();

  await page.locator('label[routerlink*=myorders]').click();

  await page.locator('h1.ng-star-inserted').waitFor();

  console.log(await page.locator('h1.ng-star-inserted').textContent());

  const allOrderIds = page.locator('.ng-star-inserted > th');

  // Get the count correctly
  const count = await allOrderIds.count();

  for (let index = 0; index < count; index++) {
    const idElement = allOrderIds.nth(index); // Use .nth()
    const currentIdValue = await idElement.textContent(); // Must await text

    if (currentIdValue.trim() === orderId) {
      console.log('Match found! Traversal starting...');

      //  MOVE UP to the parent row, then MOVE DOWN to the button
      //'tr' is the parent of the 'th' we just found

      // Replace lines 81-99 with this:
      const targetRow = page.locator('tr').filter({ hasText: orderId });

      // Click the "View" button specifically within that row
      await targetRow.getByRole('button', { name: 'View' }).click();

      // await allOrderIds.nth(index).locator('tr').locator('td').locator('button.btn-primary').click();

      break;
    }
  }

  expect(await page.locator('.tagline').textContent()).toEqual('Thank you for Shopping With Us');

  expect(await page.locator('.col-text.-main').textContent()).toEqual(orderId);
});
