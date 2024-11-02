import React, { useState, useEffect } from 'react';
import AddTask from '../components/AddTask';
import TaskCard from '../components/TaskCard';
import AddPerson from '../components/AddPerson';
import ConfirmationPopup from '../components/ConfirmationPopup';
import './Board.css';

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [preferences, setPreferences] = useState({ theme: 'light', notifications: true });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddPersonOpen, setIsAddPersonOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [expandedTasks, setExpandedTasks] = useState({});

  // Load user and preferences from local storage
  const userData = JSON.parse(localStorage.getItem('user')) || { name: 'User' };
  const { name } = userData;

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
        console.log("Loaded tasks from localStorage:", parsedTasks);
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
      }
    }
  }, []);

  // Save tasks to local storage whenever tasks are updated
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log("Saved tasks to localStorage:", tasks);
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]);

  // Load preferences from local storage
  useEffect(() => {
    const storedPreferences = localStorage.getItem('preferences');
    if (storedPreferences) {
      try {
        setPreferences(JSON.parse(storedPreferences));
        console.log("Loaded preferences from localStorage:", storedPreferences);
      } catch (error) {
        console.error("Error parsing preferences from localStorage:", error);
      }
    }
  }, []);

  // Save preferences to local storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('preferences', JSON.stringify(preferences));
      console.log("Saved preferences to localStorage:", preferences);
    } catch (error) {
      console.error("Error saving preferences to localStorage:", error);
    }
  }, [preferences]);

  const openModal = () => {
    setIsModalOpen(true);
    setEditingTask(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const openAddPerson = () => {
    setIsAddPersonOpen(true);
  };

  const closeAddPerson = () => {
    setIsAddPersonOpen(false);
  };

  const onAddPerson = (email) => {
    setConfirmationMessage(`${email} added to board`);
    setIsAddPersonOpen(false);
    setTimeout(() => {
      setConfirmationMessage('');
    }, 3000);
  };

  const saveTask = (task) => {
    if (editingTask) {
      const updatedTasks = tasks.map(t => t === editingTask ? { ...t, ...task } : t);
      setTasks(updatedTasks);
    } else {
      const newTask = { ...task, status: 'To Do' };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    setIsModalOpen(false);
  };

  const updateTaskStatus = (updatedTask, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task === updatedTask ? { ...task, status: newStatus } : task
      )
    );
  };

  const toggleChecklistItem = (taskToUpdate, checklistIndex) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task === taskToUpdate) {
          const updatedChecklistItems = task.checklistItems.map((item, index) =>
            index === checklistIndex ? { ...item, completed: !item.completed } : item
          );
          return { ...task, checklistItems: updatedChecklistItems };
        }
        return task;
      })
    );
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const deleteTask = (taskToDelete) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task !== taskToDelete));
  };

  const collapseAllTasks = (column) => {
    setExpandedTasks((prev) => {
      const updated = { ...prev };
      tasks
        .filter((task) => task.status === column)
        .forEach((task) => {
          updated[task.id] = false; 
        });
      return updated;
    });
  };

  const toggleTaskExpansion = (taskId) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  return (
    <div className={`board-container ${preferences.theme}`}>
      <header>
        <h2>Welcome! {name}</h2>
        <div className="date-filter">
          <span>12th Jan, 2024</span>
          <select>
            <option>This week</option>
            <option>Today</option>
            <option>This month</option>
          </select>
        </div>
      </header>

      <div className="board-title-section">
        <h1 className="board-title">Board</h1>
        <button className="add-people-button" onClick={openAddPerson}>
          <img src="/assets/addpeople.png" alt="Add People" className="add-people-icon" />
        </button>
      </div>

      <div className="task-columns">
        {['Backlog', 'To Do', 'In Progress', 'Done'].map((column) => (
          <div key={column} className="column">
            <div className="column-header">
              <h3>{column}</h3>
              <div className="column-header-buttons">
                {column === 'To Do' && (
                  <img
                    src="/assets/add.png"
                    alt="Add Task"
                    className="add-task-button"
                    onClick={openModal}
                  />
                )}
                <img
                  src="/assets/collapse.png"
                  alt="Collapse All"
                  className="collapse-button"
                  onClick={() => collapseAllTasks(column)}
                />
              </div>
            </div>
            {tasks
              .filter((task) => task.status === column)
              .map((task, index) => (
                <TaskCard
                  key={index}
                  task={task}
                  updateTaskStatus={updateTaskStatus}
                  toggleChecklistItem={toggleChecklistItem}
                  deleteTask={deleteTask}
                  onEditTask={handleEditTask}
                  isExpanded={expandedTasks[task.id] || false} 
                  toggleExpanded={() => toggleTaskExpansion(task.id)} 
                />
              ))}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <AddTask
          closeModal={closeModal}
          saveTask={saveTask}
          initialTaskData={editingTask}
        />
      )}

      {isAddPersonOpen && <AddPerson closeModal={closeAddPerson} onAddPerson={onAddPerson} />}

      {confirmationMessage && (
        <ConfirmationPopup
          message={confirmationMessage}
          onClose={() => setConfirmationMessage('')}
        />
      )}
    </div>
  );
};

export default Board;
