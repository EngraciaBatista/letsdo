import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminRoute from "../auth/AdminRoute";
import AdminDashboard from "../user/AdminDashboard";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";

function AdminRoutes() {
  return (
    <Switch>
      <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
      <AdminRoute path="/admin/create/category" exact component={AddCategory} />
      <AdminRoute path="/admin/create/task" exact component={AddTask} />
    </Switch>
  );
}

export default AdminRoutes;
