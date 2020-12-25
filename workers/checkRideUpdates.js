const cron = require("node-cron");
const bull = require("bull");
const getRidesList = require("../utils/getRidesList");
const sendEmail = require("../utils/mailer");
const sendSMS = require("../utils/sendSMS");

const notificationsQueue = new Bull('notifications-queue');

var checkRideUpdatesTask = cron.schedule(
  "* * * * *",
  () => {
    const ridesList = getRidesList();
    console.debug("[checkRideUpdate worker] ridesList: ", ridesList);
    if (ridesList) {
      for (ride of ridesList) {
       // if (ride.updatedAt && Date.now() - ride.updatedAt <= 5 * 60 * 1000) {
          if (ride.userEmail) {
            var mailOptions = {
              to: ride.userEmail,
              subject: "Notifications service",
              html: `<p> Your Ride has been updated less than 5 mins ago </p> BusLine: ${ride.busLine}`
            };
            // const job = await notificationsQueue.add({
            //   foo: 'bar'
            // });
            sendEmail(mailOptions);
            sendSMS();
          }
        //}
      }
    } else {
      console.debug("couldn't get rides list using getRidesList utily");
    }
  },
  {
    scheduled: false
  }
);

module.exports = checkRideUpdatesTask;
