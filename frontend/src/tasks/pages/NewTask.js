// import React, { useState } from "react";
// import { Form, Input, DatePicker, Select, Button, Modal, message } from "antd";
// import useAddTask from "../../hooks/useAddTask"; // Import your custom hook
// import useUsers from "../../hooks/useUsers"; // Assuming you have this hook
// import useCategories from "../../hooks/useCategories"; // Assuming you have this hook

// const { TextArea } = Input;
// const { Option } = Select;

// const NewTask = () => {
//   const [form] = Form.useForm(); // Create form instance
//   const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
//   const { addTask, isLoading, error: addTaskError } = useAddTask(); // Use the addTask hook
//   const { users, loading: loadingUsers, error: usersError } = useUsers();
//   const {
//     categories,
//     loading: loadingCategories,
//     error: categoriesError,
//   } = useCategories();

//   // Open the modal when clicking the button
//   const openModal = () => setIsModalOpen(true);

//   // Close modal when clicking outside the modal or Cancel
//   const closeModal = () => setIsModalOpen(false);

//   // Handle form submission
//   const onFinish = async (values) => {
//     const taskData = {
//       title: values.title,
//       description: values.description,
//       category: values.category,
//       date: values.date.toISOString(), // Convert date to string format
//       priority: values.priority,
//       user: values.user,
//       picture: values.picture, // Add picture URL field
//     };

//     try {
//       const response = await addTask(taskData); // Call addTask function from the hook

//       // Log the entire response to inspect its structure
//       console.log("Task response:", response);

//       // Assuming response contains a 'task' object if successful
//       if (response && response.task) {
//         message.success("Task added successfully!"); // Show success message
//         closeModal(); // Close the modal after submission
//         form.resetFields(); // Reset the form fields
//       } else {
//         throw new Error(response?.message || "Failed to add task."); // Handle unsuccessful response
//       }
//     } catch (err) {
//       message.error(err.message || "An error occurred while adding the task."); // Show error message
//     }
//   };

//   // Display loading state for users and categories
//   if (loadingUsers || loadingCategories) {
//     return <p>Loading...</p>;
//   }

//   // Handle errors from data fetching
//   if (usersError || categoriesError) {
//     return <p>Error: {usersError || categoriesError}</p>;
//   }

//   return (
//     <div>
//       {/* The button to open the modal */}
//       <Button type="primary" onClick={openModal}>
//         Add Task
//       </Button>

//       {/* Modal controls the visibility of the form */}
//       <Modal
//         title="Add New Task"
//         open={isModalOpen} // Use `open` instead of `visible` in newer Ant Design versions
//         onCancel={closeModal} // Close modal when cancel is clicked
//         footer={null} // Hide default footer
//       >
//         <Form
//           form={form}
//           onFinish={onFinish}
//           layout="vertical"
//           initialValues={{
//             priority: "Medium", // Default value for the priority
//           }}
//         >
//           {/* Title */}
//           <Form.Item
//             name="title"
//             label="Title"
//             rules={[
//               { required: true, message: "Please enter a title" },
//               { min: 5, message: "Title must be at least 5 characters" },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           {/* Description */}
//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[
//               { required: true, message: "Please enter a description" },
//               { min: 5, message: "Description must be at least 5 characters" },
//             ]}
//           >
//             <TextArea rows={4} />
//           </Form.Item>

//           {/* Picture URL */}
//           <Form.Item
//             name="picture"
//             label="Picture URL"
//             rules={[
//               { type: "url", message: "Please enter a valid URL" },
//               { required: true, message: "Please enter a picture URL" },
//             ]}
//           >
//             <Input placeholder="https://example.com/image.jpg" />
//           </Form.Item>

//           {/* Category */}
//           <Form.Item
//             name="category"
//             label="Category"
//             rules={[{ required: true, message: "Please select a category" }]}
//           >
//             <Select placeholder="Select a category">
//               {categories.map((category) => (
//                 <Option key={category._id} value={category._id}>
//                   {category.name}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           {/* User */}
//           <Form.Item
//             name="user"
//             label="User"
//             rules={[{ required: true, message: "Please select a user" }]}
//           >
//             <Select placeholder="Assign to a user">
//               {users.map((user) => (
//                 <Option key={user._id} value={user._id}>
//                   {user.name}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           {/* Date */}
//           <Form.Item
//             name="date"
//             label="Date"
//             rules={[{ required: true, message: "Please select a date" }]}
//           >
//             <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
//           </Form.Item>

