// hooks/useAddTask.js
import { useState } from "react";
import { postTask } from "../http/tasks";

const useAddTask = () => {
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track any errors

  const addTask = async (taskData) => {
    setIsLoading(true); // Set loading state before calling the API
    setError(null); // Reset previous errors if any

    try {
      const newTask = await postTask(taskData); // Call postTask with the task data
      setIsLoading(false); // Set loading to false after the request completes
      return newTask; // Return the newly created task
    } catch (err) {
      setIsLoading(false); // Set loading to false if there's an error
      setError("Failed to add task. Please try again later."); // Set error state
      console.error("Error adding task:", err);
    }
  };

  return { addTask, isLoading, error };
};

export default useAddTask;
