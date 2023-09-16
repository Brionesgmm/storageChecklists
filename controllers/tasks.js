const Task = require("../models/Task");
const Facility = require("../models/Facility");

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
      }).sort({ createdDate: -1 });
      console.log(task);

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
  scheduleEmptyTask: async (req, res) => {
    console.log("Creating tasks for all facilities");
    try {
      // Get all facilities
      const facilities = await Facility.find();

      // Create a new Task for each facility
      for (let facility of facilities) {
        const newTask = new Task({
          facilityId: facility._id.toString(), // Convert ObjectId to string
          // Initialize other fields as needed
          notes: {
            overlock: Array(15).fill(""),
            reverseOverlock: Array(15).fill(""),
            clean: Array(15).fill(""),
            toDoList: Array(15).fill(""),
            otherNotes: Array(15).fill(""),
          },
          dailyTasks: [
            { label: "Clock in", checked: false },
            {
              label: "Open office/turn off alarm/post 'Open' sign in door",
              checked: false,
            },
            {
              label: "Log into store email, Sitelink, gate and camera systems",
              checked: false,
            },
            {
              label:
                "Count cash drawer. Complete Cash Count Worksheet (CO Blue Book)",
              checked: false,
            },
            {
              label:
                "Print Transaction Central Report for previous day and put away paperwork",
              checked: false,
            },
            {
              label: "Check and Respond to emails and voicemails",
              checked: false,
            },
            {
              label: "Clean your Office and restock Merchandise",
              checked: false,
            },
            {
              label: "Check gate system reports for any after hour issues",
              checked: false,
            },
            {
              label:
                "Review Reminders List - Process Past Due Notices, Invoices, Rent increases",
              checked: false,
            },
            {
              label: "Review all inquiries/reservations and update in Sitelink",
              checked: false,
            },
            {
              label:
                "Post any unposted payments from autopay run, Call tenant if it doesn’t process",
              checked: false,
            },
            {
              label:
                "Fill in site check section units to be overlocked, unlocked or cleaned",
              checked: false,
            },
            {
              label: "Check curb appeal and property cleanliness",
              checked: false,
            },
            {
              label: "Conduct a complete walk-thru, lock check",
              checked: false,
            },
            { label: "Complete goal section", checked: false },
            { label: "Clean and stock restrooms", checked: false },
            { label: "Print New Vacant Unit Sheet", checked: false },
            {
              label:
                "Check your website to make sure specials, pricing and site info is correct",
              checked: false,
            },
            {
              label:
                "Follow-up with Site check/lock check Issues (move outs, sweeping, etc.)",
              checked: false,
            },
            { label: "Complete Todo List", checked: false },
            { label: "Check emails through-out the day", checked: false },
            {
              label: "Make collection calls (Every other day per tenant due)",
              checked: false,
            },
            { label: "Clock out by 2pm for lunch", checked: false },
            { label: "Clean/refresh units", checked: false },
            {
              label: "Check property for cleanliness and maintenance needs",
              checked: false,
            },
            {
              label: "Work on on-going projects or Items assigned by DM",
              checked: false,
            },
            { label: "Process mail & post payments received", checked: false },
            {
              label:
                "Review Deposit(s) to match Sitelink, Take deposit(s) to the bank during business hours",
              checked: false,
            },
            {
              label:
                "Check new move in files, make sure info is correct and all paperwork is complete",
              checked: false,
            },
            { label: "Follow up with Inquiries", checked: false },
            { label: "Check for any overlock removals", checked: false },
            { label: "Complete lock and property check", checked: false },
            { label: "Restock retail and office supplies", checked: false },
            {
              label: "Empty office trash and wipe surface areas",
              checked: false,
            },
            {
              label:
                "Count cash drawer. Complete Cash Count Worksheet (Print weekly, put in Daily Close binder)",
              checked: false,
            },
            {
              label:
                "Sitelink Daily Close, Print Deposit Report, and prepare bank deposit slip",
              checked: false,
            },
            { label: "Put away all your paperwork", checked: false },
            { label: "Clean office windows and close blinds", checked: false },
            // {
            //   label: "Put Daily Checklist in Site Info Binder",
            //   checked: false,
            // },
            {
              label:
                "Clock out, turn on alarm, turn off 'open sign', turn off TVs, lock up office",
              checked: false,
            },
            // Add the rest of the tasks here
          ],
          pettyCash: {
            denominations: [
              { denomination: "pennies", value: 0 },
              { denomination: "nickels", value: 0 },
              { denomination: "dimes", value: 0 },
              { denomination: "quarters", value: 0 },
              { denomination: "ones", value: 0 },
              { denomination: "fives", value: 0 },
              { denomination: "tens", value: 0 },
              { denomination: "twenties", value: 0 },
              { denomination: "fifties", value: 0 },
              { denomination: "hundreds", value: 0 },
            ],
            cashAmounts: [
              { amount: "currentTotal", value: 0 },
              { amount: "receipts", value: 0 },
              { amount: "totalPettyCash", value: 0 },
            ],
          },
          user: null, // Start with no user assigned
        });

        // Save the new task
        await newTask.save();
      }

      console.log("Tasks created for all facilities");
      res.status(200).json({ message: "Tasks created for all facilities" });
    } catch (err) {
      console.error("An error occurred while creating tasks: ", err);
      res.status(500).json({
        message: "An error occurred while creating tasks",
        error: err,
      });
    }
  },
};
