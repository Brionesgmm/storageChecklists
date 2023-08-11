import React from "react";
import { Link, Outlet, useOutletContext, useLocation } from "react-router-dom";

const FacilityNav = () => {
  const { user } = useOutletContext();

  const location = useLocation();

  function activeStyle(path) {
    return location.pathname === path ? "active" : "";
  }

  if (!user) {
    return null; // or render a loading state
  }

  return (
    <div>
      <div className="tabBtns">
        {user.isAdmin && (
          <Link to="/admin">
            <button className={`btn tasksBtn ${activeStyle("/admin")}`}>
              Admin Area
            </button>
          </Link>
        )}
        <Link to="/profile">
          <button className={`btn tasksBtn ${activeStyle("/profile")}`}>
            Current Daily Tasks
          </button>
        </Link>
        <Link to="/profile/auctions">
          <button
            className={`btn notesBtn ${activeStyle("/profile/auctions")}`}
          >
            Auctions
          </button>
        </Link>
        <Link to="/profile/pastTasks">
          <button
            className={`btn notesBtn ${activeStyle("/profile/pastTasks")}`}
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
