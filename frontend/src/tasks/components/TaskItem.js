import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Importing Ant Design Icons
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import "./TaskItem.css";

const TaskItem = (props) => {
  console.log("TaskItem props:", props); // Debugging task item props

  const formattedDate = new Date(props.date).toLocaleDateString();

  return (
    <li className="task-item">
      <Card className="task-item__content">
        <div className="task-item__info">
          <h2>{props.title}</h2>
          <p>
            <strong>User:</strong> {props.user.name} {/* Display user's name */}
          </p>
          <p>
            <strong>Category:</strong> {props.category.name}{" "}
            {/* Display category name */}
          </p>
          <p>
            <strong>Status:</strong> {props.status ? "Completed" : "Pending"}
          </p>
          <p>
            <strong>Date:</strong> {formattedDate}
          </p>
          <p>
            <strong>Priority:</strong> {props.priority}
          </p>
          {/* Display task image if available */}
          {props.imageUrl && (
            <div className="task-item__image">
              <img src={props.imageUrl} alt={props.title} />
            </div>
          )}
        </div>
        <div className="task-item__actions">
          <Button to={`/tasks/${props.id}`} className="custom-button">
            <EditOutlined />
            <span>Edit</span>
          </Button>
          <Button danger className="custom-button">
            <DeleteOutlined />
            <span>Delete</span>
          </Button>
        </div>
      </Card>
    </li>
  );
};

export default TaskItem;
