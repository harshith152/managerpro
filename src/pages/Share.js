import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import './Share.css';

const Share = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const foundTask = storedTasks.find((task) => task.id === taskId);

    if (foundTask) {
      setTask(foundTask);
    } else {
      console.error("Task not found with ID:", taskId);
      setTask(null);
    }
  }, [taskId]);

  if (!task) {
    return <div className="share-page-container task-not-found">Task not found</div>;
  }

  return (
    <div className="share-page-container shared-task-view">
      <div className="shared-task-card">
        {/* Priority and Title */}
        <div className="task-card-header">
          <div className="priority-section">
            <span className={`priority-dot ${task.priority}`}></span>
            <span className="priority-label">{task.priority.toUpperCase()} PRIORITY</span>
          </div>
          <h4 className="task-title">{task.title}</h4>
        </div>

        {/* Checklist */}
        <div className="checklist-heading">
          <p className="checklist-info">
            Checklist ({task.checklistItems.filter(item => item.completed).length}/{task.checklistItems.length})
          </p>
        </div>

        <ul className="checklist-items">
          {task.checklistItems.map((item, index) => (
            <li key={index} className="checklist-item">
              <input type="checkbox" checked={item.completed} readOnly />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>

        {/* Due Date */}
        {task.dueDate && (
          <div className="due-date">
            Due Date:
            <span className={task.priority === 'high' ? 'high-priority-due-date' : 'normal-priority-due-date'}>
              {format(new Date(task.dueDate), 'MMM do')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Share;
