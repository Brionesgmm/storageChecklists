import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dailyTasks");

  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/logout", {
      method: "POST",
    }).then(() => navigate("/"));
  };

  return (
    <div>
      <header>
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <nav>
        <ul>
          <li>
            <Link to="#" onClick={() => setActiveTab("dailyTasks")}>
              Daily Tasks
            </Link>
          </li>
          <li>
            <Link to="#" onClick={() => setActiveTab("notes")}>
              Notes
            </Link>
          </li>
          <li>
            <Link to="#" onClick={() => setActiveTab("pettyCash")}>
              Petty Cash
            </Link>
          </li>
        </ul>
      </nav>

      {activeTab === "dailyTasks" && <div>Daily Tasks Tab</div>}
      {activeTab === "notes" && <div>Notes Tab</div>}
      {activeTab === "pettyCash" && <div>Petty Cash Tab</div>}
    </div>
  );
};

export default Dashboard;
