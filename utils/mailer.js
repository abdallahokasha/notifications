var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pushmeeapp@gmail.com",
    pass: "123@SeND!@#0"
  }
});

var mailOptions = {
  from: "pushmeeapp@gmail.com"
};
const sendEmail = otherMailOptions => {
  transporter.sendMail({ mailOptions, ...otherMailOptions }, function(
    error,
    info
  ) {
    if (error) {
      console.log(`Error while sending email, error: ${error}`);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = sendEmail;
