const Facility = require("../models/Facility");

module.exports = {
  getFacility: async (req, res) => {
    try {
      const facility = await Facility.findOne({
        user: req.user.id,
        createdDate: { $gte: new Date().setHours(0, 0, 0, 0) },
      });
      res.json({ facility: facility || null });
    } catch (err) {
      console.log(err);
    }
  },
  createFacility: async (req, res) => {
    try {
      const facility = await Facility.create({
        notes: {
          overlock: [],
          reverseOverlock: [],
          clean: [],
          toDoList: [],
          otherNotes: [],
        },
        dailyTasks: [],
        pettyCash: {
          denominations: [],
          total: 0,
          otherInputs: [],
        },
        user: req.user.id,
      });
      console.log("Facility has been added!");
      res.json({ facility });
    } catch (err) {
      console.log(err);
    }
  },
  updateFacility: async (req, res) => {
    try {
      const facility = await Facility.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      console.log("Facility updated");
      res.json({ facility });
    } catch (err) {
      console.log(err);
    }
  },
  resetFacility: async (req, res) => {
    // To be implemented with Node-Cron
  },
};
