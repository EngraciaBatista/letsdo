import { useState } from "react";
import React from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, task, getData }) => {
  const [cookies, setCookies, removeCookies] = useCookies(null);
  const editMode = mode === "edit";

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date().toISOString(), // Convert date to ISO string for submission
  });

  const postData = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Success:", responseData);
        setShowModal(false);
        getData(); // Re-fetch data to get updated todos
      } else {
        console.log("Failed to create todo:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editData = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        {
          // Pass the task id in the URL for editing
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Success:", responseData);
        setShowModal(false);
        getData(); // Re-fetch data to get updated todos
      } else {
        console.log("Failed to update todo:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form onSubmit={editMode ? editData : postData}>
          {" "}
          {/* Conditionally call editData or postData */}
          <input
            required
            maxLength={30}
            placeholder=" Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            type="range"
            required
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input type="submit" className={mode} />
        </form>
      </div>
    </div>
  );
};

export default Modal;
