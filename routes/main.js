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

// Get Facilities
router.get("/facilities", authController.getFacilities);
router.get("/facilities/:id", authController.getFacilityName);

// Get User info
router.get("/formUserInfo/:id", authController.getFormUserInfo);
router.post("/createFacility", authController.createFacility);

module.exports = router;
