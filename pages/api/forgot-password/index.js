const nodemailer = require("nodemailer");
import db from "../../../helpers/db-connection";
import otpGenerator, { optionsGenerator } from "../../../helpers/otp-generator";

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secureConnection: false,
  auth: {
    user: process.env.email_id,
    pass: process.env.email_pass,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

const handler = (req, res) => {
  if (req.method !== "POST") {
    res.status(404).json({ message: "stop gelking the server" });
    return;
  }
  const { email } = req.body;
  db.query(`SELECT * FROM USERS WHERE EMAIL = "${email}"`, (error, result) => {
    if (error) {
      res.status(500).json({
        message: "Something went wrong with the server, try again later",
      });
      return;
    }
    if (result.length === 0) {
      res.status(400).json({ message: "User doesn't exist" });
      return;
    }
    db.query(`SELECT * FROM OTPS WHERE EMAIL = "${email}"`, (error, result) => {
      if (error) {
        res
          .status(500)
          .json({ message: "Something went wrong, try again later" });
        return;
      }
      if (result.length !== 0) {
        db.query(
          `DELETE FROM OTPS WHERE EMAIL = "${email}"`,
          (error, result) => {
            if (error) {
              res.status(500).json({
                message:
                  "Something went wrong with the server, try again later",
              });
              return;
            }
          }
        );
      }
    });
    const otp = otpGenerator();
    const options = optionsGenerator(
      email,
      process.env.email_id,
      "New Password",
      otp,
      "Use this OTP as a password to Login"
    );
    transporter.sendMail(options, (error, info) => {
      if (error) {
        res
          .status(500)
          .json({ message: "Something went wrong!, try again later" });
        return;
      }
      // hash the otp and update it as a password
      const hashedPassword = otp;
      db.query(
        `UPDATE USERS SET PASSWORD = "${hashedPassword}" where EMAIL = "${email}"`,
        (error, result) => {
          if (error) {
            res
              .status(500)
              .json({ message: "Something went wrong, try again later" });
            return;
          } else {
          }
        }
      );
      res.status(201).json({ message: "Password sent to your email" });
      return;
    });
  });
};

export default handler
