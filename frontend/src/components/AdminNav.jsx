import { React, useState } from "react";
import { Link, Outlet, useOutletContext, useLocation } from "react-router-dom";

const AdminNav = () => {
  const { user, setMessages } = useOutletContext();
  const location = useLocation();

  function activeStyle(path) {
    return location.pathname === path ? "active" : "";
  }

  return (
    <div>
      <div className="tabBtns">
        <Link to="/admin">
          <button className={`btn tasksBtn ${activeStyle("/admin")}`}>
            Past Tasks
          </button>
        </Link>
        <Link to="/admin/facilities">
          <button
            className={`btn notesBtn ${activeStyle("/admin/facilities")}`}
          >
            Facilities
          </button>
        </Link>
        <Link to="/admin/employees">
          <button className={`btn pettyBtn ${activeStyle("/admin/employees")}`}>
            Employees
          </button>
        </Link>
      </div>
      <Outlet context={{ user }} />
    </div>
  );
};

export default AdminNav;
