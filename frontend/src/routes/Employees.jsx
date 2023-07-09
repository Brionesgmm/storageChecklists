import { React, useState, useEffect } from "react";

const Facilities = () => {
  const [allFacilities, setAllFacilities] = useState([]);
  const [employeeNames, setEmployeeNames] = useState({});
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [editEmployeeName, setEditEmployeeName] = useState("");
  const [editIsAdmin, setEditIsAdmin] = useState(false);
  const [editFacilityId, setEditFacilityId] = useState("");
  const [initialEmployeeName, setInitialEmployeeName] = useState("");
  const [initialIsAdmin, setInitialIsAdmin] = useState(false);
  const [initialFacilityId, setInitialFacilityId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [employeeUpdate, setEmployeeUpdate] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch("/api/facilities");
      const data = await response.json();
      console.log(data);
      setAllFacilities(data);
      setEmployeeUpdate(false);
    };

    fetchProperties();
  }, [employeeUpdate]);

  useEffect(() => {
    const fetchEmployeeNames = async () => {
      let newEmployeeNames = {};
      const promises = [];

      for (const facility of allFacilities) {
        if (facility.employees && facility.employees.length > 0) {
          for (const employeeId of facility.employees) {
            promises.push(fetch(`/api/formUserInfo/${employeeId}`));
          }
        }
      }

      const responses = await Promise.all(promises);

      for (let response of responses) {
        if (!response.ok) {
          console.error(`Error with status ${response.status}`);
          continue;
        }

        const data = await response.json();

        if (
          !data._id ||
          !data.hasOwnProperty("userName") ||
          !data.hasOwnProperty("isAdmin")
        ) {
          console.error(
            `Malformed data for id ${data._id || "unknown"}: ${JSON.stringify(
              data
            )}`
          );
          continue;
        }

        newEmployeeNames[data._id] = {
          userName: data.userName,
          isAdmin: data.isAdmin,
        };
        console.log(newEmployeeNames[data._id].userName);
      }

      setEmployeeNames(newEmployeeNames);
      console.log(newEmployeeNames);
    };

    if (allFacilities.length > 0) {
      fetchEmployeeNames();
    }
  }, [allFacilities]);

  // Delete An Employee
  const deleteEmployee = async (event, employeeId, facilityId) => {
    event.preventDefault();

    const confirmed = window.confirm(
      `Are you sure you want to delete ${employeeNames[employeeId]?.userName}?`
    );
    if (!confirmed) {
      return; // Abort if the user cancels the deletion
    }

    const form = event.currentTarget;
    const response = await fetch(form.action, {
      method: form.method,
    });
    if (response.ok) {
      setAllFacilities((prevFacilities) =>
        prevFacilities.map((facility) => {
          if (facility._id === facilityId) {
            return {
              ...facility,
              employees: facility.employees.filter(
                (employeeIdInFacility) => employeeIdInFacility !== employeeId
              ),
            };
          } else {
            return facility;
          }
        })
      );
      setEmployeeUpdate(true);
    } else {
      console.error("There was an error deleting the employee");
    }
  };

  // Edit Employee Info
  const handleEdit = (
    employeeId,
    employeeName,
    isEmployeeAdmin,
    facilityId
  ) => {
    if (
      editEmployeeId !== null &&
      (editEmployeeName !== initialEmployeeName ||
        editIsAdmin !== initialIsAdmin)
    ) {
      const confirmed = window.confirm(
        `Are you sure you want to cancel updating ${editEmployeeName}?`
      );
      if (confirmed) {
        setInitialValues();
      }
    } else if (editEmployeeId !== employeeId) {
      setEditEmployeeId(employeeId);
      setEditEmployeeName(employeeName);
      setEditIsAdmin(isEmployeeAdmin);
      setInitialEmployeeName(employeeName);
      setInitialIsAdmin(isEmployeeAdmin);
      setEditFacilityId(facilityId);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (
        editFacilityId !== null &&
        (editEmployeeName !== initialEmployeeName ||
          editIsAdmin !== initialIsAdmin)
      ) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [editFacilityId, editEmployeeName, editIsAdmin]);

  const handleCancelUpdate = () => {
    if (
      editEmployeeId !== null &&
      (editEmployeeName !== initialEmployeeName ||
        editIsAdmin !== initialIsAdmin)
    ) {
      const confirmed = window.confirm(
        `Are you sure you want to cancel updating ${editEmployeeName}?`
      );
      if (confirmed) {
        setInitialValues();
      }
    } else {
      setInitialValues();
    }
  };

  const setInitialValues = () => {
    setEditEmployeeId(null);
    setEditEmployeeName(initialEmployeeName);
    setEditIsAdmin(initialIsAdmin);
    setEditFacilityId(null);
    setInitialEmployeeName("");
    setInitialIsAdmin("");
  };

  const updateEmployee = async (event, facilityId) => {
    event.preventDefault();
    const form = event.currentTarget;

    const response = await fetch(form.action, {
      method: form.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editEmployeeName,
        isAdmin: editIsAdmin,
        facilityId: editFacilityId,
      }),
    });

    if (response.ok) {
      const { updatedUser, facilities = [] } = await response.json();
      setAllFacilities((prevFacilities) =>
        prevFacilities.map((facility) => {
          const updatedFacility = facilities.find(
            ({ _id }) => _id === facility._id
          );
          if (updatedFacility) {
            return updatedFacility;
          } else {
            return facility;
          }
        })
      );
      setEditEmployeeId(null);
      setEditEmployeeName("");
      setEditIsAdmin("");
      setEditFacilityId(""); // resetting the editFacilityId state after successful update
      setEmployeeUpdate(true);
    } else {
      console.error("There was an error updating the employee");
    }
  };

  const facilitiesElement = allFacilities.map((facility) => {
    const employeeElements =
      facility.employees && facility.employees.length > 0 ? (
        facility.employees.map((employeeId) => {
          const employee = employeeNames[employeeId];
          if (employee) {
            return (
              <div key={employeeId} className="employeeSection">
                {editEmployeeId === employeeId ? (
                  <form
                    action={`/api/updateEmployee/${editEmployeeId}?_method=PUT`}
                    encType="multipart/form-data"
                    method="POST"
                    onSubmit={(event) => updateEmployee(event, employeeId)}
                  >
                    <input
                      type="text"
                      name="editEmployeeName"
                      value={editEmployeeName}
                      onChange={(e) => setEditEmployeeName(e.target.value)}
                    />

                    <select
                      name="editIsAdmin"
                      value={editIsAdmin}
                      onChange={(e) => setEditIsAdmin(e.target.value)}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>

                    <select
                      name="editFacilityId"
                      value={editFacilityId}
                      onChange={(e) => setEditFacilityId(e.target.value)}
                    >
                      {allFacilities.map((facility) => (
                        <option key={facility._id} value={facility._id}>
                          {facility.name}
                        </option>
                      ))}
                    </select>

                    <button type="submit">Update Employee</button>
                    <button type="button" onClick={handleCancelUpdate}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <h3>{employee.userName}</h3>
                    <h3>Is Admin: {employee.isAdmin ? "Yes" : "No"}</h3>{" "}
                    <h3>{employeeId}</h3>
                    <button
                      onClick={() =>
                        handleEdit(
                          employeeId,
                          employee.userName,
                          employee.isAdmin,
                          facility._id
                        )
                      }
                    >
                      Edit Employee
                    </button>
                    <form
                      action={`/api/deleteEmployee/${employeeId}?_method=DELETE`}
                      method="POST"
                      className="col-3"
                      onSubmit={(event) =>
                        deleteEmployee(event, employeeId, facility.name)
                      }
                    >
                      <button
                        className="btn btn-primary fa fa-trash"
                        type="submit"
                      ></button>
                    </form>
                  </>
                )}
              </div>
            );
          }
        })
      ) : (
        <h3>No employees</h3>
      );

    console.log(facility._id);
    return (
      <div key={facility._id} className="facility">
        <h2>{facility.name}</h2>
        <div>{employeeElements}</div>
      </div>
    );
  });

  return <div>{facilitiesElement}</div>;
};

export default Facilities;
