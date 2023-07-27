const mongoose = require("mongoose");

const FacilityInfoSheet = new mongoose.Schema({
  facilityId: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contacts: {
    siteManagers: [{ name: String, phone: String }],
    districtManagers: [{ name: String, phone: String }],
    teamLeads: [{ name: String, phone: String }],
    siteManagers: [{ name: String, phone: String }],
    regionalManager: [{ name: String, phone: String }],
    corporateContacts: [{ name: String, phone: String }],
    emergencyContacts: [{ name: String, phone: String }],
  },
  utilityVendors: {
    utility: [{ utility: String, offLocation: String }],
    vendor: [{ vendor: String, phone: String }],
    companyUnits: [{ unit: String, description: String }],
  },
  siteSystems: [
    {
      siteSystem: String,
      website: String,
      login: String,
      password: String,
      location: String,
    },
  ],
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FacilityInfoSheet", FacilityInfoSheet);
