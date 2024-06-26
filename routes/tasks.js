const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const checkApiKey = require("../middleware/apiAuth");

//Post Routes - simplified for now
// router.get("/:id", ensureAuth, tasksController.getPost);

router.post("/createTask", tasksController.createTask);

router.get("/emptyTask", tasksController.getTask);

router.put("/updateTask", tasksController.updateTask);

router.get("/facilityTask", tasksController.getFacilityTask);

// router.get(
//   "/scheduleEmptyTask",
//   checkApiKey,
//   tasksController.scheduleEmptyTask
// );

router.get("/scheduleEmptyTask", tasksController.scheduleEmptyTask);
// router.put("/likePost/:id", tasksController.likePost);

// router.delete("/deletePost/:id", tasksController.deletePost);

module.exports = router;
