import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [facility, setFacility] = useState("");
  const facilities = ["Facility 1", "Facility 2", "Facility 3"];

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        facility,
      }),
    });

    const data = await response.json();

    if (data.msg) {
      alert(data.msg);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={facility} onChange={(e) => setFacility(e.target.value)}>
          {facilities.map((facility, index) => (
            <option key={index} value={facility}>
              {facility}
            </option>
          ))}
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
