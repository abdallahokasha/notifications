const Ride = require("../models/ride");

let allRides = [
  {
    "busLine": "121xue",
    "userId": "acc86b9fc78be2b494f",
    "userEmail": "okashafci@gmail.com",
    "mediumId": 1 // sms
  },
  {
    "busLine": "871ace",
    "userId": "acc12b9zc77be2b484a",
    "userEmail": "okashafci@gmail.com",
    "mediumId": 2 //email 
  }
];

const getRidesList = () => {
  Ride.find({}, (err, rides) => {
    if (err) {
      console.log("[getRidesList] list rides Error: " + err);
      return null;
    } else {
      if (rides.length > 0)
        allRides = rides;
    }
  });
  return allRides;
};

module.exports = getRidesList;
