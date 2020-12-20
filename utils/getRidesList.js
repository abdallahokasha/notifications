const Ride = require("../models/ride");

let allRides = [];

const getRidesList = () => {
  Ride.find({}, (err, rides) => {
    if (err) {
      console.log("[getRidesList] list rides Error: " + err);
      return null;
    } else {
      allRides = rides;
    }
  });
  return allRides;
};

module.exports = getRidesList;
