const cron = require("node-cron");
const Task = require("./models/Task");

// Run this task every day at 00:00
cron.schedule("0 0 * * *", async () => {
  console.log("Running a task every day at midnight");

  // Here you would get a list of all facilities and create a new Task for each one
});
