import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Messages from "../components/Messages";
import { useEffect } from "react";

function Root() {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState({});
  console.log(user);
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((res) => setUser(res.user));
  }, []);

  return (
    <>
      <header className="container siteHeader">
        <div className="centerContainer">
          <h1>
            <Link to={user ? "/profile" : "/"}>Storage Facility Tracker</Link>
          </h1>
        </div>
        {user && (
          <Link to="/logout" className="btn btn-primary logout">
            Logout
          </Link>
        )}
      </header>
      <Messages messages={messages} />
      <Outlet context={{ user, setUser, setMessages }} />
    </>
  );
}

export default Root;
