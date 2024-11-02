import React, { useState } from 'react';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TaskCard.css';
import DeleteConfirmation from './DeleteConfirmation';

const TaskCard = ({
  task,
  onEditTask,
  deleteTask,
  updateTaskStatus,
  toggleChecklistItem,
  isExpanded,
  toggleExpanded,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleShare = () => {
    const link = `${window.location.origin}/share/${task.id}`;
    navigator.clipboard.writeText(link).then(() => {
      toast("Link Copied", { className: 'custom-toast' });
    });
    setIsDropdownOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleDeleteConfirm = () => {
    deleteTask(task);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="task-card-container">
      <div className="task-card">
        <div className="task-card-header">
          <div className="priority-section">
            <span className={`priority-dot ${task.priority}`}></span>
            <span className="priority-label">{task.priority.toUpperCase()} PRIORITY</span>
          </div>
          <button className="menu-button" onClick={toggleDropdown}>...</button>
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <p onClick={() => { onEditTask(task); setIsDropdownOpen(false); }}>Edit</p>
            <p onClick={handleShare}>Share</p>
            <p className="delete" onClick={handleDeleteClick}>Delete</p>
          </div>
        )}

        <h4 className="task-title">{task.title}</h4>

        <div className="checklist-heading">
          <p className="checklist-info">
            Checklist ({task.checklistItems.filter(item => item.completed).length}/{task.checklistItems.length})
          </p>
          <button className="dropdown-button" onClick={toggleExpanded}>
            <img 
              src={isExpanded ? '/assets/upArrow.png' : '/assets/downArrow.png'} 
              alt={isExpanded ? 'Collapse' : 'Expand'}
              className="arrow-icon"
            />
          </button>
        </div>

        {isExpanded && (
          <ul className="checklist-items">
            {task.checklistItems.map((item, index) => (
              <li key={index} className="checklist-item">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleChecklistItem(task, index)}
                />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="due-status-section">
          {task.dueDate && (
            <span className={`due-date ${task.status === 'Done' ? 'done-due-date' : task.priority === 'high' ? 'high-priority-due-date' : 'normal-priority-due-date'}`}>
              {format(new Date(task.dueDate), 'MMM do')}
            </span>
          )}

          <div className="task-status-buttons">
            {task.status !== 'Backlog' && (
              <button className="status-button" onClick={() => updateTaskStatus(task, 'Backlog')}>
                Backlog
              </button>
            )}
            {task.status !== 'To Do' && (
              <button className="status-button" onClick={() => updateTaskStatus(task, 'To Do')}>
                To-Do
              </button>
            )}
            {task.status !== 'In Progress' && (
              <button className="status-button" onClick={() => updateTaskStatus(task, 'In Progress')}>
                Progress
              </button>
            )}
            {task.status !== 'Done' && (
              <button className="status-button" onClick={() => updateTaskStatus(task, 'Done')}>
                Done
              </button>
            )}
          </div>
        </div>

        {isDeleteModalOpen && (
          <DeleteConfirmation onDeleteConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />
        )}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
        />
      </div>
    </div>
  );
};

export default TaskCard;
