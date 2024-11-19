// import React from "react";

// import UsersList from "../components/UsersList";
// import "./Users.css";

// const Users = () => {
//   const USERS = [
//     {
//       id: "user1",
//       name: "Edwin",
//       tasks: 2,
//       image:
//         "https://images.unsplash.com/photo-1681949098572-0004d05d6363?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRvZG98ZW58MHx8MHx8fDA%3D",
//     },
//   ];

//   return <UsersList items={USERS} />;
// };

// export default Users;

import React from "react";
import UsersList from "../components/UsersList";
import useUsers from "../../hooks/useUsers"; // Import the useUsers hook
import "./Users.css";

const Users = () => {
  const { users, loading, error } = useUsers(); // Use the useUsers hook to fetch users

  // If the component is still loading users
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there was an error fetching users
  if (error) {
    return <div>{error}</div>;
  }

  // Render the UsersList component and pass the fetched users
  return <UsersList items={users} />;
};

export default Users;
