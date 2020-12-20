const Ride = require("../../models/ride");

module.exports = async (req, resp) => {
  try {
    console.debug(`Create new Ride api, request body: ${req.body.ride}`);
    const { busLine, userId, userEmail } = req.body.ride;
    Ride.create(
      {
        busLine: busLine,
        userId: userId,
        userEmail: userEmail
      },
      (err, ride) => {
        if (err) {
          console.log("CREATE ride Error: " + err);
          resp.status(500).json(`Error while creating new ride, error ${err}`);
        } else {
          resp.status(200).json(ride);
        }
      }
    );
  } catch (e) {
    console.log(e);
    return resp.status(500).json("something wrong has happened");
  }
};