//           {/* Priority */}
//           <Form.Item name="priority" label="Priority">
//             <Select>
//               <Option value="High">High</Option>
//               <Option value="Medium">Medium</Option>
//               <Option value="Low">Low</Option>
//             </Select>
//           </Form.Item>

//           {/* Submit Button */}
//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={isLoading}>
//               {isLoading ? "Adding..." : "Add Task"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default NewTask;

// import React, { useState } from "react";
// import { Form, Select, DatePicker, Button, Modal, message } from "antd";
// import AntdInputWrapper from "../../shared/components/FormElements/AntdInputWrapper"; // Import the wrapper
// import useAddTask from "../../hooks/useAddTask";
// import useUsers from "../../hooks/useUsers";
// import useCategories from "../../hooks/useCategories";
// import {
//   VALIDATOR_REQUIRE,
//   VALIDATOR_MINLENGTH,
//   VALIDATOR_URL,
// } from "../../shared/util/validator";

// const { Option } = Select;

// const NewTask = () => {
//   const [form] = Form.useForm();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { addTask, isLoading } = useAddTask();
//   const { users, loading: loadingUsers } = useUsers();
//   const { categories, loading: loadingCategories } = useCategories();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const onFinish = async (values) => {
//     const taskData = {
//       title: values.title,
//       description: values.description,
//       category: values.category,
//       date: values.date.toISOString(),
//       priority: values.priority,
//       user: values.user,
//       picture: values.picture,
//     };

//     try {
//       const response = await addTask(taskData);
//       if (response && response.task) {
//         message.success("Task added successfully!");
//         closeModal();
//         form.resetFields();
//       }
//     } catch (err) {
//       message.error(err.message || "Failed to add task.");
//     }
//   };

//   return (
//     <div>
//       <Button type="primary" onClick={openModal}>
//         Add Task
//       </Button>

//       <Modal
//         title="Add New Task"
//         open={isModalOpen}
//         onCancel={closeModal}
//         footer={null}
//       >
//         <Form form={form} onFinish={onFinish} layout="vertical">
//           <AntdInputWrapper
//             name="title"
//             label="Title"
//             validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
//             errorText="Please enter a valid title (min 5 characters)"
//           />

//           <AntdInputWrapper
//             name="description"
//             label="Description"
//             element="textarea"
//             validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
//             errorText="Please enter a valid description (min 5 characters)"
//           />

//           <AntdInputWrapper
//             name="picture"
//             label="Picture URL"
//             validators={[VALIDATOR_REQUIRE(), VALIDATOR_URL()]}
//             errorText="Please enter a valid URL"
//           />

//           <Form.Item
//             name="category"
//             label="Category"
//             rules={[{ required: true }]}
//           >
//             <Select placeholder="Select a category">
//               {categories.map((category) => (
//                 <Option key={category._id} value={category._id}>
//                   {category.name}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item name="user" label="User" rules={[{ required: true }]}>
//             <Select placeholder="Assign to a user">
//               {users.map((user) => (
//                 <Option key={user._id} value={user._id}>
//                   {user.name}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item name="date" label="Date" rules={[{ required: true }]}>
//             <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={isLoading}>
//               {isLoading ? "Adding..." : "Add Task"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default NewTask;
// import React, { useState } from "react";
// import { Form, Input, Select, DatePicker, Button, Modal, message } from "antd";
// import useAddTask from "../../hooks/useAddTask";
// import useUsers from "../../hooks/useUsers";
// import useCategories from "../../hooks/useCategories";

// const { Option } = Select;

