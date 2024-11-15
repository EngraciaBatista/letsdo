import React, { useState } from "react";
import { isAuthenticated } from "../http/auth";
import Layout from "../core/Layout";
import { createCategory } from "../http/category";
import { Link } from "react-router-dom";

function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const result = await createCategory(user._id, token, { name });

      if (result.error) {
        setError(
          result.error.includes("duplicate key error")
            ? "Category must be unique"
            : "An unexpected error occurred. Please try again."
        );
        setTimeout(() => {
          setError("");
          setName("");
        }, 3000);
      } else {
        setSuccess(`Category "${name}" created successfully!`);
        setTimeout(() => {
          setSuccess("");
          setName(""); // Clear input field along with success message
        }, 3000);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setTimeout(() => {
        setError("");
        setName(""); // Clear input field along with error message
      }, 3000);
    }
  };

  return (
    <Layout title="Add Category" description={`Hello ${user.name}`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-info">{success}</div>}
          <div className="mb-3">
            <Link to="/admin/dashboard" className="btn btn-outline-warning">
              Back to Dashboard
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={name}
                autoFocus
              />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AddCategory;
