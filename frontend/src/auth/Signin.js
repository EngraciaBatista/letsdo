import React from "react";
import Layout from "../core/Layout";
import useAuthForm from "../hooks/useAuthForm";

function Signin() {
  const {
    email,
    password,
    handleChange,
    handleSubmit,
    showError,
    showLoading,
    redirectUser,
  } = useAuthForm("signin");

  const signinForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          onChange={handleChange("email")}
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          className="form-control"
          onChange={handleChange("password")}
          value={password}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <Layout
      title="Signin"
      description="Signin to Node React E-Commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showError()}
      {showLoading()}
      {signinForm()}
      {redirectUser()}
    </Layout>
  );
}

export default Signin;
