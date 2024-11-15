import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './Footer';

function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  useEffect(() => {
    document.title = "LetsDo"; // Set the document title
  }, []);

  const addTask = () => {
    if (task.trim() !== '') {
      setTaskList([...taskList, task]);
      setTask('');
    }
  };

  const deleteTask = (index) => {
    const newTaskList = taskList.filter((_, taskIndex) => taskIndex !== index);
    setTaskList(newTaskList);
  };

  const editTask = (index) => {
    setTask(taskList[index]);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const updateTask = () => {
    const updatedTaskList = taskList.map((item, index) =>
      index === currentTaskIndex ? task : item
    );
    setTaskList(updatedTaskList);
    setTask('');
    setIsEditing(false);
    setCurrentTaskIndex(null);
  };

  return (
    <div className="App">
      <div className="app-container">
        <img src="/letsdologo_header.png" alt="Logo" className="logo" />
        <h2>Task Manager</h2>
        <p>Welcome to LetsDo, your personal task manager.</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          {isEditing ? (
            <button className="update-button" onClick={updateTask}>Update</button>
          ) : (
            <button className="add-button" onClick={addTask}>Add</button>
          )}
        </div>
        <div className="task-container">
          {taskList.length > 0 ? (
            <ul>
              {taskList.map((task, index) => (
                <li key={index}>
                  <span>{task}</span>
                  <button className="edit-button" onClick={() => editTask(index)}>Edit</button>
                  <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks available</p>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;