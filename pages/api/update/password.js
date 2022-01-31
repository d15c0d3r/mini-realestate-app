import db from "../../../helpers/db-connection";
import { parseToken } from "../../../helpers/parse-token";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404).json({ message: "stop gelking the server" });
    return;
  }
  const { password, retypePassword, token } = req.body;

  if (password !== retypePassword) {
    res.status(444).json({ message: "Typed passwords doesn't match -__-" });
    return;
  }

  const { valid, userDetails } = await parseToken(token);
  if (!valid) {
    res.status(434).json({ message: "You aren't authorized" });
    return;
  }
  const { email } = userDetails;

  bcrypt.hash(req.body.password, 10, (error, hashedpass) => {
    if (error) {
      res.status(500).json({
        message: "Something wrong with the server, please try again later",
      });
      return;
    }
    db.query(
      `UPDATE USERS SET PASSWORD ="${hashedpass}" where EMAIL = "${email}";`,
      (error, result) => {
        if (error) {
          res.status(500).json({
            message: "Something wrong with the server, please try again later",
          });
          return;
        }
        res.status(201).json({ message: "Details Updated!" });
        return;
      }
    );
  });
};

export default handler;
