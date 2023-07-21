import React from "react";
import { Link, Outlet, useOutletContext, useLocation } from "react-router-dom";

const FacilityNav = () => {
  const { user } = useOutletContext();

  const location = useLocation();

  function activeStyle(path) {
    return location.pathname === path ? "active" : "";
  }

  return (
    <div>
      <div className="tabBtns">
        <Link to="/profile">
          <button className={`btn tasksBtn ${activeStyle("/profile")}`}>
            Current Daily Tasks
          </button>
        </Link>
        <Link to="/admin">
          <button className={`btn tasksBtn ${activeStyle("/admin")}`}>
            Admin Area
          </button>
        </Link>
        <Link to="/admin/facilities">
          <button
            className={`btn notesBtn ${activeStyle("/admin/facilities")}`}
          >
            Past Daily Tasks
          </button>
        </Link>
        <Link to="/profile/facilitysheet">
          <button
            className={`btn pettyBtn ${activeStyle("/profile/facilitysheet")}`}
          >
            Site Info Sheet
          </button>
        </Link>
      </div>
      <Outlet context={{ user }} />
    </div>
  );
};

export default FacilityNav;
