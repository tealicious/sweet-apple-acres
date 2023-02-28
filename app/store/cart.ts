import { CartProduct } from "~/types";

// localStorage: a poor man's persisted state

export function getCurrentCart(): CartProduct[] {
  if (typeof window === 'undefined') return [];
  const localStorage = window.localStorage;
  let currentCart = localStorage.getItem("currentCart");

  if (!currentCart) {
    localStorage.setItem("currentCart", JSON.stringify([]));
    currentCart = "[]";
  }

  return JSON.parse(currentCart);
}

export function updateCurrentCart(newCart: CartProduct[]): void {
  if (typeof window === 'undefined') return;
  const localStorage = window.localStorage;
  localStorage.setItem("currentCart", JSON.stringify(newCart));
}
