import { React, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const ContactsFS = () => {
  const [contacts, setContacts] = useState({
    siteManagers: [],
    districtManagers: [],
    teamLeads: [],
    regionalManager: [],
    corporateContacts: [],
    emergencyContacts: [],
  });
  const [utilityVendors, setutilityVendors] = useState({});
  const [siteSystems, setSiteSystems] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const { user } = useOutletContext();

  console.log(user);
  console.log(selectedProperty);

  async function getFacilityInfo() {
    if (!selectedProperty) return; // Add this line
    try {
      console.log(selectedProperty);
      const response = await fetch(
        `/api/facilityInfoSheet/${selectedProperty}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // If user is not a admin, they get their property automatically selected
  // useEffect(() => {
  //   if (user && !user.isAdmin) {
  //     setSelectedProperty(user.property);
  //   }
  // }, [user]);

  useEffect(() => {
    if (user) {
      setSelectedProperty(user.property);
    }
  }, [user]);

  useEffect(() => {
    getFacilityInfo();
  }, [selectedProperty]);

  const handleChange = (type, index, field, event) => {
    const newValue = event.target.value;

    setContacts((prevContacts) => {
      // Create a copy of the old contacts
      const newContacts = { ...prevContacts };

      // Update the appropriate field
      newContacts[type][index][field] = newValue;

      // Return the updated contacts
      return newContacts;
    });
  };

  const siteManagersElement = (
    <div>
      <h2>Site Managers</h2>
      {contacts.siteManagers.length === 0 ? (
        <div>No contacts</div>
      ) : (
        contacts.siteManagers.map((smanager, index) => (
          <div key={index}>
            <input
              type="text"
              value={smanager.name}
              onChange={(event) =>
                handleChange("siteManagers", index, "name", event)
              }
            />
            <input
              type="text"
              value={smanager.phone}
              onChange={(event) =>
                handleChange("siteManagers", index, "phone", event)
              }
            />
          </div>
        ))
      )}
    </div>
  );

  // const contactsElement = Object.keys(contacts).map((type) => (
  //   <div key={type}>
  //     <h2>{type}</h2>
  //     {contacts[type].length === 0 ? (
  //       <div>No contacts</div>
  //     ) : (
  //       contacts[type].map((contact, index) => (
  //         <div key={index}>
  //           <input
  //             type="text"
  //             value={contact.name}
  //             onChange={(event) => handleChange(type, index, "name", event)}
  //           />
  //           <input
  //             type="text"
  //             value={contact.phone}
  //             onChange={(event) => handleChange(type, index, "phone", event)}
  //           />
  //         </div>
  //       ))
  //     )}
  //   </div>
  // ));

  return <div>{siteManagersElement}</div>;
};

export default ContactsFS;
