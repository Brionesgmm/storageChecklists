const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  facilityId: {
    type: String,
    required: true,
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
    cashAmounts: [{ amount: String, value: Number }],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", TaskSchema);
