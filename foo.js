var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "elibotman@gmail.com",
    pass: "thebotman123",
  },
});

var mailOptions = {
  from: "elibotman@gmail.com",
  to: "esbildman@gmail.com",
  subject: "Testo",
  text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
