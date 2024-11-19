import React from "react";
import Card from "../../shared/components/UIElements/Card";
import TaskItem from "./TaskItem"; // Assuming TaskItem displays individual task details
import "./TaskList.css";

const TaskList = (props) => {
  console.log("TaskList props:", props); // Debugging props

  if (props.items.length === 0) {
    return (
      <div className="task-list center">
        <Card>
          <h2>No Tasks found. Maybe create one?</h2>
          <button>Share Task</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {props.items.map((task) => (
        <TaskItem
          key={task._id} // Ensure unique task id
          id={task._id}
          title={task.title}
          status={task.status}
          category={task.category}
          user={task.user}
          date={task.date}
          priority={task.priority}
          imageUrl={task.picture} // Passing the image URL as a prop
        />
      ))}
    </ul>
  );
};

export default TaskList;
