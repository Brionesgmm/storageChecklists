const mongoose = require("mongoose");

const FacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  givenCash: {
    type: Number,
    default: 0,
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming you have a User model
    },
  ],
});

module.exports = mongoose.model("Facility", FacilitySchema);
