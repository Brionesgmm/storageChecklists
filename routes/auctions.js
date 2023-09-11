const express = require("express");
const router = express.Router();
const auctionsController = require("../controllers/auctions");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/facilityauctions/:id", auctionsController.getFacilityAuctions);
router.put(
  "/updatefacilityauctions/:id",
  auctionsController.updateFacilityAuctions
);

module.exports = router;
