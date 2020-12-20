const Ride = require("../../models/ride");

module.exports = async (req, resp) => {
  try {
    const { busLine, userId, userEmail } = req.body.ride;

    Ride.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          busLine: busLine,
          userId: userId,
          userEmail: userEmail
        }
      },
      function(err, ride) {
        if (err) {
          console.log(`Error while updating rides, error: ${err}`);
          resp.status(500).json(`Error while updating rides, error: ${err}`);
        } else {
          Ride.findById(req.params.id, (err, updatedRide) => {
            if (err) {
              console.log(
                `Error while getting ride by id after updating it, error: ${err}`
              );
              resp
                .status(500)
                .send(
                  `Error while getting ride by id after updating it, error: ${err}`
                );
            }
            console.log("Ride has been successfully updated.");
            resp.status(200).json(updatedRide);
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return resp.status(500).json("something wrong has happened");
  }
};
