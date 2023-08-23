const cron = require("node-cron");
const bull = require("bull");
const getRidesList = require("../utils/getRidesList");
const NotificationsFactory = require("../utils/notifications/notificationsFactory");
const notificationMediums = require("../utils/constants/notificationMediums");

const notificationsQueue = new bull('notifications-queue');

var checkRideUpdatesTask = cron.schedule(
  "* * * * *",
  async () => {
    const ridesList = getRidesList()
    // console.debug("[checkRideUpdate worker] ridesList: ", ridesList)
    if (ridesList) {
      for (ride of ridesList) {
        // if (ride.updatedAt && Date.now() - ride.updatedAt <= 5 * 60 * 1000) {
        if (ride.userEmail) {
          var mailOptions = {
            to: ride.userEmail,
            subject: "Notifications service",
            html: `<p> Your Ride has been updated less than 5 mins ago </p> BusLine: ${ride.busLine}`
          }

          var notificationFactory = new NotificationsFactory()
          var notification = notificationFactory.createNotification(notificationMediums.EMAIL, mailOptions);
          console.debug("Before adding notification to the queue")
          const job = await notificationsQueue.add(notification);
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
