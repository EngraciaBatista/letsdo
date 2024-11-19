import { useState, useEffect } from "react";
import { getUsers } from "../http/users"; // Import the getUsers function

const useUsers = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(""); // State for error handling

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // Set loading to true when fetch starts
        const response = await getUsers(); // Fetch users from getUsers()

        // Assuming response is an object with a "users" field
        if (response && Array.isArray(response.users)) {
          setUsers(response.users); // Set the fetched users
        } else {
          throw new Error("Users data is not an array or not defined.");
        }
      } catch (err) {
        setError(`Error loading users: ${err.message || err}`); // Set error message with detailed info
        console.error("Error fetching users:", err); // Log the error
      } finally {
        setLoading(false); // Set loading to false when fetch completes
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, []); // Empty dependency array to run once on mount

  return { users, loading, error }; // Return users, loading, and error states
};

export default useUsers;
