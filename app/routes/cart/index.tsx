import React from "react";
import { getCurrentCart } from "~/store/cart";
import ProductInCart from "~/components/Cart/ProductInCart";
import { CartProduct } from "~/types/services";
import { ProductCartResults } from "~/components/UI/UI";
import { PaymentForm } from "~/components/Cart/PaymentForm";

export default function Cart() {
  
  const [products, setProducts] = React.useState(
    getCurrentCart() as CartProduct[]
  );

  function clearCart(): void {
    setProducts(() => [])
  }

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
        <PaymentForm products={products} onPurchaseSuccess={clearCart}/>
      </ProductCartResults>
    );
  } else {
    productList = <h2>It appears your cart is empty!</h2>;
  }
  return (
    <>
      <h1>Cart</h1>
      {productList}
    </>
  );
}
