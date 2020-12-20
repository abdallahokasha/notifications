const Ride = require("../../models/ride");

module.exports = async (req, resp) => {
  try {
    Ride.find({}, (err, rides) => {
      if (err) {
        console.log("list rides Error: " + err);
        resp.status(500).json(`Error while list rides, error ${err}`);
      } else {
        var rideMap = {};
        rides.forEach(function(rides) {
          rideMap[rides._id] = rides;
        });
        resp.status(200).json(rideMap);
      }
    });
  } catch (err) {
    console.log(err);
    return resp.status(500).json("something wrong has happened");
  }
};
