import db from "../../../helpers/db-connection";

const handler = (req, res) => {
  if (req.method !== "POST") {
    res.status(404).json({ message: "stop gelkign the server" });
    return;
  }
  const { id } = req.body;
  const sql_query = `DELETE FROM SITES WHERE ID = ${id}`;
  const queryPromise = new Promise((resolve, reject) => {
    db.query(sql_query, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });

  queryPromise
    .then((result) => {
      res.status(201).json({ message: "site deleted" });
    })
    .catch((error) =>
      res.status(502).json({ message: "server problem, please try again" })
    );
  return;
};

export default handler;
