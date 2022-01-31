import db from "./db-connection";
import jwt from "jsonwebtoken";

export const parseToken = async (token) => {
  var decoded = jwt.verify(token, process.env.jwt_secret);

  const { email } = decoded;

  const sql_query = `SELECT * FROM USERS WHERE EMAIL = "${email}";`;
  const queryPromise = new Promise((resolve, reject) =>
    db.query(sql_query, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    })
  );

  const func = async () => {
    try {
      const user = await queryPromise;
      if (user.length === 0) return { valid: false };
      return {
        valid: true,
        userDetails: {
          email: user[0].EMAIL,
          contact: user[0].CONTACT,
          name: user[0].NAME,
        },
      };
    } catch (error) {
      return { message: "Server Problem" };
    }
  };
  const res = await func();
  return res;
};
