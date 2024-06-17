import React from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean; // Flag to control modal visibility
  onClose: () => void; // Callback to close the modal
  children: React.ReactNode; // Content to be displayed in the modal
}

// Modal component to display content in a popup
function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
