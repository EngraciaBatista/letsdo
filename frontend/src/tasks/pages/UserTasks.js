// import { useState, useEffect } from "react";
// import { getTasks } from "../../http/tasks"; // Import the getTasks function
// import TaskList from "../components/TaskList"; // Import TaskList component

// const UserTasks = () => {
//   const [tasks, setTasks] = useState([]); // State to store tasks
//   const [loading, setLoading] = useState(true); // State for loading status
//   const [error, setError] = useState(""); // State for error handling

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         setLoading(true); // Set loading to true when fetch starts
//         const data = await getTasks(); // Fetch tasks directly from getTasks()
//         console.log("Fetched tasks:", data); // Verify the data being returned
//         setTasks(data); // Set the fetched tasks
//       } catch (err) {
//         setError("Error loading tasks"); // Set error message
//         console.error("Error fetching tasks:", err); // Log the error
//       } finally {
//         setLoading(false); // Set loading to false when fetch completes
//       }
//     };

//     fetchTasks(); // Call the function to fetch tasks
//   }, []); // Empty dependency array to run once on mount

//   // Render the component
//   if (loading) {
//     return <div>Loading...</div>; // Show loading state
//   }

//   if (error) {
//     return <div>{error}</div>; // Show error message
//   }

//   return <TaskList items={tasks} />; // Pass tasks as items to TaskList
// };

// export default UserTasks;

import React from "react";
import TaskList from "../components/TaskList"; // Import TaskList component
import useTasks from "../../hooks/useTasks"; // Import the useTasks hook

const UserTasks = () => {
  const { tasks, loading, error } = useTasks(); // Use the custom hook to fetch tasks

  // Render the component
  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  return <TaskList items={tasks} />; // Pass tasks as items to TaskList
};

export default UserTasks;
