import React from "react";

const ProductForm = ({
  formData,
  categories,
  handleChange,
  handleSubmit,
  error,
  success,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          autoFocus
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={formData.quantity}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select
          name="category"
          className="form-control"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <div className="form-check">
          <input
            type="checkbox"
            name="shipping"
            className="form-check-input"
            onChange={handleChange}
            checked={formData.shipping}
          />
          <label className="form-check-label">Requires Shipping</label>
        </div>
      </div>
      <div className="form-group mt-3">
        <label className="text-muted">Photo</label>
        <div className="custom-file">
          <input
            type="file"
            name="photo"
            className="custom-file-input"
            id="customFile"
            onChange={handleChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {formData.photo ? formData.photo.name : "Choose file"}
          </label>
        </div>
      </div>
      <button className="btn btn-outline-primary mt-3">
        {formData._id ? "Update Product" : "Create Product"}
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && <div className="alert alert-info mt-3">{success}</div>}
    </form>
  );
};

export default ProductForm;
