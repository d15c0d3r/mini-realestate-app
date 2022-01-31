import db from "../../../helpers/db-connection";
import { parseToken } from "../../../helpers/parse-token";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404).json({ message: "stop gelking the server" });
    return;
  }
  const { name, contact, token } = req.body;

  const { valid, userDetails } = await parseToken(token);
  if (!valid) {
    res.status(404).json({ message: "You aren't authorized" });
    return;
  }
  const { email } = userDetails;
  db.query(
    `UPDATE USERS SET NAME ="${name}",CONTACT = ${contact} where EMAIL = "${email}";`,
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
};

export default handler;
