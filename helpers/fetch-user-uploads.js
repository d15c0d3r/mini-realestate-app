import db from "./db-connection";

export const fetchUserUploads = async (email) => {
  const sqlQuery = `SELECT * FROM SITES WHERE EMAIL = "${email}"`;
  const queryPromise = new Promise((resolve, reject) => {
    db.query(sqlQuery, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });

  const func = async () => {
    try {
      const result = await queryPromise;
      return result;
    } catch (error) {
      const result = "error";
      return result;
    }
  };

  const result = await func();
  // console.log('result',result);

  return result;
};
