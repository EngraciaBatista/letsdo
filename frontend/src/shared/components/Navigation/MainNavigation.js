// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Input, Avatar, Menu, Dropdown, Image } from "antd";
// import { SearchOutlined, UserOutlined } from "@ant-design/icons";
// import MainHeader from "./MainHeader";
// import "./MainNavigation.css";
// import NavLinks from "./NavLinks";
// import SideDrawer from "./SideDrawer";
// import Backdrop from "../UIElements/Backdrop";
// import NewTask from "../../../tasks/pages/NewTask";

// const { Search } = Input;

// const MainNavigation = (props) => {
//   const [drawerIsOpen, setDrawerIsOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModalHandler = () => {
//     setIsModalOpen(true);
//   };

//   const closeModalHandler = () => {
//     setIsModalOpen(false);
//   };

//   const openDrawerHandler = () => {
//     setDrawerIsOpen(true);
//   };

//   const closeDrawerHandler = () => {
//     setDrawerIsOpen(false);
//   };

//   const onSearch = (value) => {
//     console.log("Search:", value);
//   };

//   // Sample Avatar Menu (optional)
//   const avatarMenu = (
//     <Menu>
//       <Menu.Item key="1">Profile</Menu.Item>
//       <Menu.Item key="2">Settings</Menu.Item>
//       <Menu.Item key="3">Logout</Menu.Item>
//     </Menu>
//   );

//   return (
//     <React.Fragment>
//       {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

//       <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
//         <nav className="main-navigation__drawer-nav">
//           <NavLinks onOpenModal={openModalHandler} />
//         </nav>
//       </SideDrawer>

//       <MainHeader>
//         <button
//           className="main-navigation__menu-btn"
//           onClick={openDrawerHandler}
//         >
//           <span />
//           <span />
//           <span />
//         </button>

//         {/* Title and Menu Links */}
//         <div className="main-navigation__left">
//           <h1
//             className="main-navigation__title"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Link to="/" style={{ display: "flex", alignItems: "center" }}>
//               <Image
//                 src="/letsdologo_header.png" // Corrected path
//                 preview={false}
//                 width={100} // Adjust width as needed
//                 style={{ height: "auto", objectFit: "contain" }}
//               />
//             </Link>
//           </h1>

//           {/* Navigation Links closer to the Title */}
//           <nav className="main-navigation__links">
//             <NavLinks onOpenModal={openModalHandler} />
//           </nav>
//         </div>

//         {/* Ant Design Search Component */}
//         <Search
//           placeholder="Search tasks..."
//           allowClear
//           enterButton={<SearchOutlined />}
//           size="large"
//           onSearch={onSearch}
//           style={{ width: 250, marginLeft: "auto", marginRight: 20 }}
//         />

//         {/* User Avatar */}
//         <Dropdown overlay={avatarMenu} placement="bottomRight" arrow>
//           <Avatar
//             size={40}
//             icon={<UserOutlined />}
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRssheQPDCSbStxbdekMJibvC2mqwaRmPbyow&s" // Replace with dynamic user image if available
//             style={{ cursor: "pointer" }}
//           />
//         </Dropdown>
//       </MainHeader>

//       <NewTask isModalOpen={isModalOpen} onClose={closeModalHandler} />
//     </React.Fragment>
//   );
// };

// export default MainNavigation;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Avatar, Menu, Dropdown, Image } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import NewTask from "../../../tasks/pages/NewTask";

const { Search } = Input;

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const onSearch = (value) => {
    console.log("Search:", value);
  };

  // Updated Avatar Menu using 'items'
  const avatarMenu = (
    <Menu
      items={[
        { key: "1", label: "Profile" },
        { key: "2", label: "Settings" },
        { key: "3", label: "Logout" },
      ]}
    />
  );

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks onOpenModal={openModalHandler} />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Title and Menu Links */}
        <div className="main-navigation__left">
          <h1
            className="main-navigation__title"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/letsdologo_header.png" // Corrected path
                preview={false}
                width={100} // Adjust width as needed
                style={{ height: "auto", objectFit: "contain" }}
              />
            </Link>
          </h1>

          {/* Navigation Links closer to the Title */}
          <nav className="main-navigation__links">
            <NavLinks onOpenModal={openModalHandler} />
          </nav>
        </div>

        {/* Ant Design Search Component */}
        <Search
          placeholder="Search tasks..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={onSearch}
          style={{ width: 250, marginLeft: "auto", marginRight: 20 }}
        />

        {/* User Avatar */}
        <Dropdown overlay={avatarMenu} placement="bottomRight" arrow>
          <Avatar
            size={40}
            icon={<UserOutlined />}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRssheQPDCSbStxbdekMJibvC2mqwaRmPbyow&s" // Replace with dynamic user image if available
            style={{ cursor: "pointer" }}
          />
        </Dropdown>
      </MainHeader>

      <NewTask isModalOpen={isModalOpen} onClose={closeModalHandler} />
    </React.Fragment>
  );
};

export default MainNavigation;
