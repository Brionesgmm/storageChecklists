const mongoose = require("mongoose");

const FacilitySchema = new mongoose.Schema({
  facilityId: {
    type: String,
    required: true,
    unique: true, // Ensure that each facility name is unique
  },
  notes: {
    overlock: [String],
    reverseOverlock: [String],
    clean: [String],
    toDoList: [String],
    otherNotes: [String],
  },
  dailyTasks: [{ label: String, checked: Boolean }],
  pettyCash: {
    denominations: [{ denomination: String, value: Number }],
    total: Number,
    otherInputs: [Number],
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Facility", FacilitySchema);
