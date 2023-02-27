import React from "react";
import Price from "~/components/UI/Price";
import ReactDOM from "react-dom";
import { ModalWrapper } from "../UI/UI";
import { FetchedProduct, CartProduct } from "~/types";
import { getCurrentCart, updateCurrentCart } from "~/store/cart";

interface ModalProps {
  product: FetchedProduct;
  onClose: () => void;
}

const ModalOverlay = (props: ModalProps) => {
  const product = props.product;
  const [purchaseUnits, setPurchaseUnits] = React.useState("1");

  // turn this into local storage
  const [currentCart, setCurrentCart] = React.useState(
    getCurrentCart() as CartProduct[]
  );

  const totalCost: number = product.price * +purchaseUnits;

  const updatePurchaseUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUnit = e.target.value;
    setPurchaseUnits(() => newUnit);
  };

  const addProductUnitsToCart = (e: React.FormEvent) => {
    e.preventDefault();
    const productToAdd: CartProduct = {
      ...product,
      quantity: +purchaseUnits,
    };
    const updatedCart = [...currentCart];
    const existingProduct = updatedCart.find((product: CartProduct) => {
      return product.id === productToAdd.id;
    });
    if (existingProduct) {
      // if the product is already in cart, update the quantity with the newly added quantity
      const existingIndex = updatedCart.findIndex(
        (product) => (product.id === existingProduct.id)
      );
      updatedCart[existingIndex].quantity += productToAdd.quantity;
    } else {
      // else push the new product into the cart
      updatedCart.push(productToAdd);
    }
    updateCurrentCart(updatedCart);
    props.onClose();
  };

  return (
    <ModalWrapper onClick={props.onClose}>
      <div
        className="modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog_label"
        aria-describedby="dialog_desc"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={product.image} alt={`${product.name} product image`} />
        <div className="content">
          <p id="dialog_label">
            <strong>{product.name}</strong>
          </p>
          <p id="dialog_desc">
            To add this item to your cart, first select how many units you would
            like to add to your order, then click the 'Add to cart' button. Or
            hit cancel to return the product page.
          </p>
          <p>
            <Price price={product.price} /> per unit
          </p>
          <form onSubmit={addProductUnitsToCart}>
            <label htmlFor="unit_select">
              Select how many units you would like to add to your order
            </label>
            <input
              type="number"
              value={purchaseUnits}
              min="1"
              name="unit_select"
              id="unit_select"
              autoFocus
              onChange={updatePurchaseUnit}
            ></input>
            <p>
              <strong>
                Total Price: <Price price={totalCost} />
              </strong>
            </p>
            <div className="form-actions">
              <button type="submit">Add to cart</button>
              <button
                type="button"
                onClick={props.onClose}
                className="button-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
};

const AddProductModal = (props: ModalProps) => {
  return ReactDOM.createPortal(
    <ModalOverlay {...props} />,
    document.querySelector("#modal-root") as Element
  );
};

export default AddProductModal;
