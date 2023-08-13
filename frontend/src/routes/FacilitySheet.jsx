import { React, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ContactsFS from "../components/ContactsFS";
import SubmittingDataSpinner from "../components/SubmittingDataSpinner";
import FetchingDataLoadIcon from "../components/FetchingDataLoadIcon";
import UtilityVendorsFS from "../components/UtilityVendorsFS";
import SiteSystemsFS from "../components/SiteSystemsFS";

const FacilitySheet = () => {
  const [contacts, setContacts] = useState({
    siteManagers: [],
    districtManagers: [],
    teamLeads: [],
    regionalManager: [],
    corporateContacts: [],
    emergencyContacts: [],
  });
  const [utilityVendors, setUtilityVendors] = useState({
    vendors: [],
    utilities: [],
    companyUnits: [],
  });
  const [siteSystems, setSiteSystems] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [facilityInfoSheetId, setFacilityInfoSheetId] = useState("");
  const [isActive, setIsActive] = useState({
    contactsActive: true,
    utilityVendorsActive: false,
    facilitySystemsActive: false,
  });
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isSheetInfoLoading, setIsSheetInfoLoading] = useState(false);
  const [isMakingChanges, setIsMakingChanges] = useState(false);
  const { user } = useOutletContext();

  function changeTab(key) {
    setIsActive({
      contactsActive: key === "contacts",
      utilityVendorsActive: key === "utilityVendors",
      facilitySystemsActive: key === "facilitySystems",
    });
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

  async function getFacilityInfo() {
    if (!selectedProperty) return; // Add this line
    try {
      setIsSheetInfoLoading(true);
      console.log(selectedProperty);
      const response = await fetch(
        `/api/facilityInfoSheet/${selectedProperty}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setContacts(data.contacts);
      setUtilityVendors(data.utilityVendors);
      setSiteSystems(data.siteSystems);
      setFacilityInfoSheetId(data._id);
      setIsSheetInfoLoading(false);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  console.log(user);
  console.log(facilityInfoSheetId);

  useEffect(() => {
    getFacilityInfo();
  }, [selectedProperty]);

  const updateFacilityInfoSheet = async (event, facilityInfoSheetId) => {
    event.preventDefault();
    setIsDataSubmitted(false);
    setIsLoadingSubmit(true);
    setIsMakingChanges(false);
    const form = event.currentTarget;

    const response = await fetch(form.action, {
      method: form.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user._id,
        contacts: contacts,
        utilityVendors: utilityVendors,
        siteSystems: siteSystems,
      }),
    });

    if (response.ok) {
      setIsDataSubmitted(true);
      setIsLoadingSubmit(false);
      console.log("Successfully updated the facility info sheet");
    } else {
      console.error("There was an error updating the facility info sheet");
    }
  };

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
          onClick={() => changeTab("utilityVendors")}
        >
          Utility/Vendors
        </button>
        <button
          className="btn pettyBtn"
          onClick={() => changeTab("facilitySystems")}
        >
          Facility Systems
        </button>
      </div>
      <form
        action={`/api/updatefacilityinfosheet/${facilityInfoSheetId}?_method=PUT`}
        encType="multipart/form-data"
        method="POST"
        onSubmit={updateFacilityInfoSheet}
      >
        <button className="btn submitBtn" type="submit">
          Save Changes
        </button>
        {isMakingChanges && (
          <h2 className="makingChanges">Please Submit Changes</h2>
        )}
        {isLoadingSubmit && <SubmittingDataSpinner />}
        {isDataSubmitted && (
          <h2 className="submittedDataMsg">Facility info sheet submitted!</h2>
        )}
        <div>
          {isActive.contactsActive &&
            (isSheetInfoLoading ? (
              <FetchingDataLoadIcon />
            ) : (
              <ContactsFS
                setIsDataSubmitted={setIsDataSubmitted}
                setContacts={setContacts}
                contacts={contacts}
                setIsMakingChanges={setIsMakingChanges}
              />
            ))}
          {isActive.utilityVendorsActive &&
            (isSheetInfoLoading ? (
              <FetchingDataLoadIcon />
            ) : (
              <UtilityVendorsFS
                setIsDataSubmitted={setIsDataSubmitted}
                setUtilityVendors={setUtilityVendors}
                utilityVendors={utilityVendors}
                setIsMakingChanges={setIsMakingChanges}
              />
            ))}
          {isActive.facilitySystemsActive &&
            (isSheetInfoLoading ? (
              <FetchingDataLoadIcon />
            ) : (
              <SiteSystemsFS
                setIsDataSubmitted={setIsDataSubmitted}
                setSiteSystems={setSiteSystems}
                siteSystems={siteSystems}
                setIsMakingChanges={setIsMakingChanges}
              />
            ))}
        </div>
      </form>
    </div>
  );
};

export default FacilitySheet;
