// components/AdminRoute.js
import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { isAuthenticated } from "../http/auth";

const AdminRoute = (props) => (
  <ProtectedRoute
    {...props}
    condition={() => isAuthenticated() && isAuthenticated().user.role === 1}
    redirectTo="/signin"
  />
);

export default AdminRoute;
