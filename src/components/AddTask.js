import React, { useState } from 'react';
import './AddTask.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const AddTask = ({ closeModal, saveTask, initialTaskData }) => {
  const [title, setTitle] = useState(initialTaskData?.title || '');
  const [priority, setPriority] = useState(initialTaskData?.priority || '');
  const [checklistItems, setChecklistItems] = useState(initialTaskData?.checklistItems || []);
  const [dueDate, setDueDate] = useState(initialTaskData?.dueDate ? new Date(initialTaskData.dueDate) : null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [assignee, setAssignee] = useState(initialTaskData?.assignee || '');
  const [isAssignDropdownOpen, setIsAssignDropdownOpen] = useState(false); 

  const emails = ['akashgupta@gmail.com', 'dev1@example.com', 'dev2@example.com'];

  const addNewChecklistItem = () => {
    const newItem = { id: checklistItems.length + 1, text: '', completed: false };
    setChecklistItems([...checklistItems, newItem]);
  };

  const handleChecklistChange = (id, value) => {
    setChecklistItems(
      checklistItems.map(item => (item.id === id ? { ...item, text: value } : item))
    );
  };

  const handleToggleComplete = (id) => {
    setChecklistItems(
      checklistItems.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const removeChecklistItem = (id) => {
    setChecklistItems(checklistItems.filter(item => item.id !== id));
  };

  const handleDateChange = (date) => {
    setDueDate(date);
    setIsDatePickerOpen(false);
  };

  const handleSave = () => {
    if (!title || !priority || checklistItems.length === 0) {
      alert('Please complete all required fields.');
      return;
    }

    const task = {
      id: initialTaskData?.id || Date.now().toString(),
      title,
      priority,
      dueDate,
      assignee,
      checklistItems,
    };

    saveTask(task);
    closeModal();
  };

  const toggleAssignDropdown = () => {
    setIsAssignDropdownOpen(!isAssignDropdownOpen);
  };

  const handleAssigneeSelect = (email) => {
    setAssignee(email);
    setIsAssignDropdownOpen(false);
  };

  return (
    <div className="add-task-container">
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3>{initialTaskData ? 'Edit Task' : 'Create New Task'}</h3>

          <div className="form-group">
            <label>Title <span className="required">*</span></label>
            <input
              type="text"
              className="title-input"
              placeholder="Enter Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Select Priority <span className="required">*</span></label>
            <div className="priority-options">
              <button
                className={`priority-button high ${priority === 'high' ? 'selected' : ''}`}
                onClick={() => setPriority('high')}
              >
                <span className="dot" style={{ backgroundColor: '#f28b82' }}></span> High Priority
              </button>
              <button
                className={`priority-button moderate ${priority === 'moderate' ? 'selected' : ''}`}
                onClick={() => setPriority('moderate')}
              >
                <span className="dot" style={{ backgroundColor: '#aecbfa' }}></span> Moderate Priority
              </button>
              <button
                className={`priority-button low ${priority === 'low' ? 'selected' : ''}`}
                onClick={() => setPriority('low')}
              >
                <span className="dot" style={{ backgroundColor: '#ccff90' }}></span> Low Priority
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Assign To</label>
            <div className="assign-dropdown">
              <input
                type="text"
                className="assign-to-input"
                placeholder="Select an assignee"
                value={assignee}
                onClick={toggleAssignDropdown}
                readOnly
              />
              {isAssignDropdownOpen && (
                <div className="assign-dropdown-menu">
                  {emails.map((email, index) => (
                    <div key={index} className="assign-dropdown-item">
                      <span className="avatar-circle">{email[0].toUpperCase()}</span>
                      <span className="email-text">{email}</span>
                      <button className="assign-button" onClick={() => handleAssigneeSelect(email)}>
                        Assign
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Checklist ({checklistItems.filter(item => item.completed).length}/{checklistItems.length})</label>
            {checklistItems.map((item) => (
              <div key={item.id} className="checklist-item">
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={item.completed}
                  onChange={() => handleToggleComplete(item.id)}
                />
                <input
                  type="text"
                  className="task-input checklist-task-input"
                  placeholder="Add a task"
                  value={item.text}
                  onChange={(e) => handleChecklistChange(item.id, e.target.value)}
                />
                <button className="delete-button" onClick={() => removeChecklistItem(item.id)}>
                  <img src="/assets/Delete.png" alt="Delete" />
                </button>
              </div>
            ))}
            <button className="add-new-task" onClick={addNewChecklistItem}>+ Add New</button>
          </div>

          <div className="form-footer">
            <div className="date-picker-container">
              <button className="date-button" onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
                {dueDate ? format(dueDate, 'dd MMM yyyy') : 'Select Due Date'}
              </button>

              {isDatePickerOpen && (
                <div className="datepicker-overlay">
                  <DatePicker
                    selected={dueDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    inline
                  />
                </div>
              )}
            </div>

            <div className="action-buttons">
              <button className="cancel-button" onClick={closeModal}>Cancel</button>
              <button className="save-button" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
