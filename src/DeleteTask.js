import React, { useState, useEffect } from 'react';
import axios from './api';

function DeleteTask({ onSuccess }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Fetch tasks on component mount
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();

    // Cleanup function
    return () => {
      // Cleanup tasks if needed
    };
  }, []);

  const handleCheckboxChange = (taskId) => {
    const updatedSelectedTasks = selectedTasks.includes(taskId)
      ? selectedTasks.filter((id) => id !== taskId)
      : [...selectedTasks, taskId];
    setSelectedTasks(updatedSelectedTasks);
  };

  const handleDelete = async () => {
    setIsDeleting(true); // Set deleting state to true
    try {
      // Delete each selected task
      await Promise.all(selectedTasks.map((taskId) => axios.delete(`/tasks/${taskId}`)));
      console.log('Tasks deleted successfully');
      onSuccess(); // Invoke the onSuccess callback to notify the parent component
    } catch (error) {
      console.error('Error deleting tasks:', error);
    } finally {
      setIsDeleting(false); // Reset deleting state
    }
  };

  return (
    <div>
      <p>Available Tasks:</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              id={task.id}
              checked={selectedTasks.includes(task.id)}
              onChange={() => handleCheckboxChange(task.id)}
            />
            <label htmlFor={task.id}>{task.name}</label>
          </li>
        ))}
      </ul>
      <button onClick={handleDelete} disabled={isDeleting || selectedTasks.length === 0}>
        {isDeleting ? 'Deleting...' : 'Delete Selected'}
      </button>
    </div>
  );
}

export default DeleteTask;
