const Ride = require("../../models/ride");

module.exports = async (req, resp) => {
  try {
    Ride.findById(req.params.id, (err, ride) => {
      if (err) {
        console.log("DELETE Error: " + err);
        resp.status(500).send("Error");
      } else if (ride) {
        ride.remove(() => {
          resp.status(200).json(ride);
        });
      } else {
        resp.status(404).send("Not found");
      }
    });
  } catch (e) {
    console.log(e);
    return resp.status(500).json("something wrong has happened");
  }
};
