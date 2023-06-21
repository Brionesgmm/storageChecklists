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
        res.status(404).json({ error: "Task not found" });
      }
      console.log("Task updated");
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  getFacilityTask: async (req, res) => {
    try {
      const { facilityId, date } = req.query;

      if (!facilityId || !date) {
        return res
          .status(400)
          .json({ message: "FacilityId and date are required." });
      }

      // Parse date string into a Date object in UTC
      const taskDate = new Date(`${date}T00:00:00Z`);

      // Find the task for the given facility and date
      const task = await Task.findOne({
        facilityId: facilityId,
        createdDate: {
          $gte: taskDate,
          // Use $lt (less than) operator to ensure the date range excludes the next day
          $lt: new Date(
            Date.UTC(
              taskDate.getUTCFullYear(),
              taskDate.getUTCMonth(),
              taskDate.getUTCDate() + 1
            )
          ),
        },
      });

      if (!task) {
        return res.status(404).json({
          message: "No tasks found for this facility on the specified date.",
        });
      }
      res.json(task);
    } catch (error) {
      console.log(error);
    }
  },
};
