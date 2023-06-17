const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
// router.get("/:id", ensureAuth, tasksController.getPost);

router.post("/createTask", tasksController.createTask);

router.get("/emptyTask", tasksController.getTask);

// router.put('/updateTask', tasksController.updateTask)

// router.put("/likePost/:id", tasksController.likePost);

// router.delete("/deletePost/:id", tasksController.deletePost);

module.exports = router;
