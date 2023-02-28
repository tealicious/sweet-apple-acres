import { test, expect } from "@playwright/test";

test("allows user to browse a list of products", async ({ page }) => {
  await page.goto("https://clinquant-sable-606b9c.netlify.app/");
  const expectedElement = "li a";
  const expectedCount = 8; // 8 total items in unfiltered product list

  const elements = await page.$$(expectedElement);

  // Expect all product links to be on homepage (product search page).
  expect(elements.length).toEqual(expectedCount);
});

test("allows user to view a prodcut's details from the list of browsable products", async ({
  page,
}) => {
  await page.goto("https://clinquant-sable-606b9c.netlify.app/");

  // Click the first product detail link (Crate of Corn).
  await page.getByRole("link", { name: "Crate of Corn" }).click();

  // Expect product detail route.
  await expect(page).toHaveURL(/.*product/);
  // Expects the URL to contain the product ID for Crate of Corn.
  await expect(page).toHaveURL(/.*1e780016-94ef-4063-9fbb-fbafbabb636e/);
});

test("allows user to add an item to their cart", async ({ page }) => {
  // Go to Crate of Corn product detail page
  await page.goto(
    "https://clinquant-sable-606b9c.netlify.app/product/1e780016-94ef-4063-9fbb-fbafbabb636e"
  );
  // Click button to open modal
  const modalButton = await page.waitForSelector(".product-card__body button");
  await modalButton.click();

  // Find form and input in modal
  const modal = await page.waitForSelector(".modal");
  const form = await modal.$("form");
  const input = await form!.$('input[type="number"]');
  const submitButton = await form!.$('button[type="submit"]');

  // Fill in input and submit form
  await input!.focus();
  await page.keyboard.type("10");
  await submitButton!.focus();
  await page.keyboard.press("Enter");

  // Go to Cart page
  const cartLink = await page.waitForSelector("nav a:last-child");
  await cartLink.click();

  // Expect to find the item added in cart (Crate of Corn)
  const productTitleSelector = ".product-card__body .name";
  const expectedProductTitle = "Crate of Corn";
  await page.waitForSelector(productTitleSelector);
  const productTitleText = await page.textContent(productTitleSelector);
  expect(productTitleText).toContain(expectedProductTitle);

  // Expect user entered amount of 10 to be displayed in the cart for the unit added
  const productQuantitySelector = ".product-card__body .quantity";
  const expectedQuantity = "10";
  await page.waitForSelector(productQuantitySelector);
  const productQuantityText = await page.textContent(productQuantitySelector);
  expect(productQuantityText).toContain(expectedQuantity);
});

test("allows user to place an order", async ({ page }) => {
  await page.goto("https://clinquant-sable-606b9c.netlify.app/cart");

  // Click the get Purchase button.
  const purchaseButton = await page.waitForSelector(
    'form button[type="submit"]'
  );
  await purchaseButton!.focus();
  await page.keyboard.press("Enter");

  // Expect a success message on purchase
  const purchaseSuccessMessageSelector = ".order-submitted-message";
  const purchaseSuccessMessage =
    "Success! Thank you for purchasing with Sweet Apple Acres";
  await page.waitForSelector(purchaseSuccessMessageSelector);
  const purchaseSubmissionMessage = await page.textContent(
    purchaseSuccessMessageSelector
  );
  expect(purchaseSubmissionMessage).toContain(purchaseSuccessMessage);
});
