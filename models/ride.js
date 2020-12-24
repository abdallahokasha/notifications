const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rideSchema = new Schema(
  {
    busLine: { type: String, required: true },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true }
    // userMsisdn: {type: String}
    // trackPosition: {type: String} geospatial location
    // MediumId: {type: Integer}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ride", rideSchema);
