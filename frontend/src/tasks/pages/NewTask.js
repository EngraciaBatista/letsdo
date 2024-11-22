


/// export default NewTask;
import React, { useState } from "react";
import { Form, Input, Select, DatePicker, Button, Modal, message } from "antd";
import useAddTask from "../../hooks/useAddTask";
import useUsers from "../../hooks/useUsers";
import useCategories from "../../hooks/useCategories";
import { useResetFormOnModalOpen } from "../../hooks/useResetFormOnModalOpen";

const { Option } = Select;

const NewTask = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addTask, isLoading } = useAddTask();
  const { users } = useUsers();
  const { categories } = useCategories();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Use the custom hook to reset form fields when modal opens
  useResetFormOnModalOpen(isModalOpen, form.resetFields);

  const onFinish = async (values) => {
    const taskData = {
      title: values.title,
      description: values.description,
      category: values.category,
      date: values.date ? values.date.toISOString() : null,
      priority: values.priority,
      user: values.user,
      picture: values.picture,
    };

    try {
      const response = await addTask(taskData);
      if (response && response.task) {
        message.success("Task added successfully!");
        closeModal();
      }
    } catch (err) {
      message.error(err.message || "Failed to add task.");
    }
  };

  return (
    <div>
      <Button type="primary" onClick={openModal}>
        Add Task
      </Button>

      <Modal
        title="Add New Task"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ priority: "Low" }}
        >
          {/* Title Input */}
          <Form.Item
            name="title"
            label="Title"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: "Please enter a title" },
              { min: 5, message: "Title must be at least 5 characters long" },
            ]}
          >
            <Input
              placeholder="Enter task title"
              onBlur={() => form.validateFields(["title"])}
            />
          </Form.Item>

          {/* Description Input */}
          <Form.Item
            name="description"
            label="Description"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: "Please enter a description" },
              {
                min: 5,
                message: "Description must be at least 5 characters long",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Enter task description"
              onBlur={() => form.validateFields(["description"])}
            />
          </Form.Item>

          {/* Picture URL Input */}
          <Form.Item
            name="picture"
            label="Picture URL"
            validateTrigger="onBlur"
            rules={[
              { required: true, message: "Please enter a picture URL" },
              { type: "url", message: "Please enter a valid URL" },
            ]}
          >
            <Input
              placeholder="Enter picture URL"
              onBlur={() => form.validateFields(["picture"])}
            />
          </Form.Item>

          {/* Category Select */}
          <Form.Item
            name="category"
            label="Category"
            validateTrigger="onBlur"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Select a category"
              onBlur={() => form.validateFields(["category"])}
              allowClear
            >
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Priority Select */}
          <Form.Item
            name="priority"
            label="Priority"
            validateTrigger="onBlur"
            rules={[{ required: true, message: "Please select a priority" }]}
          >
            <Select
              placeholder="Select priority"
              onBlur={() => form.validateFields(["priority"])}
              allowClear
            >
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>

          {/* User Select */}
          <Form.Item
            name="user"
            label="User"
            validateTrigger="onBlur"
            rules={[{ required: true, message: "Please assign a user" }]}
          >
            <Select
              placeholder="Assign to a user"
              onBlur={() => form.validateFields(["user"])}
              allowClear
            >
              {users.map((user) => (
                <Option key={user._id} value={user._id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Date Picker */}
          <Form.Item
            name="date"
            label="Date"
            validateTrigger="onBlur"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
              onBlur={() => form.validateFields(["date"])}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isLoading ? "Adding..." : "Add Task"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NewTask;
