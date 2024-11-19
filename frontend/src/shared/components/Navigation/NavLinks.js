// import React from "react";
// import { NavLink } from "react-router-dom";
// import { Menu } from "antd";

// const NavLinks = () => {
//   return (
//     <Menu
//       theme="dark"
//       mode="horizontal"
//       defaultSelectedKeys={["1"]}
//       style={{ borderBottom: 0 }}
//     >
//       <Menu.Item key="1">
//         <NavLink to="/" exact>
//           All Users
//         </NavLink>
//       </Menu.Item>
//       <Menu.Item key="2">
//         <NavLink to="/user1/tasks">My Tasks</NavLink>
//       </Menu.Item>
//       <Menu.Item key="3">
//         <NavLink to="/tasks/new">Add Task</NavLink>
//       </Menu.Item>
//       <Menu.Item key="4">
//         <NavLink to="/auth">Authenticate</NavLink>
//       </Menu.Item>
//     </Menu>
//   );
// };

// export default NavLinks;

import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";

const NavLinks = () => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      style={{ borderBottom: 0, flexGrow: 1, justifyContent: "flex-end" }}
    >
      <Menu.Item key="1">
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to="/user1/tasks">My Tasks</NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to="/tasks/new">Add Task</NavLink>
      </Menu.Item>
      <Menu.Item key="4">
        <NavLink to="/auth">Authenticate</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default NavLinks;