// const NewTask = () => {
//   const [form] = Form.useForm();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { addTask, isLoading } = useAddTask();
//   const { users } = useUsers();
//   const { categories } = useCategories();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const onFinish = async (values) => {
//     const taskData = {
//       title: values.title,
//       description: values.description,
//       category: values.category,
//       date: values.date ? values.date.toISOString() : null,
//       priority: values.priority,
//       user: values.user,
//       picture: values.picture,
//     };

//     try {
//       const response = await addTask(taskData);
//       if (response && response.task) {
//         message.success("Task added successfully!");
//         closeModal();
//         form.resetFields();
//       }
//     } catch (err) {
//       message.error(err.message || "Failed to add task.");
//     }
//   };

//   return (
//     <div>
//       <Button type="primary" onClick={openModal}>
//         Add Task
//       </Button>

//       <Modal
//         title="Add New Task"
//         open={isModalOpen}
//         onCancel={closeModal}
//         footer={null}
//       >
//         <Form
//           form={form}
//           onFinish={onFinish}
//           layout="vertical"
//           initialValues={{ priority: "Low" }}
//         >
//           {/* Title Input */}
//           <Form.Item
//             name="title"
//             label="Title"
//             validateTrigger="onBlur"
//             rules={[
//               { required: true, message: "Please enter a title" },
//               { min: 5, message: "Title must be at least 5 characters long" },
//             ]}
//           >
//             <Input
//               placeholder="Enter task title"
//               onBlur={() => form.validateFields(["title"])}
//             />
//           </Form.Item>

//           {/* Description Input */}
//           <Form.Item
//             name="description"
//             label="Description"
//             validateTrigger="onBlur"
//             rules={[
//               { required: true, message: "Please enter a description" },
//               {
//                 min: 5,
//                 message: "Description must be at least 5 characters long",
//               },
//             ]}
//           >
//             <Input.TextArea
//               placeholder="Enter task description"
//               onBlur={() => form.validateFields(["description"])}
//             />
//           </Form.Item>

//           {/* Picture URL Input */}
//           <Form.Item
//             name="picture"
//             label="Picture URL"
//             validateTrigger="onBlur"
//             rules={[
//               { required: true, message: "Please enter a picture URL" },
//               { type: "url", message: "Please enter a valid URL" },
//             ]}
//           >
//             <Input
//               placeholder="Enter picture URL"
//               onBlur={() => form.validateFields(["picture"])}
//             />
//           </Form.Item>

//           {/* Category Select */}
//           <Form.Item
//             name="category"
//             label="Category"
//             validateTrigger="onBlur"
//             rules={[{ required: true, message: "Please select a category" }]}
//           >
//             <Select
//               placeholder="Select a category"
//               onBlur={() => form.validateFields(["category"])}
//               allowClear
//             >
//               {categories.map((category) => (
//                 <Option key={category._id} value={category._id}>
//                   {category.name}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           {/* Priority Select */}
//           <Form.Item
//             name="priority"
//             label="Priority"
//             validateTrigger="onBlur"
//             rules={[{ required: true, message: "Please select a priority" }]}
//           >
//             <Select
//               placeholder="Select priority"
//               onBlur={() => form.validateFields(["priority"])}
//               allowClear
//             >
//               <Option value="Low">Low</Option>
//               <Option value="Medium">Medium</Option>
//               <Option value="High">High</Option>
//             </Select>
//           </Form.Item>

//           {/* User Select */}
//           <Form.Item
//             name="user"
//             label="User"
//             validateTrigger="onBlur"
//             rules={[{ required: true, message: "Please assign a user" }]}
//           >
//             <Select
//               placeholder="Assign to a user"
//               onBlur={() => form.validateFields(["user"])}
//               allowClear
//             >
//               {users.map((user) => (
//                 <Option key={user._id} value={user._id}>
//                   {user.name}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           {/* Date Picker */}
//           <Form.Item
//             name="date"
//             label="Date"
//             validateTrigger="onBlur"
//             rules={[{ required: true, message: "Please select a date" }]}
//           >
//             <DatePicker
//               format="YYYY-MM-DD"
//               style={{ width: "100%" }}
//               onBlur={() => form.validateFields(["date"])}
//             />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={isLoading}>
//               {isLoading ? "Adding..." : "Add Task"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default NewTask;
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
