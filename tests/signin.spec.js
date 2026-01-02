import { test, expect } from "@playwright/test"

test("invalid credentials", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")

    await page.locator('#username').fill("rahulshetty");

    //   await page.fill("#username", "rahulshetty") old way

    await page.locator("[type='password']").fill("learning");

    await page.locator("#signInBtn").click();

    const errorMessage = page.locator(".alert.alert-danger.col-md-12");

    await expect(errorMessage).toBeVisible();

    expect(errorMessage).toContainText("Incorrect username/password.")


})