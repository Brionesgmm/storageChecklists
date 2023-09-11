const mongoose = require("mongoose");

const Auction = new mongoose.Schema({
  facilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Facility",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  currentAuctions: [
    {
      lockCutDate: { time: Date, completed: { type: Boolean, default: false } },
      lienDate: { time: Date, completed: { type: Boolean, default: false } },
      firstAdDate: { time: Date, completed: { type: Boolean, default: false } },
      secondAdDate: {
        time: Date,
        completed: { type: Boolean, default: false },
      },
      auctionStart: {
        time: Date,
        completed: { type: Boolean, default: false },
      },
      auctionEnd: { time: Date, completed: { type: Boolean, default: false } },
      auctionUnits: [String],
      auctionFinished: { type: Boolean, default: false },
      id: String,
      _id: false,
    },
  ],
  endedAuctions: [],
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Auction", Auction);
