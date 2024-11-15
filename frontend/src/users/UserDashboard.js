import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../http/auth";
import DashboardSection from "./DashboardSection";

function UserDashboard() {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const userLinks = [
    { path: "/cart", label: "My Cart" },
    { path: "/profile/update", label: "Update Profile" },
  ];

  const taskHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Task History</h3>
        <ul className="list-group">
          <li className="list-group-item">History</li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`Hello ${name}`}
      className="container"
    >
      <DashboardSection
        user={{ _id, name, email, role }}
        links={userLinks}
        linksHeader="User Links"
      />
      <div className="col-9">{taskHistory()}</div>
    </Layout>
  );
}

export default UserDashboard;
