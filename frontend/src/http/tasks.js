import { API_URL } from "../config";

export const createTask = async (userId, token, product) => {
  try {
    const res = await fetch(`${API_URL}/tasks/create/task/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getTasks = async () => {
  try {
    const res = await fetch(`${API_URL}/tasks/get/tasks`);
    const data = await res.json();
    // Extract the categories array from the response
    return data.products || [];
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return []; // Return an empty array in case of error
  }
};

//router.post("/get/products/search", getSearchedProducts);
export const getFilteredTasks = async (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  };
  try {
    const res = await fetch(`${API_URL}/tasks/get/tasks/filter`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Ensure the body is stringified
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};
