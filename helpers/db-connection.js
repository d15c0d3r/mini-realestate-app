import { createPool } from "mysql";

const k = 1;
const pool = createPool({
  connectionLimit: 10,
  password: process.env.mysql_password,
  user: process.env.mysql_username,
  database: process.env.mysql_dbname,
  host: process.env.mysql_host,
  port: process.env.mysql_port,
  ssl: process.env.db_ssl,
  multipleStatements: true,
});

export default pool;
