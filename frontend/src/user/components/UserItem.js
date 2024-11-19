import React from "react";
import { Link } from "react-router-dom";
import { Card, Avatar } from "antd"; // Importing Ant Design components
import { UserOutlined } from "@ant-design/icons"; // Importing Ant Design icons

import "./UserItem.css";

const UserItem = (props) => {
  // Check photo URL
  console.log(props.photo);

  return (
    <li className="user-item">
      <Card className="user-item__content" hoverable>
        <Link to={`/${props.id}/users`}>
          <div className="user-item__image">
            <Avatar
              size={64}
              src={props.photo || null} // If no photo, it falls back to the icon
              alt={props.name}
              icon={<UserOutlined />} // Default icon if no image is provided
            />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>{props.email}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
