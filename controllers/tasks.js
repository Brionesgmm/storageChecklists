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
};
