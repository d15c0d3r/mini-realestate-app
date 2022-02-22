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
  if (req.method === "POST") {
    const { email, name, contact, password } = req.body;
    console.log(req.body)
    db.query(
      `SELECT * FROM USERS WHERE EMAIL = "${email}"`,
      (error, result) => {
        if (error) {
          res
            .status(500)
            .json({ message: "Something went wrong, try again later" });
          return;
        }
        if (result.length !== 0) {
          res.status(400).json({ message: "User already exists" });
          return;
        }
        db.query(
          `SELECT * FROM OTPS WHERE EMAIL = "${email}"`,
          (error, result) => {
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
                      message: "Something went wrong, try again later",
                    });
                    return;
                  }
                }
              );
            }
          }
        );
        const otp = otpGenerator();
        const options = optionsGenerator(
          email,
          process.env.email_id,
          "Verify your account",
          otp,
          "Use this OTP to verify your signup process"
        );
        transporter.sendMail(options, (error, info) => {
          if (error) {
            res.status(500).json({
              message: "Something went wrong with the server, try again later",
            });
            return;
          }
          db.query(
            `INSERT INTO OTPS VALUES ("${email}", ${otp}, "${new Date().toString()}")`,
            (error, result) => {
              if (error) {
                res
                  .status(500)
                  .json({ message: "Something went wrong, try again later" });
                return;
              } else {
                res
                  .status(201)
                  .json({ message: "Enter OTP sent to your email" });
                return;
              }
            }
          );
        });
      }
    );
  } else {
    res.status(404).json({ message: "stop gelking the server" });
    return;
  }
};

export default handler;
