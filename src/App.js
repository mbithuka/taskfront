import React, { useState, useEffect } from 'react';
import axios from './api';
import './App.css'; // Import external CSS file
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Routes
import ViewTasks from './ViewTasks'; // Import the ViewTasks component
import CreateTask from './CreateTask';
import DeleteTask from './DeleteTask';
import UpdateTask from './UpdateTask';

function App() {
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

  const handleDeleteSuccess = () => {
    // After successful deletion, update the task list by fetching tasks again
    fetchTasks();
  };

  return (
    <Router>
      <div>
        {/* Navigation links */}
        <nav className="centered">
          <h2>
            <a><Link to="/view">View</Link></a>
            <a><Link to="/create">Create</Link></a>
            <a><Link to="/update">Update</Link></a>
            <a><Link to="/delete">Delete</Link></a>
          </h2>
        </nav>
        
        {/* Define routes */}
        <Routes>
          <Route path="/view" element={<ViewTasks tasks={tasks} />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/update" element={<UpdateTask />} />
          <Route path="/delete" element={<DeleteTask onSuccess={handleDeleteSuccess} />} /> {/* Pass onSuccess function */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
