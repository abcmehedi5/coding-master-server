const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
router.get("/sendMailer", (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'abcmehedi5@outlook.com',
        pass: '*******'
    },
  });

  const mailOptions = {
    from: "abcmehedi5@outlook.com", // user email address
    to: "mail.mehedi22@gmail.com", // recipient email address
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };
  res.send("mehedi hellow")
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});


module.exports = router;
