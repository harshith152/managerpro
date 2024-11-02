
import React from 'react';
import './ConfirmationPopup.css';

const ConfirmationPopup = ({ message, onClose }) => {
  return (
    <div className="confirmation-popup">
      <div className="confirmation-popup-content">
        <p>{message}</p>
        <button onClick={onClose} className="confirmation-button">
          Okay, got it!
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
