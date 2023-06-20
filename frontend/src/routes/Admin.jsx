import { React, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Admin = () => {
  const { user, setMessages } = useOutletContext();
  const [properties, setProperties] = useState([]);
  console.log(user);

  // get list of facilities
  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch("/api/facilities");
      const data = await response.json();
      console.log(data);
      setProperties(data);
    };

    fetchProperties();
  }, []);

  return (
    <>
      <div className="mb-3">
        <label htmlFor="property" className="form-label">
          Property
        </label>
        <select className="form-select" id="property" name="property">
          <option value="">Select a property</option>
          {properties.map((property) => (
            <option value={property._id} key={property._id}>
              {property.name}
            </option>
          ))}
        </select>
      </div>
      {!user.isAdmin && <h1>You don't have access to this page.</h1>}
    </>
  );
};

export default Admin;
