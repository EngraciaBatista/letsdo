import React, { useEffect } from "react";
import { Form, Input, DatePicker, Button, Row, Col } from "antd";
import { PlusOutlined, EditOutlined, CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const AddTask = ({ onAdd, onEdit, onCancel, task, mode = "add" }) => {
  const [form] = Form.useForm();

  // If the form is in edit mode, populate the fields with the task data
  useEffect(() => {
    console.log("Task data received:", task); // Check task data

    if (mode === "edit" && task) {
      console.log("Populating form for edit:", task);
      form.setFieldsValue({
        title: task.title,
        progress: task.progress,
        date: task.date ? dayjs(task.date) : null, // Ensure valid date format
      });
    } else {
      form.resetFields(); // Reset form when in add mode
    }
  }, [mode, task, form]); // Dependencies

  const handleAdd = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form Values on Submit:", values); // Check the form values

        if (mode === "add") {
          onAdd({ ...values, date: values.date.format("YYYY-MM-DD") });
        } else if (mode === "edit" && task) {
          onEdit({
            ...values,
            id: task.id,
            date: values.date.format("YYYY-MM-DD"),
          });
        }
        form.resetFields(); // Reset form fields after adding or editing
      })
      .catch((info) => {
        console.log("Validation failed:", info);
      });
  };

  const buttonText = mode === "add" ? "Add Task" : "Save Changes";
  const buttonIcon = mode === "add" ? <PlusOutlined /> : <EditOutlined />;

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="title"
        label="Task Title"
        rules={[{ required: true, message: "Please enter a task title" }]}
      >
        <Input placeholder="Enter task title" />
      </Form.Item>

      <Form.Item
        name="progress"
        label="Progress"
        rules={[{ required: true, message: "Please enter the progress" }]}
      >
        <Input type="number" min={0} max={100} placeholder="Enter progress" />
      </Form.Item>

      <Form.Item
        name="date"
        label="Date"
        rules={[{ required: true, message: "Please select a date" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Row justify="space-between">
        <Col>
          <Button onClick={handleAdd} type="primary" icon={buttonIcon} block>
            {buttonText}
          </Button>
        </Col>
        <Col>
          <Button
            onClick={onCancel}
            type="default"
            icon={<CloseOutlined />}
            block
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AddTask;
