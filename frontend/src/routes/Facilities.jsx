import { React, useState, useEffect } from "react";

const Facilities = () => {
  const [allFacilities, setAllFacilities] = useState([]);
  const [employeeNames, setEmployeeNames] = useState({});
  const [newFacilityName, setNewFacilityName] = useState("");
  const [newFacilityAddress, setNewFacilityAddress] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch("/api/facilities");
      const data = await response.json();
      console.log(data);
      setAllFacilities(data);
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchEmployeeNames = async () => {
      let newEmployeeNames = {};
      for (const facility of allFacilities) {
        if (facility.employees && facility.employees.length > 0) {
          for (const employeeId of facility.employees) {
            const response = await fetch(`/api/formUserInfo/${employeeId}`);
            const data = await response.json();
            console.log(data);
            newEmployeeNames[employeeId] = data.userName;
          }
        }
      }
      setEmployeeNames(newEmployeeNames);
      console.log(newEmployeeNames);
    };

    if (allFacilities.length > 0) {
      fetchEmployeeNames();
    }
  }, [allFacilities]);

  const addFacility = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/createFacility", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newFacilityName,
        address: newFacilityAddress,
        employees: [],
      }),
    });

    if (!response.ok) {
      // handle error
      console.error("There was an error adding the facility");
      return;
    }

    const { facility } = await response.json();

    setAllFacilities([...allFacilities, facility]);
    setNewFacilityName("");
    setNewFacilityAddress("");
    setShowForm(false);
  };

  const deleteFacility = async (event, facilityId, facilityName) => {
    event.preventDefault();

    const confirmed = window.confirm(
      `Are you sure you want to delete ${facilityName}?`
    );
    if (!confirmed) {
      return; // Abort if the user cancels the deletion
    }

    const form = event.currentTarget;
    const response = await fetch(form.action, {
      method: form.method,
    });
    if (response.ok) {
      setAllFacilities(
        allFacilities.filter((facility) => facility._id !== facilityId)
      );
    } else {
      console.error("There was an error deleting the facility");
    }
  };

  const facilitiesElement = allFacilities.map((facility) => {
    const employeeElements =
      facility.employees && facility.employees.length > 0 ? (
        facility.employees.map((employeeId) => (
          <h3 key={employeeId}>{employeeNames[employeeId]}</h3>
        ))
      ) : (
        <h3>No employees</h3>
      );
    console.log(facility._id);
    return (
      <div className="facility" key={facility._id}>
        <h2>{facility.name}</h2>
        <h2>{facility.address}</h2>
        <div>{employeeElements}</div>
        <form
          action={`/api/deleteFacility/${facility._id}?_method=DELETE`}
          method="POST"
          className="col-3"
          onSubmit={(event) =>
            deleteFacility(event, facility._id, facility.name)
          }
        >
          <button
            className="btn btn-primary fa fa-trash"
            type="submit"
          ></button>
        </form>
      </div>
    );
  });

  return (
    <div>
      {facilitiesElement}
      {showForm && (
        <form onSubmit={addFacility}>
          <label>
            Name:
            <input
              type="text"
              name="facilityName"
              value={newFacilityName}
              onChange={(e) => setNewFacilityName(e.target.value)}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="facilityAddress"
              value={newFacilityAddress}
              onChange={(e) => setNewFacilityAddress(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
      <button className="addFacilityBtn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add New Facility"}
      </button>
    </div>
  );
};

export default Facilities;
