import { React, useState, useEffect } from "react";

const Facilities = () => {
  const [allFacilities, setAllFacilities] = useState([]);
  const [employeeNames, setEmployeeNames] = useState({});

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
        for (const employeeId of facility.employees) {
          const response = await fetch(`/api/formUserInfo/${employeeId}`);
          const data = await response.json();
          console.log(data);
          newEmployeeNames[employeeId] = data.userName;
        }
      }
      setEmployeeNames(newEmployeeNames);
      console.log(employeeNames);
    };

    if (allFacilities.length > 0) {
      fetchEmployeeNames();
    }
  }, [allFacilities]);

  const facilitiesElement = allFacilities.map((facility) => {
    const employeeElements = facility.employees.map((employeeId) => (
      <h3>{employeeNames[employeeId]}</h3>
    ));

    return (
      <div className="facility">
        <h2>{facility.name}</h2>
        <h2>{facility.address}</h2>
        <div>{employeeElements}</div>
      </div>
    );
  });

  return <div>{facilitiesElement}</div>;
};

export default Facilities;
