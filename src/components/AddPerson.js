
import React, { useState } from 'react';
import './AddPerson.css';

const AddPerson = ({ closeModal, onAddPerson }) => {
  const [email, setEmail] = useState('');
  const [suggestions, setSuggestions] = useState([
    'john@example.com',
    'jane@example.com',
    'akashgupta@gmail.com',
    'michael@example.com'
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setFilteredSuggestions(
      suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleAddEmail = () => {
    if (email) {
      onAddPerson(email);
      setEmail('');
      closeModal();
    }
  };

  return (
    <div className="add-person-modal">
      <div className="add-person-content">
        <h3>Add people to the board</h3>
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter the email"
          className="email-input"
        />
        {filteredSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setEmail(suggestion);
                  setFilteredSuggestions([]);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <div className="button-group">
          <button onClick={closeModal} className="cancel-button">
            Cancel
          </button>
          <button onClick={handleAddEmail} className="add-button">
            Add Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPerson;
