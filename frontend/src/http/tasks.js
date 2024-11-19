import { API_URL } from "../config";

// Fetch tasks from the backend
export const getTasks = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/tasks");

    // Check if the response is successful
    if (!res.ok) {
      throw new Error(`Error fetching tasks: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("data from getTasks: ", data);

    // Return the data directly as it's an array of tasks
    return data || []; // Return the tasks array if defined, else an empty array
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return []; // Return an empty array in case of error
  }
};

export const postTask = async (taskData) => {
  try {
    const res = await fetch("http://localhost:8000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Make sure the backend understands JSON
      },
      body: JSON.stringify(taskData), // Convert the task data to JSON
    });

    if (!res.ok) {
      throw new Error(`Error posting task: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Task successfully added:", data);
    return data; // Return the newly created task data
  } catch (err) {
    console.error("Error posting task:", err);
    throw err; // Rethrow the error to be handled by the hook or component
  }
};
