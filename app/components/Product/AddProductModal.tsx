import React from "react";
import Price from "~/components/UI/Price";
import ReactDOM from "react-dom";
import { ModalWrapper } from "../UI/UI";
import { FetchedProduct } from "~/types/services";

interface ModalProps extends FetchedProduct {
  onClose: () => void;
}

const ModalOverlay = (props: ModalProps) => {
  const [purchaseUnits, setPurchaseUnits] = React.useState("1");

  const totalCost: number = props.price * +purchaseUnits;

  const updatePurchaseUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUnit = e.target.value;
    setPurchaseUnits(newUnit);
  };

  const addProductUnitsToCart = function () {
    alert(purchaseUnits);
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
        <img src={props.image} alt={`${props.name} product image`} />
        <div className="content">
          <p id="dialog_label">{props.name}</p>
          <p id="dialog_desc">{props.description}</p>
          <p>Rating: {props.rating}/5</p>
          <p>
            <Price price={props.price} /> per unit
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
                Price: <Price price={totalCost} />
              </strong>
            </p>
            <div className="form-actions">
              <button type="submit">Add to cart</button>
              <button type="button" onClick={props.onClose} className="button-secondary">
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
