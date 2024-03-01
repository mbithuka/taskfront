// ViewTasks.js
import React, { useState, useEffect } from 'react';
import axios from './api';

function ViewTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch all tasks when the component mounts
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/tasks');
      console.log('Response from backend:', response.data); // Log the response from the backend
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div className="table-container">
      <h2>View Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Task Description</th>
            <th>Task Status</th>
            <th>Date Created</th>
            <th>Date Updated</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.createdAt}</td>
              <td>{task.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTasks;
