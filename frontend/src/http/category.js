const { API_URL } = require("../config");

export const createCategory = async (userId, token, category) => {
  try {
    const res = await fetch(`${API_URL}/categories/create/category/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getCategories = async () => {
  try {
    const res = await fetch(`${API_URL}/categories/get/categories`);
    const data = await res.json();
    // Extract the categories array from the response
    return data.categories || [];
  } catch (err) {
    console.error("Error fetching categories:", err);
    return []; // Return an empty array in case of error
  }
};
