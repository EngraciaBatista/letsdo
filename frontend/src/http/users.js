import { API_URL } from "../config";

export const getUsers = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/users");

    // Check if the response is successful
    if (!res.ok) {
      throw new Error(`Error fetching users: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Data from getUsers:", data);

    // Return the user data array if it's defined, else return an empty array
    return data || [];
  } catch (err) {
    console.error("Error fetching users:", err);
    return []; // Return an empty array in case of error
  }
};
