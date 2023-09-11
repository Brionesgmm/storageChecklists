require("dotenv").config({ path: __dirname + "/../config/.env" });
const mongoose = require("mongoose");
const Facility = require("../models/Facility");
const Auction = require("../models/Auction");
const connectDB = require("../config/database");

connectDB();

Facility.find({}, (err, facilities) => {
  if (err) {
    console.error(err);
    return;
  }

  facilities.forEach((facility) => {
    const newAuction = new Auction({
      facilityId: facility._id,
      // Assuming 'user' is not set right now, you might need to adjust this based on your needs
      currentAuctions: [],
      // You will need to add auctions to 'currentAuctions' array based on your application specifics,
      // for this script, it's left as an empty array
      endedAuctions: [],
    });

    newAuction.save((err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`Auction created for facility with id ${facility._id}`);
    });
  });
});
