import React from "react";
import "./Modal.css"; 

interface ModalProps {
  classStyles?: string;
  onClose: () => void; 
  children: React.ReactNode; 
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
