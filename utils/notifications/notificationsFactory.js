const notificationMediums = require("../../utils/constants/notificationMediums");
const sendEmail = require("../../utils/mailer");
const sendSMS = require("../../utils/sendSMS");

function NotificationsFactory() {
    this.createNotification = function (type, data, receivers = []) {
        var notification;

        if (type === notificationMediums.SMS) {
            notification = new SMSNotification();
        } else if (type === notificationMediums.EMAIL) {
            notification = new EMAILNotification();
        } else if (type === notificationMediums.PUSH_NOTIFICATION) {
            notification = new PUSHNotification();
        }

        notification.type = type;
        notification.data = data;
        
        return notification;
    }
}


var SMSNotification = function () {
    this.send = function () {
        console.log("send SMS notification");
        sendSMS(data);
    }
};
var EMAILNotification = function () {
    this.send = function () {
        console.log("send Email notification");
        sendEmail(this.data);
    }
};
var PUSHNotification = function () {
    this.send = function () {
        console.log("send push notification");
    }
};

module.exports = NotificationsFactory;