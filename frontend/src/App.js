// import React, { useState, useEffect } from "react";
// import "./App.css";
// import Footer from "./Footer";

// function App() {
//   const [task, setTask] = useState("");
//   const [taskList, setTaskList] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

//   useEffect(() => {
//     document.title = "LetsDo"; // Set the document title
//     fetchTasks(); // Fetch tasks on initial render
//   }, []);

//   // Fetch tasks from the backend
//   // Fetch tasks from the backend
//   const fetchTasks = async () => {
//     try {
//       const response = await fetch("http://localhost:8080/api/tasks");

//       // Check if the response is OK (status code 2xx)
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       setTaskList(data.tasks); // Assuming the backend response contains an array of tasks
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   // Add a new task
//   const addTask = async () => {
//     if (task.trim() !== "") {
//       try {
//         const response = await fetch("http://localhost:8080/api/tasks/create", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ task }),
//         });

//         if (response.ok) {
//           // After adding, fetch the updated task list from the backend
//           fetchTasks();
//           setTask(""); // Clear the input field
//         } else {
//           console.error("Failed to add task");
//         }
//       } catch (error) {
//         console.error("Error adding task:", error);
//       }
//     }
//   };

//   // Delete a task (only on frontend for now)
//   const deleteTask = async (taskID) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/tasks/delete/${taskID}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (response.ok) {
//         // Fetch the updated task list after deletion
//         fetchTasks();
//       } else {
//         console.error("Failed to delete task");
//       }
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const editTask = (index) => {
//     setTask(taskList[index].title); // Assuming tasks are objects with a "title" property
//     setIsEditing(true);
//     setCurrentTaskIndex(index);
//   };

//   const updateTask = async () => {
//     const updatedTask = {
//       title: task,
//       // Add more fields if necessary (category, priority, etc.)
//     };

//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/tasks/edit/${taskList[currentTaskIndex]._id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedTask),
//         }
//       );

//       if (response.ok) {
//         // After updating, fetch the updated task list from the backend
//         fetchTasks();
//         setTask(""); // Clear the input field
//         setIsEditing(false);
//         setCurrentTaskIndex(null);
//       } else {
//         console.error("Failed to update task");
//       }
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   return (
//     <div className="App">
//       <div className="app-container">
//         <img src="/letsdologo_header.png" alt="Logo" className="logo" />
//         <h2>Task Manager</h2>
//         <p>Welcome to LetsDo, your personal task manager.</p>
//         <div className="input-container">
//           <input
//             type="text"
//             placeholder="Enter a task"
//             value={task}
//             onChange={(e) => setTask(e.target.value)}
//           />
//           {isEditing ? (
//             <button className="update-button" onClick={updateTask}>
//               Update
//             </button>
//           ) : (
//             <button className="add-button" onClick={addTask}>
//               Add
//             </button>
//           )}
//         </div>
//         <div className="task-container">
//           {taskList.length > 0 ? (
//             <ul>
//               {taskList.map((task, index) => (
//                 <li key={task._id}>
//                   <span>{task.title}</span>{" "}
//                   {/* Assuming task object has a title */}
//                   <button
//                     className="edit-button"
//                     onClick={() => editTask(index)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="delete-button"
//                     onClick={() => deleteTask(task._id)}
//                   >
//                     Delete
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No tasks available</p>
//           )}
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default App;

import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewTask from "./tasks/pages/NewTask";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserTasks from "./tasks/pages/UserTasks";
import UpdateTask from "./tasks/pages/UpdateTask";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/tasks" exact>
            <UserTasks />
          </Route>
          <Route path="/tasks/new" exact>
            <NewTask />
          </Route>
          <Route path="/tasks/:taskId" exact>
            <UpdateTask />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
