import React from "react";
import "./modal.css";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
