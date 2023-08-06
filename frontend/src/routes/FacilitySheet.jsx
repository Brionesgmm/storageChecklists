import React, { useState } from "react";
import ContactsFS from "../components/ContactsFS";

const FacilitySheet = () => {
  const [isActive, setIsActive] = useState({
    contactsActive: true,
    utilityVendorsActive: false,
    facilitySystemsActive: false,
  });
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  function changeTab(key) {
    setIsActive({
      contactsActive: key === "contacts",
      utilityVendorsActive: key === "utilityVendors",
      facilitySystemsActive: key === "facilitySystems",
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
      <div>{isActive.contactsActive && <ContactsFS />}</div>
    </div>
  );
};

export default FacilitySheet;
