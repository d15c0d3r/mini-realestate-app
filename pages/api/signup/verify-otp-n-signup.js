import db from "../../../helpers/db-connection";
import { verifyOtp } from "../../../helpers/otp-generator";
import bcrypt from "bcrypt";

const handler = (req, res) => {
  if (req.method !== "POST") {
    res.status(404).json({
      message: "Stop gelking the server",
    });
    return;
  }
  const { otp: userOtp, email, name, contact, password } = req.body;
  db.query(`SELECT * FROM OTPS WHERE EMAIL = "${email}"`, (error, result) => {
    if (error) {
      res
        .status(500)
        .json({ message: "Something went wrong, try again later" });
      return;
    }
    if (!verifyOtp(result[0], userOtp)) {
      //change logic based on the timestamp
      res.status(402).json({
        message: "Incorrect OTP re-submit signup form to get another OTP",
      });
      return;
    }

    bcrypt.hash(req.body.password, 10, (err, hashedpass) => {
      if (err) {
        res.status(500).json({
          message: "Something wrong with the server, please try again later",
        });
        return;
      }
      db.query(
        `INSERT INTO USERS (EMAIL,NAME,CONTACT,PASSWORD) VALUES ("${email}","${name}", ${contact}, "${hashedpass}")`,
        (error, result) => {
          if (error) {
            res
              .status(501)
              .json({ message: "Something went wrong, try again later" });
            return;
          } else {
            res.status(201).json({ message: "Signed Up" });
            return;
          }
        }
      );
    });
  });
};

export default handler;
