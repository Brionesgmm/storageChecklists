import { React, useEffect, useState } from "react";

const ContactsFS = () => {
  const [contacts, setContacts] = useState({});
  const [utilityVendors, setutilityVendors] = useState({});
  const [siteSystems, setSiteSystems] = useState([]);

  async function getFacilityInfo() {
    try {
      const response = await fetch(`/api/facilityInfoSheet/${facilityId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return <div>ContactsFS</div>;
};

export default ContactsFS;
