import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../http/auth";
import DashboardSection from "./DashboardSection";

function AdminDashboard() {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = [
    { path: "/admin/create/category", label: "Create Category" },
    { path: "/admin/create/product", label: "Create Product" },
  ];

  return (
    <Layout
      title="Admin Dashboard"
      description={`Hello ${name}`}
      className="container"
    >
      <DashboardSection
        user={{ _id, name, email, role }}
        links={adminLinks}
        linksHeader="Admin Links"
      />
    </Layout>
  );
}

export default AdminDashboard;
