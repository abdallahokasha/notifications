const Ride = require("../../models/ride");

module.exports = async (req, resp) => {
  try {
    Ride.findById(req.params.id, (err, ride) => {
      if (err) {
        console.log(`Error while getting ride by id, error: ${err}`);
        resp.status(500).send(`Error while getting ride by id, error: ${err}`);
      }
      resp.status(200).json(ride);
    });
  } catch (err) {
    console.log(err);
    return resp.status(500).json("something wrong has happened");
  }
};
