import db from "../../../helpers/db-connection";
import { parseToken } from "../../../helpers/parse-token";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404).json({ message: "Stop gelking the server" });
  }
  const { country, pincode, landtype, email, token } = req.body;
  const { valid } = await parseToken(token);
  if (!valid) {
    res.status(405).json({ message: "Logout and Login -__-" });
    return;
  }
  db.query(
    `SELECT * FROM SITES WHERE COUNTRY = "${country}" AND PINCODE = ${pincode} AND LANDTYPE = "${landtype}";`,
    (error, result) => {
      if (error) {
        res.status(500).json({
          message: "Something wrong with the server, try again later",
        });
        return;
      }
      if (result.length === 0) {
        res.status(301).json({ message: "No results found" });
        return;
      }
      res.status(202).json({ sites: result });
      return;
    }
  );
};

export default handler;
