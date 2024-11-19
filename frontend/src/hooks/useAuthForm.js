import { useState } from "react";
import { Redirect } from "react-router-dom";
import { signin, signup, authenticate, isAuthenticated } from "../http/auth";

const useAuthForm = (authType) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value, error: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });
    try {
      const data =
        authType === "signin"
          ? await signin({ email, password })
          : await signup({ email, password });
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    } catch (err) {
      setValues({ ...values, error: err.message, loading: false });
    }
  };

  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading..</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (authType === "signin") {
        return <Redirect to="/" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
    return null;
  };

  return {
    email,
    password,
    handleChange,
    handleSubmit,
    showError,
    showLoading,
    redirectUser,
  };
};

export default useAuthForm;
