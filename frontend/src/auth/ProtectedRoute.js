// components/ProtectedRoute.js
import React from "react";
import { isAuthenticated } from "../http/auth";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  condition,
  redirectTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      condition() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: redirectTo, state: { from: props.location } }}
        />
      )
    }
  />
);

export default ProtectedRoute;
