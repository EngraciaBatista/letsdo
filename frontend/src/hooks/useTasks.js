// // hooks/useProducts.js
// import { useState, useEffect, useCallback } from "react";
// import { getFilteredTasks } from "../http/tasks";

// const useTasks = (initialFilters, initialSkip = 0, initialLimit = 6) => {
//   const [filters, setFilters] = useState(initialFilters);
//   const [skip, setSkip] = useState(initialSkip);
//   const [limit, setLimit] = useState(initialLimit);
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [error, setError] = useState("");
//   const [size, setSize] = useState(0);

//   const loadFilteredResults = useCallback(() => {
//     getFilteredProducts(skip, limit, filters).then((data) => {
//       if (data.error) {
//         setError(data.error);
//       } else {
//         setFilteredResults(data.data);
//         setSize(data.size);
//         setSkip(0);
//       }
//     });
//   }, [filters, limit, skip]);

//   const loadMore = useCallback(() => {
//     let toSkip = skip + limit;
//     getFilteredProducts(toSkip, limit, filters).then((data) => {
//       if (data.error) {
//         setError(data.error);
//       } else {
//         setFilteredResults([...filteredResults, ...data.data]);
//         setSize(data.size);
//         setSkip(0);
//       }
//     });
//   }, [filteredResults, filters, limit, skip]);

//   useEffect(() => {
//     loadFilteredResults();
//   }, [loadFilteredResults]);

//   const updateFilters = (newFilters) => {
//     setFilters(newFilters);
//   };

//   const loadMoreButton = () => {
//     return (
//       size > 0 &&
//       size >= limit && (
//         <button className="btn btn-warning mb-5" onClick={loadMore}>
//           Load More
//         </button>
//       )
//     );
//   };

//   const updatePagination = (newSkip, newLimit) => {
//     setSkip(newSkip);
//     setLimit(newLimit);
//   };

//   return {
//     filteredResults,
//     error,
//     updateFilters,
//     updatePagination,
//     loadMoreButton,
//   };
// };

// export default useTasks;

// import { useState, useEffect } from "react";
// import { getTasks } from "../http/tasks"; // Importing the updated getTasks function

// const useTasks = (userId) => {
//   const [tasks, setTasks] = useState([]); // State to store tasks
//   const [loading, setLoading] = useState(true); // State for loading status
//   const [error, setError] = useState(""); // State for error handling

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         console.log("Fetching tasks..."); // Log when the fetch starts
//         const data = await getTasks();
//         console.log("Fetched data:", data); // Log the entire response

//         // Check if tasks exist and is an array
//         if (data && Array.isArray(data.tasks)) {
//           const tasks = data.tasks;
//           console.log("Fetched tasks:", tasks); // Log the fetched tasks
//           const filteredTasks = tasks;

//           // const filteredTasks = tasks.filter((task) => task.creator === userId);
//           // console.log("Filtered tasks for userId:", filteredTasks); // Log filtered tasks

//           setTasks(filteredTasks); // Set the filtered tasks
//         } else {
//           throw new Error("Tasks data is not an array or not defined.");
//         }
//       } catch (err) {
//         setError("Error loading tasks");
//         console.error("Error fetching tasks:", err); // Log the error
//       } finally {
//         setLoading(false);
//         console.log("Finished loading tasks."); // Log when loading finishes
//       }
//     };

//     fetchTasks();
//   }, [userId]);

//   return { tasks, loading, error };
// };

// export default useTasks;

import { useState, useEffect } from "react";
import { getTasks } from "../http/tasks"; // Import the getTasks function

const useTasks = () => {
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(""); // State for error handling

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true); // Set loading to true when fetch starts
        const data = await getTasks(); // Fetch tasks directly from getTasks()

        // Check if tasks are defined and is an array
        if (Array.isArray(data)) {
          setTasks(data); // Set the fetched tasks
        } else {
          throw new Error("Tasks data is not an array or not defined.");
        }
      } catch (err) {
        setError("Error loading tasks"); // Set error message
        console.error("Error fetching tasks:", err); // Log the error
      } finally {
        setLoading(false); // Set loading to false when fetch completes
      }
    };

    fetchTasks(); // Call the function to fetch tasks
  }, []); // Empty dependency array to run once on mount

  return { tasks, loading, error }; // Return tasks, loading, and error states
};

export default useTasks;
