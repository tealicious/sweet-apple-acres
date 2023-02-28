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
