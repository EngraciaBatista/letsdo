// components/PrivateRoute.js
import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { isAuthenticated } from "../http/auth";

const PrivateRoute = (props) => (
  <ProtectedRoute {...props} condition={isAuthenticated} redirectTo="/signin" />
);

export default PrivateRoute;
