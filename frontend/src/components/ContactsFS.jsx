import { React, useEffect, useState } from "react";

const ContactsFS = ({
  setIsDataSubmitted,
  setContacts,
  contacts,
  setIsMakingChanges,
}) => {
  const handleChange = (type, index, field, event) => {
    setIsDataSubmitted(false);
    setIsMakingChanges(true);
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

  const addNewContact = (type) => {
    setContacts((prevContacts) => {
      const newContacts = { ...prevContacts };

      // Get the last contact in the array for the given type
      const lastContact = newContacts[type][newContacts[type].length - 1];

      // Only add a new contact if the last one isn't empty
      if (!lastContact || lastContact.name || lastContact.phone) {
        setIsMakingChanges(true);
        newContacts[type].push({ name: "", phone: "", id: `${Date.now()}` });
        console.log(Date.now());
      }
      console.log(newContacts);
      return newContacts;
    });
  };

  const handleDeleteContact = (type, contactId) => {
    setIsMakingChanges(true);
    setContacts((prevContacts) => {
      const newContacts = { ...prevContacts };
      newContacts[type] = newContacts[type].filter(
        (contact) => contact.id !== contactId
      );
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
          <div key={siteManager.id}>
            <input
              type="text"
              value={siteManager.name}
              onChange={(event) =>
                handleChange("siteManagers", index, "name", event)
              }
              placeholder="Name"
            />
            <input
              type="text"
              value={siteManager.phone}
              onChange={(event) =>
                handleChange("siteManagers", index, "phone", event)
              }
              placeholder="Phone Number"
            />
            <button
              type="button"
              onClick={() =>
                handleDeleteContact("siteManagers", siteManager.id)
              }
            >
              Delete 🗑️ {/* This is a Unicode trash can icon */}
            </button>
          </div>
        ))
      )}
      <button type="button" onClick={() => addNewContact("siteManagers")}>
        Add New Contact
      </button>
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
                handleChange("districtManagers", index, "name", event)
              }
              placeholder="Name"
            />
            <input
              type="text"
              value={distManager.phone}
              onChange={(event) =>
                handleChange("districtManagers", index, "phone", event)
              }
              placeholder="Phone Number"
            />
            <button
              type="button"
              onClick={() =>
                handleDeleteContact("districtManagers", distManager.id)
              }
            >
              Delete 🗑️ {/* This is a Unicode trash can icon */}
            </button>
          </div>
        ))
      )}
      <button type="button" onClick={() => addNewContact("districtManagers")}>
        Add New Contact
      </button>
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
              placeholder="Name"
            />
            <input
              type="text"
              value={teamLead.phone}
              onChange={(event) =>
                handleChange("teamLeads", index, "phone", event)
              }
              placeholder="Phone Number"
            />
            <button
              type="button"
              onClick={() => handleDeleteContact("teamLeads", teamLead.id)}
            >
              Delete 🗑️ {/* This is a Unicode trash can icon */}
            </button>
          </div>
        ))
      )}
      <button type="button" onClick={() => addNewContact("teamLeads")}>
        Add New Contact
      </button>
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
              placeholder="Name"
            />
            <input
              type="text"
              value={regManager.phone}
              onChange={(event) =>
                handleChange("regionalManager", index, "phone", event)
              }
              placeholder="Phone Number"
            />
            <button
              type="button"
              onClick={() =>
                handleDeleteContact("regionalManager", regManager.id)
              }
            >
              Delete 🗑️ {/* This is a Unicode trash can icon */}
            </button>
          </div>
        ))
      )}
      <button type="button" onClick={() => addNewContact("regionalManager")}>
        Add New Contact
      </button>
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
              placeholder="Name"
            />
            <input
              type="text"
              value={corporateContact.phone}
              onChange={(event) =>
                handleChange("corporateContacts", index, "phone", event)
              }
              placeholder="Phone Number"
            />
            <button
              type="button"
              onClick={() =>
                handleDeleteContact("corporateContacts", corporateContact.id)
              }
            >
              Delete 🗑️ {/* This is a Unicode trash can icon */}
            </button>
          </div>
        ))
      )}
      <button type="button" onClick={() => addNewContact("corporateContacts")}>
        Add New Contact
      </button>
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
              placeholder="Name"
            />
            <input
              type="text"
              value={emergencyContact.phone}
              onChange={(event) =>
                handleChange("emergencyContacts", index, "phone", event)
              }
              placeholder="Phone Number"
            />
            <button
              type="button"
              onClick={() =>
                handleDeleteContact("emergencyContacts", emergencyContact.id)
              }
            >
              Delete 🗑️ {/* This is a Unicode trash can icon */}
            </button>
          </div>
        ))
      )}
      <button type="button" onClick={() => addNewContact("emergencyContacts")}>
        Add New Contact
      </button>
    </div>
  );

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
