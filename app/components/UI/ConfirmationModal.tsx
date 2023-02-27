import ReactDOM from "react-dom";
import { ModalWrapper } from "./UI";

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
}

const ModalOverlay = (props: ModalProps) => {
  return (
    <ModalWrapper onClick={props.onCancel}>
      <div
        className="modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirmation_dialog_label"
        aria-describedby="confirmation_dialog_description"
      >
        <div className="content">
          <p id="confirmation_dialog_label">{props.title}</p>
          <p id="confirmation_dialog_description">{props.description}</p>
          <div className="form-actions">
            <button onClick={props.onConfirm}>Confirm</button>
            <button
              onClick={props.onCancel}
              className="button-secondary"
              autoFocus
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

const ConfirmationModal = (props: ModalProps) => {
  return ReactDOM.createPortal(
    <ModalOverlay {...props} />,
    document.querySelector("#modal-root") as Element
  );
};

export default ConfirmationModal;
