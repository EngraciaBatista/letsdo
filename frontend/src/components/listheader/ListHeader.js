import React from "react";
import { Button, Typography } from "antd";
import { PlusOutlined, LogoutOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ListHeader = ({ listName = "Holiday Tick List", onTaskAdd }) => {
  const signOut = () => {
    console.log("signout");
  };

  return (
    <div className="list-header">
      <Title level={3} style={{ marginBottom: "10px" }}>
        {listName}
      </Title>
      <div className="button-container">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginRight: "5px" }}
          onClick={() => onTaskAdd()} // Trigger modal for adding task
        >
          Add New
        </Button>

        <Button type="default" onClick={signOut} icon={<LogoutOutlined />}>
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default ListHeader;
