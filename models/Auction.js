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
      lockCutDate: Date,
      lienDate: Date,
      firstAdDate: Date,
      secondAdDate: Date,
      auctionStart: Date,
      auctionEnd: Date,
      auctionUnits: [
        {
          unit: String,
          moneyOwed: Number,
          _id: false,
        },
      ],
      auctionFinished: { type: Boolean, default: false },
      id: String,
      _id: false,
    },
  ],
  createdDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Auction", Auction);
