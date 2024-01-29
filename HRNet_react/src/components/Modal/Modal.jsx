import React from 'react'
import './Modal.css'

const Modal = ({ isVisible, onClose }) => {
    if (!isVisible) return null;
  
    return (
      <div className="modal">
        <div className="modal-content">
          <h4>Employee Saved</h4>
          <p>The employee data has been successfully saved.</p>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    );
  };
  
  export default Modal
