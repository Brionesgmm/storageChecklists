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
  updateTask: async (req, res) => {
    try {
      const updatedData = {
        "notes.overlock": req.body.notes.overlock,
        "notes.reverseOverlock": req.body.notes.reverseOverlock,
        "notes.clean": req.body.notes.clean,
        "notes.toDoList": req.body.notes.toDoList,
        "notes.otherNotes": req.body.notes.otherNotes,
        dailyTasks: req.body.dailyTasks,
        "pettyCash.denominations": req.body.pettyCash.denominations,
        "pettyCash.cashAmounts": req.body.pettyCash.cashAmounts,
        user: req.body.user,
      };
      const task = await Task.findOne({ facilityId: req.body.facilityId }).sort(
        { createdDate: -1 }
      );
      if (task) {
        const updatedTask = await Task.findByIdAndUpdate(
          task._id,
          { $set: updatedData },
          { new: true }
        );
        res.json(updatedTask);
      } else {
        // handle error
      }
      console.log("Task updated");
      res.json(task);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
};
