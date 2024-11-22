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
import { useModal } from "../../../context/modalContext";

const { Search } = Input;

const MainNavigation = (props) => {
  const { isModalOpen, openModal, closeModal } = useModal(); // Use modal context

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const onSearch = (value) => {
    console.log("Search:", value);
  };

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
          <NavLinks onOpenModal={openModal} />
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

        <div className="main-navigation__left">
          <h1 className="main-navigation__title">
            <Link to="/">
              <Image
                src="/letsdologo_header.png"
                preview={false}
                width={100}
                style={{ height: "auto", objectFit: "contain" }}
              />
            </Link>
          </h1>
          <nav className="main-navigation__links">
            <NavLinks onOpenModal={openModal} />
          </nav>
        </div>

        <Search
          placeholder="Search tasks..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={onSearch}
          style={{ width: 250, marginLeft: "auto", marginRight: 20 }}
        />

        <Dropdown overlay={avatarMenu} placement="bottomRight" arrow>
          <Avatar
            size={40}
            icon={<UserOutlined />}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRssheQPDCSbStxbdekMJibvC2mqwaRmPbyow&s"
            style={{ cursor: "pointer" }}
          />
        </Dropdown>
      </MainHeader>

      <NewTask isModalOpen={isModalOpen} onClose={closeModal} />
    </React.Fragment>
  );
};

export default MainNavigation;

