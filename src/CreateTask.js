// CreateTask.js
import React, { useState } from 'react';
import axios from './api';

function CreateTask() {
  const [formData, setFormData] = useState({
    taskName: '',
    taskDescription: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if taskName and taskDescription are not empty
    if (formData.taskName.trim() === '' || formData.taskDescription.trim() === '') {
      console.error('Task name and description cannot be empty');
      return;
    }
    try {
      await axios.post('/tasks', {
        name: formData.taskName,
        description: formData.taskDescription
      });
      console.log('Task created successfully');
      // Reset form data after successful submission
      setFormData({
        taskName: '',
        taskDescription: ''
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  return (
    <div className="form-container">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="taskName">Task Name:</label>
          <input type="text" id="taskName" name="taskName" value={formData.taskName} onChange={handleInputChange} />
        </div>
    
        <div>
          <label htmlFor="taskDescription">Task Description:</label>
          <input type="text" id="taskDescription" name="taskDescription" value={formData.taskDescription} onChange={handleInputChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateTask;
