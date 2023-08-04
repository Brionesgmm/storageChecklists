require("dotenv").config({ path: __dirname + "/../config/.env" });
const mongoose = require("mongoose");
const Facility = require("../models/Facility");
const FacilityInfoSheet = require("../models/FacilityInfoSheet");
const connectDB = require("../config/database"); // import the connectDB function

connectDB(); // call the function to connect to the database

// Connect to your MongoDB database here

Facility.find({}, (err, facilities) => {
  if (err) {
    console.error(err);
  } else {
    facilities.forEach((facility) => {
      const newInfoSheet = new FacilityInfoSheet({
        facilityId: facility._id,
        // Assuming you don't need to set 'user' field now
        // You need to create and set the 'contacts' and 'utilityVendors' objects and 'siteSystems' array
        // based on the specifics of your application
        contacts: {
          siteManagers: [],
          districtManagers: [],
          teamLeads: [],
          regionalManager: [],
          corporateContacts: [],
          emergencyContacts: [],
        },
        utilityVendors: {
          utility: [],
          vendor: [],
          companyUnits: [],
        },
        siteSystems: [],
        // The 'createdDate' field will be set to the current date by default as per your schema
      });

      newInfoSheet.save((err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(
            `FacilityInfoSheet created for facility with id ${facility._id}`
          );
        }
      });
    });
  }
});
