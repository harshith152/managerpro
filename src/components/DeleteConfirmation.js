import React from 'react';
import './DeleteConfirmation.css';

const DeleteConfirmation = ({ onDeleteConfirm, onCancel }) => {
  return (
    <div className="delete-modal-container">
      <div className="delete-modal-overlay">
        <div className="delete-modal">
          <p>Are you sure you want to delete?</p>
          <div className="modal-buttons">
            <button className="delete-button" onClick={onDeleteConfirm}>Yes, Delete</button>
            <button className="cancel-button" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
