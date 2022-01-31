import db from "../../../helpers/db-connection";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const handler = (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    db.query(
      `SELECT * FROM USERS WHERE EMAIL = "${email}"`,
      (error, result) => {
        if (error) {
          res.status(500).json({
            status: "email",
            message:
              "Something went wrong with the server, please try again later",
          });
          return;
        }
        if (result.length === 0) {
          res
            .status(400)
            .json({ status: "email", message: "User doesn't exists" });
          return;
        }
        const user = result[0];

        const { NAME, EMAIL, PASSWORD, CONTACT } = user;
        bcrypt.compare(password, PASSWORD, (err, passed) => {
          if (err) {
            res.status(500).json({
              status: "email",
              message:
                "Something went wrong with the server, please try again later",
            });
            return;
          }
          if (passed) {
            const token = jwt.sign({ email }, process.env.jwt_secret);
            res.status(201).json({
              message: "Logged In",
              token,
            });
            return;
          } else
            return res
              .status(402)
              .json({ status: "password", message: "Incorrect Password" });
        });
      }
    );
  }
};

export default handler;
