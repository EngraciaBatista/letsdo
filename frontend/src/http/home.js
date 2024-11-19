// import queryString from "query-string";

// const { API_URL } = require("../config");

// export const getTasks = async (sortBy) => {
//   try {
//     const res = await fetch(
//       `${API_URL}/tasks/get/tasks?sortBy=${sortBy}&order=desc&limit=6`
//     );
//     const data = await res.json();
//     // Extract the categories array from the response
//     return data.products || [];
//   } catch (err) {
//     console.error("Error fetching tasks:", err);
//     return []; // Return an empty array in case of error
//   }
// };

// export const getCategories = async () => {
//   try {
//     const res = await fetch(`${API_URL}/categories/get/categories`);
//     const data = await res.json();
//     // Extract the categories array from the response
//     return data.categories || [];
//   } catch (err) {
//     console.error("Error fetching categories:", err);
//     return []; // Return an empty array in case of error
//   }
// };

// export const getSearchedTasks = async (params) => {
//   const query = queryString.stringify(params);
//   try {
//     const res = await fetch(`${API_URL}/tasks/get/tasks/search?${query}`);
//     console.log("query", query);
//     const data = await res.json();
//     console.log("Fetched data:", data); // Log the fetched data to check its structure
//     return data || []; // Ensure correct data assignment
//   } catch (err) {
//     console.error("Error fetching tasks:", err);
//     return []; // Return an empty array in case of error
//   }
// };
