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
    <div className="siteManagersSection">
      <h2>Site Managers</h2>
      {contacts.siteManagers.length === 0 ? (
        <div>No contacts</div>
      ) : (
        contacts.siteManagers.map((siteManager, index) => (
          <div key={index}>
            <input
              type="text"
              value={siteManager.name}
              onChange={(event) =>
                handleChange("siteManagers", index, "name", event)
              }
            />
            <input
              type="text"
              value={siteManager.phone}
              onChange={(event) =>
                handleChange("siteManagers", index, "phone", event)
              }
            />
          </div>
        ))
      )}
    </div>
  );

  const districtManagersElement = (
    <div className="districtManagersSection">
      <h2>District Managers</h2>
      {contacts.districtManagers.length === 0 ? (
        <div>No contacts</div>
      ) : (
        contacts.districtManagers.map((distManager, index) => (
          <div key={index}>
            <input
              type="text"
              value={distManager.name}
              onChange={(event) =>
                handleChange("districtManager", index, "name", event)
              }
            />
            <input
              type="text"
              value={distManager.phone}
              onChange={(event) =>
                handleChange("districtManager", index, "phone", event)
              }
            />
          </div>
        ))
      )}
    </div>
  );

  const teamLeadsElement = (
    <div className="teamLeadsSection">
      <h2>Team Leads</h2>
      {contacts.teamLeads.length === 0 ? (
        <div>No contacts</div>
      ) : (
        contacts.teamLeads.map((teamLead, index) => (
          <div key={index}>
            <input
              type="text"
              value={teamLead.name}
              onChange={(event) =>
                handleChange("teamLeads", index, "name", event)
              }
            />
            <input
              type="text"
              value={teamLead.phone}
              onChange={(event) =>
                handleChange("teamLeads", index, "phone", event)
              }
            />
          </div>
        ))
      )}
    </div>
  );

  const regionalManagerElement = (
    <div className="regionalManagerSection">
      <h2>Regional Manager</h2>
      {contacts.regionalManager.length === 0 ? (
        <div>No contacts</div>
      ) : (
        contacts.regionalManager.map((regManager, index) => (
          <div key={index}>
            <input
              type="text"
              value={regManager.name}
              onChange={(event) =>
                handleChange("regionalManager", index, "name", event)
              }
            />
            <input
              type="text"
              value={regManager.phone}
              onChange={(event) =>
                handleChange("regionalManager", index, "phone", event)
              }
            />
          </div>
        ))
      )}
    </div>
  );

  const corporateContactsElement = (
    <div className="corporateContactsSection">
      <h2>Corporate Contacts</h2>
      {contacts.corporateContacts.length === 0 ? (
        <div>No contacts</div>
      ) : (
        contacts.corporateContacts.map((corporateContact, index) => (
          <div key={index}>
            <input
              type="text"
              value={corporateContact.name}
              onChange={(event) =>
                handleChange("corporateContacts", index, "name", event)
              }
            />
            <input
              type="text"
              value={corporateContact.phone}
              onChange={(event) =>
                handleChange("corporateContacts", index, "phone", event)
              }
            />
          </div>
        ))
      )}
    </div>
  );

  const emergencyContactsElement = (
    <div className="emergencyContactsSection">
      <h2>Emergency Contacts</h2>
      {contacts.emergencyContacts.length === 0 ? (
        <div>No contacts</div>
      ) : (
        contacts.emergencyContacts.map((emergencyContact, index) => (
          <div key={index}>
            <input
              type="text"
              value={emergencyContact.name}
              onChange={(event) =>
                handleChange("emergencyContacts", index, "name", event)
              }
            />
            <input
              type="text"
              value={emergencyContact.phone}
              onChange={(event) =>
                handleChange("emergencyContacts", index, "phone", event)
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

  return (
    <div>
      {siteManagersElement}
      {districtManagersElement}
      {teamLeadsElement}
      {regionalManagerElement}
      {corporateContactsElement}
      {emergencyContactsElement}
    </div>
  );
};

export default ContactsFS;
