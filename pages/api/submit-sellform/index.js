import db from "../../../helpers/db-connection";
import { parseToken } from "../../../helpers/parse-token";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404).json({
      message: "Stop gelking the server",
    });
    return;
  }
  const {
    name,
    contact,
    country,
    state,
    landType,
    city,
    pincode,
    landmark,
    token,
    email,
  } = req.body;

  const { valid } = await parseToken(token);
  if (!valid) {
    res.status(405).json("Logout and Login again -__-");
    return;
  }

  db.query(
    `INSERT INTO SITES (NAME,CONTACT,EMAIL, COUNTRY, STATE, CITY, LANDMARK, PINCODE, LANDTYPE) VALUES ("${name}",${contact},"${email}", "${country}", "${state}", "${city}","${landmark}", ${pincode}, "${landType}");`,
    (error, result) => {
      if (error) {
        res.status(500).json({
          message: "Something wrong with the server, please try again later",
        });
        return;
      } else {
        res.status(201).json({ message: "Site details uploaded" });
        return;
      }
    }
  );
};

export default handler;
