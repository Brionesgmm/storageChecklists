import React, { useState } from "react";

const FacilitySheet = () => {
  const [activeTabs, setActiveTabs] = useState({
    contacts: true,
    facilitySystems: false,
    utilityVendors: false,
  });

  function changeTab(key) {
    setIsActive({
      tasksActive: key === "contacts",
      notesActive: key === "facilitySystems",
      pettyActive: key === "utilityVendors",
    });
  }

  return (
    <div>
      <div className="tabBtns">
        <button
          className="btn contactsFS"
          onClick={() => changeTab("contacts")}
        >
          Contacts
        </button>
        <button
          className="btn notesBtn"
          onClick={() => changeTab("facilitySystems")}
        >
          Utility/Vendors
        </button>
        <button
          className="btn pettyBtn"
          onClick={() => changeTab("utilityVendors")}
        >
          Facility Systems
        </button>
      </div>
      <form>
        <button className="btn submitBtn" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default FacilitySheet;
