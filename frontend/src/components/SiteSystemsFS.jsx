import React from "react";

const SiteSystemsFS = ({ setIsDataSubmitted, siteSystems, setSiteSystems }) => {
  const handleChange = (index, field, event) => {
    setIsDataSubmitted(false);
    const newValue = event.target.value;

    setSiteSystems((preSiteSystems) => {
      // Create a copy of the old site sysetms
      const newSiteSystems = [...preSiteSystems];

      // Update the appropriate field
      newSiteSystems[index][field] = newValue;

      // Return the updated site systems
      return newSiteSystems;
    });
  };

  const addNewSiteSystem = () => {
    setSiteSystems((preSiteSystems) => {
      const newSiteSystems = [...preSiteSystems];

      // Get the last contact in the array for the given type
      const lastSiteSystem = newSiteSystems[newSiteSystems.length - 1];

      // Only add a new contact if the last one isn't empty
      if (
        !lastSiteSystem ||
        lastSiteSystem.siteSystem ||
        lastSiteSystem.website ||
        lastSiteSystem.login ||
        lastSiteSystem.password ||
        lastSiteSystem.location
      ) {
        newSiteSystems.push({
          siteSystem: "",
          website: "",
          login: "",
          password: "",
          location: "",
          id: `${Date.now()}`,
        });
        console.log(Date.now());
      }
      console.log(newSiteSystems);
      return newSiteSystems;
    });
  };

  const handleDeleteSiteSystem = (siteSystemId) => {
    setSiteSystems((preSiteSystems) => {
      const newSiteSystems = preSiteSystems.filter(
        (siteSystem) => siteSystem.id !== siteSystemId
      );
      return newSiteSystems;
    });
  };

  const siteSystemsElement = (
    <div className="siteSystemsSection">
      <h2>Site Systems</h2>
      {siteSystems.length === 0 ? (
        <div>No site systems</div>
      ) : (
        siteSystems.map((system, index) => (
          <div key={system.id}>
            <input
              type="text"
              value={system.siteSystem}
              onChange={(event) => handleChange(index, "siteSystem", event)}
              placeholder="Site System"
            />
            <input
              type="text"
              value={system.website}
              onChange={(event) => handleChange(index, "website", event)}
              placeholder="Website"
            />
            <input
              type="text"
              value={system.login}
              onChange={(event) => handleChange(index, "login", event)}
              placeholder="Login"
            />
            <input
              type="text"
              value={system.password}
              onChange={(event) => handleChange(index, "password", event)}
              placeholder="Password"
            />
            <input
              type="text"
              value={system.location}
              onChange={(event) => handleChange(index, "location", event)}
              placeholder="Location"
            />
            <button
              type="button"
              onClick={() => handleDeleteSiteSystem(system.id)}
            >
              Delete 🗑️ {/* This is a Unicode trash can icon */}
            </button>
          </div>
        ))
      )}
      <button type="button" onClick={() => addNewSiteSystem()}>
        Add New Site System
      </button>
    </div>
  );

  //   const utilitiesElement = (
  //     <div className="utilitiesSection">
  //       <h2>Utilities</h2>
  //       {utilityVendors.utilities.length === 0 ? (
  //         <div>No utilities</div>
  //       ) : (
  //         utilityVendors.utilities.map((utility, index) => (
  //           <div key={index}>
  //             <input
  //               type="text"
  //               value={utility.name}
  //               onChange={(event) =>
  //                 handleChange("utilities", index, "name", event)
  //               }
  //               placeholder="Utility"
  //             />
  //             <input
  //               type="text"
  //               value={utility.description}
  //               onChange={(event) =>
  //                 handleChange("utilities", index, "description", event)
  //               }
  //               placeholder="Shut Off Location"
  //             />
  //             <button
  //               type="button"
  //               onClick={() => handleDeleteSiteSystem("utilities", utility.id)}
  //             >
  //               Delete 🗑️ {/* This is a Unicode trash can icon */}
  //             </button>
  //           </div>
  //         ))
  //       )}
  //       <button type="button" onClick={() => addNewSiteSystem("utilities")}>
  //         Add New Contact
  //       </button>
  //     </div>
  //   );

  //   const companyUnitsElement = (
  //     <div className="companyUnitsSection">
  //       <h2>Company Units</h2>
  //       {utilityVendors.companyUnits.length === 0 ? (
  //         <div>No Company Units</div>
  //       ) : (
  //         utilityVendors.companyUnits.map((companyUnit, index) => (
  //           <div key={index}>
  //             <input
  //               type="text"
  //               value={companyUnit.name}
  //               onChange={(event) =>
  //                 handleChange("companyUnits", index, "name", event)
  //               }
  //               placeholder="Unit"
  //             />
  //             <input
  //               type="text"
  //               value={companyUnit.description}
  //               onChange={(event) =>
  //                 handleChange("companyUnits", index, "description", event)
  //               }
  //               placeholder="Description"
  //             />
  //             <button
  //               type="button"
  //               onClick={() =>
  //                 handleDeleteSiteSystem("companyUnits", companyUnit.id)
  //               }
  //             >
  //               Delete 🗑️ {/* This is a Unicode trash can icon */}
  //             </button>
  //           </div>
  //         ))
  //       )}
  //       <button type="button" onClick={() => addNewSiteSystem("companyUnits")}>
  //         Add New Contact
  //       </button>
  //     </div>
  //   );

  return <div>{siteSystemsElement}</div>;
};

export default SiteSystemsFS;
