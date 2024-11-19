import React, { useState } from "react";
import { Typography } from "antd";
import ListHeader from "../listheader/ListHeader";
import CustomModal from "../modal/CustomModal";
import AddTask from "../addtask/AddTask";
import ListItem from "../listitem/ListItem"; // Import ListItem component

const { Title } = Typography;

const TaskList = ({ tasks, onTaskAdd, onTaskEdit, onTaskDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState("add");
  const [taskToEdit, setTaskToEdit] = useState(null);

  const showModal = (mode, task = null) => {
    setMode(mode);
    setTaskToEdit(task);
    setIsModalVisible(true);
  };

  const handleAddTask = (task) => {
    onTaskAdd(task);
    setIsModalVisible(false);
  };

  const handleEditTask = (task) => {
    onTaskEdit(task);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setTaskToEdit(null); // Clear task to edit on cancel
  };

  return (
    <div className="task-list">
      <ListHeader
        tasks={tasks}
        onTaskAdd={() => showModal("add")} // Show modal for adding task
        onTaskEdit={showModal} // Pass showModal for editing tasks
      />

      <div className="task-items">
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            task={task}
            onEdit={showModal} // Trigger edit modal
            onDelete={onTaskDelete} // Handle delete action
          />
        ))}
      </div>

      {/* Custom Modal for adding and editing tasks */}
      <CustomModal
        visible={isModalVisible}
        onClose={handleCancel}
        title={mode === "add" ? "Add New Task" : "Edit Task"}
        content={
          <AddTask
            mode={mode}
            task={taskToEdit}
            onAdd={handleAddTask}
            onEdit={handleEditTask}
            onCancel={handleCancel}
          />
        }
      />
    </div>
  );
};

export default TaskList;
