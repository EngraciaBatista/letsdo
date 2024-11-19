import React from "react";
import { Button, Card } from "antd"; // Import Ant Design Card
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Import Ant Design icons
import "./ListItem.css";
import ProgressBar from "../progressbar/ProgressBar";
import TickIcon from "../tickicon/TickIcon";

const ListItem = ({ task, onEdit, onDelete }) => {
  return (
    <Card className="list-item" style={{ margin: "10px 0" }}>
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar />
      </div>
      <div className="button-container">
        <Button
          className="edit"
          type="primary"
          icon={<EditOutlined />}
          onClick={() => onEdit(task)} // Trigger onEdit with the current task
        />
        <Button
          className="delete"
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => onDelete(task.id)} // Trigger onDelete with the task id
        />
      </div>
    </Card>
  );
};

export default ListItem;
