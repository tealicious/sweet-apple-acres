import React from "react";
import { Form, FieldGroup } from "~/components/UI/UI";
import {
  CartProduct,
  ProductAsPayload,
  PurchasePayload,
} from "~/types";
import Price from "~/components/UI/Price";
import ConfirmationModal from "~/components/UI/ConfirmationModal"

// import { purchaseProducts } from "~/models/product.server";
// some sort of active issue is preventing me from exporting and importing this service function: https://stackoverflow.com/questions/74911724/typeerror-0-import-jsx-dev-runtime-jsxdev-is-not-a-function - https://github.com/remix-run/remix/issues/4081
function purchaseProducts(purchasePayload: PurchasePayload): Promise<{
  success: boolean;
  res: Error | Response;
}> {
  return fetch(
    "https://sweet-apple-acres.netlify.app/.netlify/functions/api/orders",
    {
      method: "POST",
      body: JSON.stringify(purchasePayload),
      // I'm not going to setup a CORS proxy to finishing this spec project ¯\_(ツ)_/¯, so we're going to pretend this is a genuine 200 OK response.
      mode: "no-cors",
      headers: {
        // Authorization: `Bearer ${process.env.netlify_access_token}`
        // If this were a real project, I'd ask around to see if we'd setup access tokens for the functions API and where I could procue them for my app.
      },
    }
  )
    .then((res) => {
      return {
        success: true,
        res: res,
      };
    })
    .catch((e) => {
      return {
        success: false,
        res: e,
      };
    });
}

export function PaymentForm({
  products,
  onSubmitOrder,
  onEmptyCart,
}: {
  products: CartProduct[];
  onSubmitOrder: (success: boolean) => void;
  onEmptyCart: () => void;
}) {
  const [name, setName] = React.useState("Bert + Ernie");
  const [address, setAddress] = React.useState("123 Sesame Street");
  const [isPurchasing, setIsPurchasing] = React.useState(false);
  const [clearingCart, setIsClearingCart] = React.useState(false);
  const clearCartButton = React.useRef<HTMLButtonElement>(null);

  const totalOrderPrice = products
    .map((product) => product.quantity * product.price)
    .reduce((a, b) => a + b, 0);

  function updateName(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value);
  }

  function updateAddress(e: React.ChangeEvent<HTMLInputElement>): void {
    setAddress(e.target.value);
  }

  async function submitPurchase(e: React.FormEvent) {
    e.preventDefault();
    setIsPurchasing(true);
    const orderPayload: PurchasePayload = {
      name: name,
      deliveryAddress: address,
      items: products.map((product): ProductAsPayload => {
        return { productId: product.id, quantity: product.quantity };
      }),
    };
    const purchase = await purchaseProducts(orderPayload);
    setIsPurchasing(false);
    if (purchase.success) {
      onSubmitOrder(true);
    } else {
      onSubmitOrder(false);
    }
  }

  function clearCart() {
    onEmptyCart();
    toggleAlertingUser(false)
  }

  function toggleAlertingUser(isAlerting: boolean) {
    setIsClearingCart(isAlerting)
    focusClearCartButton()
  }
  
  function focusClearCartButton(): void {
    if (clearCartButton && clearCartButton.current) {
      clearCartButton.current.focus();
    }
  }

  return (
    <Form onSubmit={submitPurchase} className="wide">
      <FieldGroup className="wide">
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          name="Name"
          id="Name"
          onChange={updateName}
          value={name}
          required
        ></input>
      </FieldGroup>

      <FieldGroup className="wide">
        <label htmlFor="Address">Shipping Address</label>
        <input
          type="text"
          name="Address"
          id="Address"
          onChange={updateAddress}
          value={address}
          required
        ></input>
      </FieldGroup>

      <FieldGroup className="wide">
        <p className="total">
          Total Order Price:{" "}
          <strong>
            <Price price={totalOrderPrice} />
          </strong>
        </p>
      </FieldGroup>

      <div className="controls">
        <button type="submit" disabled={isPurchasing}>
          Purchase
        </button>
        <button ref={clearCartButton} type="button" className="button-secondary" disabled={isPurchasing} onClick={() => toggleAlertingUser(true)}>
          Clear Cart
        </button>
        {clearingCart && (
          <ConfirmationModal
            onConfirm={clearCart}
            onCancel={() => toggleAlertingUser(false)}
            title={"Warning: You are clearing your shopping Cart"}
            description={"Press confirm to clear you current shopping cart of all selections. Press Cancel to back out with no changes."}
          />
        )}
      </div>
    </Form>
  );
}
