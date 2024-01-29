import React from "react";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      id="wrapper"
      className="relative z-10 text-left text-xl text-token-color-text-white font-medium"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div className="fixed inset-0 bg-gray bg-opacity-75 transition-opacity"></div>
      {children}
    </div>
  );
};

export default Modal;
