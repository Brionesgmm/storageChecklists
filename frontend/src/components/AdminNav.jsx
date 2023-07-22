import { React, useState } from "react";
import { Link, Outlet, useOutletContext, useLocation } from "react-router-dom";

const AdminNav = () => {
  const { user, setMessages } = useOutletContext();
  const location = useLocation();
  console.log(user);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  // If the user data has been fetched, but the user is not an admin
  if (!user.isAdmin) {
    return <h1>You don't have access to this page.</h1>;
  }
  function activeStyle(path) {
    return location.pathname === path ? "active" : "";
  }

  return (
    <div>
      <div className="tabBtns">
        <Link to="/profile">
          <button className={`btn tasksBtn ${activeStyle("/profile")}`}>
            Facility Profile
          </button>
        </Link>
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
