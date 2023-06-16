const Task = require("../models/Task");

module.exports = {
  createTask: async (req, res) => {
    try {
      const task = await Task.create({
        facilityId: req.body.facilityId,
        notes: req.body.notes,
        dailyTasks: req.body.dailyTasks,
        pettyCash: req.body.pettyCash,
        user: req.body.user,
      });
      console.log("Task has been added!");
      res.json({ task });
    } catch (err) {
      console.log(err);
    }
  },
  getTask: async (req, res) => {
    try {
      const { facilityId } = req.query;

      if (!facilityId) {
        return res.status(400).json({ message: "FacilityId is required." });
      }

      // Find the most recent task for the given facility
      const task = await Task.findOne({ facilityId: facilityId }).sort({
        createdDate: -1,
      });

      if (!task) {
        return res
          .status(404)
          .json({ message: "No tasks found for this facility." });
      }

      // Send the task to the client
      res.json(task);
    } catch (error) {
      console.log(error);
    }
  },
};
