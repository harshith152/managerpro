import React, { useEffect, useState } from 'react';
import './Analytics.css';

const Analytics = () => {
  const [taskCounts, setTaskCounts] = useState({
    backlog: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
    lowPriority: 0,
    moderatePriority: 0,
    highPriority: 0,
    dueDateTasks: 0,
  });

  useEffect(() => {
   
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    const counts = {
      backlog: storedTasks.filter((task) => task.status === 'Backlog').length,
      todo: storedTasks.filter((task) => task.status === 'To Do').length,
      inProgress: storedTasks.filter((task) => task.status === 'In Progress').length,
      completed: storedTasks.filter((task) => task.status === 'Done').length,
      lowPriority: storedTasks.filter((task) => task.priority === 'low').length,
      moderatePriority: storedTasks.filter((task) => task.priority === 'moderate').length,
      highPriority: storedTasks.filter((task) => task.priority === 'high').length,
      dueDateTasks: storedTasks.filter((task) => task.dueDate).length,
    };

    setTaskCounts(counts);
  }, []);

  return (
    <div className="analytics-container">
      <h2>Analytics</h2>
      <div className="analytics-cards">
        <div className="analytics-card">
          <ul>
            <li>Backlog Tasks <span>{taskCounts.backlog}</span></li>
            <li>To-do Tasks <span>{taskCounts.todo}</span></li>
            <li>In-Progress Tasks <span>{taskCounts.inProgress}</span></li>
            <li>Completed Tasks <span>{taskCounts.completed}</span></li>
          </ul>
        </div>
        <div className="analytics-card">
          <ul>
            <li>Low Priority <span>{taskCounts.lowPriority}</span></li>
            <li>Moderate Priority <span>{taskCounts.moderatePriority}</span></li>
            <li>High Priority <span>{taskCounts.highPriority}</span></li>
            <li>Due Date Tasks <span>{taskCounts.dueDateTasks}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
