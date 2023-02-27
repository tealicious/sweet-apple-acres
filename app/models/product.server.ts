import { FetchedProduct, PurchasePayload } from "~/types";

export function getProducts(searchQuery?: string): Promise<FetchedProduct[]> {
  return fetch(
    `https://sweet-apple-acres.netlify.app/.netlify/functions/api/products${searchQuery}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  .then((response) => response.json())
  .catch((e) => 'Fetch Error');
}

export function getUniqueProduct(productID: string): Promise<FetchedProduct|string> {
  return fetch(
    `https://sweet-apple-acres.netlify.app/.netlify/functions/api/products/${productID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  .then((response) => response.json())
  .catch((e) => 'Fetch Error')
}

// some sort of active issue is preventing me from exporting and importing this service function:
// https://stackoverflow.com/questions/74911724/typeerror-0-import-jsx-dev-runtime-jsxdev-is-not-a-function
// https://github.com/remix-run/remix/issues/4081
export function purchaseProducts(
  purchasePayload: PurchasePayload
): Promise<string> {
  return fetch(
    "https://sweet-apple-acres.netlify.app/.netlify/functions/api/orders",
    {
      method: "POST",
      body: JSON.stringify(purchasePayload),
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(() => "success")
    .catch(() => "fail");
}
