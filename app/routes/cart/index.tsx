import React from "react";
import { getCurrentCart, updateCurrentCart } from "~/store/cart";
import ProductInCart from "~/components/Cart/ProductInCart";
import { CartProduct } from "~/types/services";
import { ProductCartResults } from "~/components/UI/UI";
import { PaymentForm } from "~/components/Cart/PaymentForm";

export default function Cart() {
  const [formHasSubmitted, setFormHasSubmitted] = React.useState(false);

  const [products, setProducts] = React.useState(
    getCurrentCart() as CartProduct[]
  );
  const [purchaseAttemptFailed, setPurchaseAttemptFailed] =
    React.useState(false);

  function clearCart(orderSuccess: boolean): void {
    setProducts(() => []);
    updateCurrentCart([]);
    setFormHasSubmitted(true);
    if (!orderSuccess) {
      setPurchaseAttemptFailed(true);
    }
  }

  // Templating

  const submitMessage = purchaseAttemptFailed
    ? "Something went wrong! :("
    : "Success! Thank you for purchasing with Sweet Apple Acres, expect your package in 10 - 12 business days!";

  let productList;
  if (products.length > 0) {
    productList = (
      <ProductCartResults>
        {products.map((product: CartProduct) => {
          return (
            <li key={product.id}>
              <ProductInCart {...product} />
            </li>
          );
        })}
        <PaymentForm products={products} onOrderSubmitted={clearCart} />
      </ProductCartResults>
    );
  } else {
    if (formHasSubmitted) {
      productList = "";
    } else {
      productList = <h2>It appears your cart is empty!</h2>;
    }
  }

  return (
    <>
      <h1>Cart</h1>
      {formHasSubmitted && (
        <>
          <hr />
          <strong>
            <p>{submitMessage}</p>
          </strong>
        </>
      )}
      {productList}
    </>
  );
}
