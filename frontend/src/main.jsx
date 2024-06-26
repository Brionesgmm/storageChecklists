import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Root from "./routes/Root";
import ErrorPage from "./routes/Error";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Index from "./routes/Index";
import Profile from "./routes/Profile";
import Logout from "./routes/Logout";
import Feed from "./routes/Feed";
import Post from "./routes/Post";
import FormContainer from "./routes/FormContainer";
import TasksList from "./routes/TasksList";
import PastTasks from "./routes/PastTasks";
import Facilities from "./routes/Facilities";
import AdminNav from "./components/AdminNav";
import Employees from "./routes/Employees";
import FacilityNav from "./components/FacilityNav";
import FacilitySheet from "./routes/FacilitySheet";
import Auctions from "./routes/Auctions";
import ScheduleEmptyTask from "./components/ScheduleEmptyTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/scheduleEmptyTask",
        element: <ScheduleEmptyTask />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: <FacilityNav />,
        children: [
          {
            index: true,
            element: <TasksList />,
          },
          {
            path: "facilitysheet",
            element: <FacilitySheet />,
          },
          { path: "pastTasks", element: <PastTasks /> },
          { path: "auctions", element: <Auctions /> },
        ],
      },
      {
        path: "/pastTasks",
        element: <PastTasks />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/post/:id",
        element: <Post />,
      },
      {
        path: "/admin",
        element: <AdminNav />,
        children: [
          {
            index: true,
            element: <PastTasks />,
          },
          {
            path: "facilities",
            element: <Facilities />,
          },
          { path: "employees", element: <Employees /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
