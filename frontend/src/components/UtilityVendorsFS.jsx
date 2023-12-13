import React from "react";

const UtilityVendorsFS = ({
  setIsDataSubmitted,
  setUtilityVendors,
  utilityVendors,
  setIsMakingChanges,
}) => {
  const handleChange = (type, index, field, event) => {
    setIsDataSubmitted(false);
    setIsMakingChanges(true);
    const newValue = event.target.value;

    setUtilityVendors((prevUtilityVendors) => {
      // Create a copy of the old contacts
      const newUtilityVendors = { ...prevUtilityVendors };

      // Update the appropriate field
      newUtilityVendors[type][index][field] = newValue;

      // Return the updated contacts
      return newUtilityVendors;
    });
  };

  const addNewUtilityVendor = (type) => {
    setUtilityVendors((prevUtilityVendors) => {
      const newUtilityVendors = { ...prevUtilityVendors };

      // Get the last contact in the array for the given type
      const lastUtilityVendor =
        newUtilityVendors[type][newUtilityVendors[type].length - 1];

      // Only add a new contact if the last one isn't empty
      if (
        !lastUtilityVendor ||
        lastUtilityVendor.name ||
        lastUtilityVendor.description
      ) {
        setIsMakingChanges(true);
        newUtilityVendors[type].push({
          name: "",
          description: "",
          id: `${Date.now()}`,
        });
        console.log(Date.now());
      }
      console.log(newUtilityVendors);
      return newUtilityVendors;
    });
  };

  const handleDeleteUtilityVendor = (type, utilityVendorId) => {
    setIsMakingChanges(true);
    setUtilityVendors((prevUtilityVendors) => {
      const newUtilityVendors = { ...prevUtilityVendors };
      newUtilityVendors[type] = newUtilityVendors[type].filter(
        (utilityVendor) => utilityVendor.id !== utilityVendorId
      );
      return newUtilityVendors;
    });
  };

  const vendorsElement = (
    <div className="vendorsSection">
      <h2>Vendors</h2>
      {utilityVendors.vendors.length === 0 ? (
        <div>No vendors</div>
      ) : (
        utilityVendors.vendors.map((vendor, index) => (
          <div className="siteInfoInputs" key={vendor.id}>
            <input
              type="text"
              value={vendor.name}
              onChange={(event) =>
                handleChange("vendors", index, "name", event)
              }
              placeholder="Name"
            />
            <input
              type="text"
              value={vendor.description}
              onChange={(event) =>
                handleChange("vendors", index, "description", event)
              }
              placeholder="Phone Number"
            />
            <button
              type="button"
              className="siteInfoDeleteBtn"
              onClick={() => handleDeleteUtilityVendor("vendors", vendor.id)}
            >
              Delete {/* This is a Unicode trash can icon */}
            </button>
          </div>
        ))
      )}
      <button
        className="siteInfoAddBtn"
        type="button"
        onClick={() => addNewUtilityVendor("vendors")}
      >
        Add New Contact
      </button>
    </div>
  );

  const utilitiesElement = (
    <div className="utilitiesSection">
      <h2>Utilities</h2>
      {utilityVendors.utilities.length === 0 ? (
        <div>No utilities</div>
      ) : (
        utilityVendors.utilities.map((utility, index) => (
          <div className="siteInfoInputs" key={index}>
            <input
              type="text"
              value={utility.name}
              onChange={(event) =>
                handleChange("utilities", index, "name", event)
              }
              placeholder="Utility"
            />
            <input
              type="text"
              value={utility.description}
              onChange={(event) =>
                handleChange("utilities", index, "description", event)
              }
              placeholder="Shut Off Location"
            />
            <button
              type="button"
              className="siteInfoDeleteBtn"
              onClick={() => handleDeleteUtilityVendor("utilities", utility.id)}
            >
              Delete{/* This is a Unicode trash can icon */}
            </button>
          </div>
        ))
      )}
      <button
        className="siteInfoAddBtn"
        type="button"
        onClick={() => addNewUtilityVendor("utilities")}
      >
        Add New Contact
      </button>
    </div>
  );

  const companyUnitsElement = (
    <div className="companyUnitsSection">
      <h2>Company Units</h2>
      {utilityVendors.companyUnits.length === 0 ? (
        <div>No Company Units</div>
      ) : (
        utilityVendors.companyUnits.map((companyUnit, index) => (
          <div className="siteInfoInputs" key={index}>
            <input
              type="text"
              value={companyUnit.name}
              onChange={(event) =>
                handleChange("companyUnits", index, "name", event)
              }
              placeholder="Unit"
            />
            <input
              type="text"
              value={companyUnit.description}
              onChange={(event) =>
                handleChange("companyUnits", index, "description", event)
              }
              placeholder="Description"
            />
            <button
              type="button"
              className="siteInfoDeleteBtn"
              onClick={() =>
                handleDeleteUtilityVendor("companyUnits", companyUnit.id)
              }
            >
              Delete {/* This is a Unicode trash can icon */}
            </button>
          </div>
        ))
      )}
      <button
        className="siteInfoAddBtn"
        type="button"
        onClick={() => addNewUtilityVendor("companyUnits")}
      >
        Add New Contact
      </button>
    </div>
  );

  return (
    <div className="utilitiesVendorsSection">
      {vendorsElement}
      {utilitiesElement}
      {companyUnitsElement}
    </div>
  );
};

export default UtilityVendorsFS;
