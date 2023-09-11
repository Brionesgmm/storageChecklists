const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const Auction = require("../models/Auction");
const mongoose = require("mongoose");

exports.getFacilityAuctions = async (req, res) => {
  try {
    const auction = await Auction.findOne({
      facilityId: req.params.id,
    });

    if (auction) {
      res.json(auction);
    } else {
      console.log("Auction not found for facilityId:", req.params.id);
      res.status(404).json({ error: "Auction info not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

exports.updateFacilityAuctions = async (req, res) => {
  try {
    const updatedData = {
      user: req.body.user,
      currentAuctions: req.body.currentAuctions,
    };
    const updatedFacilityAuctions = await Auction.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );

    if (updatedFacilityAuctions) {
      res.json(updatedFacilityAuctions);
    } else {
      res.status(404).json({ error: "Facility auction sheet not found" });
    }
    console.log("Facility auctions updated");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
