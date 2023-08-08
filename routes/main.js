const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/user", authController.getUser);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.post("/signup", authController.postSignup);

// Facilities
router.get("/facilities", authController.getFacilities);
router.get("/facilities/:id", authController.getFacilityName);
router.post("/createFacility", authController.createFacility);
router.delete("/deleteFacility/:id", authController.deleteFacility);
router.put("/updateFacility/:id", authController.updateFacility);
router.get("/facilityInfoSheet/:id", authController.getFacilityInfoSheet);
router.put(
  "/updatefacilityinfosheet/:id",
  authController.updatefacilityinfosheet
);

// Employees
router.get("/formUserInfo/:id", authController.getFormUserInfo);
router.put("/updateEmployee/:id", authController.updateEmployee);
router.delete("/deleteEmployee/:id", authController.deleteEmployee);

module.exports = router;
