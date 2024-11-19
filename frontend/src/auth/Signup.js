// import React from "react";
// import Layout from "../core/Layout";
// import useAuthForm from "../hooks/useAuthForm";

// function Signup() {
//   const {
//     email,
//     password,
//     handleChange,
//     handleSubmit,
//     showError,
//     showLoading,
//     redirectUser,
//   } = useAuthForm("signup");

//   const signupForm = () => (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label className="text-muted">Email</label>
//         <input
//           type="email"
//           className="form-control"
//           onChange={handleChange("email")}
//           value={email}
//         />
//       </div>
//       <div className="form-group">
//         <label className="text-muted">Password</label>
//         <input
//           type="password"
//           className="form-control"
//           onChange={handleChange("password")}
//           value={password}
//         />
//       </div>
//       <div className="form-group">
//         <button type="submit" className="btn btn-primary w-100">
//           Submit
//         </button>
//       </div>
//     </form>
//   );

//   return (
//     <Layout
//       title="Signup"
//       description="Signup to Node React E-Commerce App"
//       className="container col-md-8 offset-md-2"
//     >
//       {showError()}
//       {showLoading()}
//       {signupForm()}
//       {redirectUser()}
//     </Layout>
//   );
// }

// export default Signup;

import React from "react";
import Layout from "../core/Layout";
import useAuthForm from "../hooks/useAuthForm";

function Signup() {
  const {
    email,
    password,
    handleChange,
    handleSubmit,
    showError,
    showLoading,
    redirectUser,
  } = useAuthForm("signup");

  const signupForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="email"
          className="form-control"
          onChange={handleChange("name")}
          value={name}
        />
      </div>
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
      title="Signup"
      description="Signup to Node React E-Commerce App"
      className="container col-md-8 offset-md-2"
    >
      {/* {showError()}
      {showLoading()} */}
      {signupForm()}
      {/* {redirectUser()} */}
    </Layout>
  );
}

export default Signup;
