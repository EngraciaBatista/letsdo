// components/DashboardSection.js
import React from "react";
import { Link } from "react-router-dom";

const DashboardSection = ({ user, links, linksHeader }) => {
  return (
    <div className="row">
      <div className="col-3">
        <div className="card">
          <h4 className="card-header">{linksHeader}</h4>
          <ul className="list-group">
            {links.map((link, index) => (
              <li key={index} className="list-group-item">
                <Link to={link.path} className="nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-9">
        <div className="card mb-5">
          <h3 className="card-header">User Information</h3>
          <ul className="list-group">
            <li className="list-group-item">{user.name}</li>
            <li className="list-group-item">{user.email}</li>
            <li className="list-group-item">
              {user.role === 1 ? "Admin" : "Registered User"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
