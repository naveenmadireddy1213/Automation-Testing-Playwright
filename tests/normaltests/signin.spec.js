import { test, expect } from "@playwright/test"

test("invalid credentials", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")

    await page.locator("#username").fill("rahulshetty");

    //   await page.fill("#username", "rahulshetty") old way

    await page.locator("[type='password']").fill("learning");

    await page.locator("#signInBtn").click();

    const errorMessage = page.locator(".alert.alert-danger.col-md-12");

    await expect(errorMessage).toBeVisible();

    expect(errorMessage).toContainText("Incorrect username/password.")

})

test("login with valid credetials", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    const differentPhoneProducts =  page.locator(".card-body a");

    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("learning");
     await page.locator("#terms").click();
    await page.locator("#signInBtn").click();
    await expect(page).toHaveTitle("ProtoCommerce");
    
    //if we want to click on one product there are multiple ways:
    //await page.locator(".card-body a").first().textContent();
   console.log(await differentPhoneProducts.nth(1).textContent());

   //JavaScript way 
   const allPhoneNames = await differentPhoneProducts.allTextContents();
   expect(allPhoneNames).toEqual(['iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry']);

   //playwright way:

   await expect(differentPhoneProducts).toHaveText(['iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry'])

    await page.locator("app-card")
              .filter({hasText: "Blackberry"})
              .locator(".btn")
              .click();

})