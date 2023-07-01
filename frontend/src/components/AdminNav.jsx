import { React, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";

const AdminNav = () => {
  const { user, setMessages } = useOutletContext();
  const [isActive, setIsActive] = useState({
    facilitiesActive: true,
    pastTasksActive: false,
    employeesActiveActive: false,
  });
  function changeTab(key) {
    setIsActive({
      facilitiesActive: key === "tasksActive",
      pastTasksActive: key === "notesActive",
      employeesActive: key === "pettyActive",
    });
  }
  return (
    <div>
      <div className="tabBtns">
        <Link to="/admin">
          <button
            className="btn tasksBtn"
            onClick={() => changeTab("tasksActive")}
          >
            Past Tasks
          </button>
        </Link>
        <Link to="/admin/facilities">
          <button
            className="btn notesBtn"
            onClick={() => changeTab("notesActive")}
          >
            Facilities
          </button>
        </Link>
        <Link to="/admin/employees">
          <button
            className="btn pettyBtn"
            onClick={() => changeTab("pettyActive")}
          >
            Employees
          </button>
        </Link>
      </div>
      <Outlet context={{ user }} />
    </div>
  );
};

export default AdminNav;
