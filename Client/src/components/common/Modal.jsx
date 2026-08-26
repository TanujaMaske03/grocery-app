import PropTypes from "prop-types";

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">

        {/* Title */}
        <h3 className="font-bold text-xl">
          {title}
        </h3>

        {/* Body */}
        <div className="py-5">
          {children}
        </div>

        {/* Footer */}
        <div className="modal-action">

          <button
            className="btn btn-outline"
            onClick={onClose}
          >
            {cancelText}
          </button>

          <button
            className="btn btn-success"
            onClick={onConfirm}
          >
            {confirmText}
          </button>

        </div>

      </div>

      {/* Click Outside */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default Modal;