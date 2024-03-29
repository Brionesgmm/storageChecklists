const mongoose = require("mongoose");

const contactSchema = {
  name: String,
  phone: String,
  id: String,
  _id: false, // prevent Mongoose from auto-assigning _id for each contact
};

const FacilityInfoSheet = new mongoose.Schema({
  facilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Facility",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contacts: {
    siteManagers: [contactSchema],
    districtManagers: [contactSchema],
    teamLeads: [contactSchema],
    regionalManager: [contactSchema],
    corporateContacts: [contactSchema],
    emergencyContacts: [contactSchema],
  },
  utilityVendors: {
    utilities: [{ name: String, description: String, id: String, _id: false }],
    vendors: [{ name: String, description: String, id: String, _id: false }],
    companyUnits: [
      { name: String, description: String, id: String, _id: false },
    ],
  },
  siteSystems: [
    {
      siteSystem: String,
      website: String,
      login: String,
      password: String,
      location: String,
      id: String,
      _id: false,
    },
  ],
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FacilityInfoSheet", FacilityInfoSheet);
