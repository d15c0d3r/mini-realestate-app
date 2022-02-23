const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mysql_username: "root",
        mysql_password: "12345678",
        mysql_dbname: "REALESTATE_WEBSITE",
        mysql_host: "localhost",
        mysql_port: "3306",
        db_ssl: false,
        email_id: "disc0der@outlook.com",
        email_pass: "naneepappi@123",
        jwt_secret: "7cYF43X$33Mb143",
      },
    };
  }
  return {
    reactStrictMode: true,
    env: {
      mysql_username: "sql6474609",
      mysql_password: "1wXfL9vJyH",
      mysql_dbname: "sql6474609",
      mysql_host: "sql6.freemysqlhosting.net",
      mysql_port: "3306",
      db_ssl: false,
      email_id: "disc0der@outlook.com",
      email_pass: "naneepappi@123",
      jwt_secret: "7cYF43X$33Mb143",
      domain : "https://mini-realestate-app.vercel.app/"
    },
  };
};
//lzbafdliwskmvokaww@bvhrk.com
//12345

//CREATE TABLE SITES (ID BIGINT AUTO_INCREMENT PRIMARY KEY,  NAME CHAR(255), EMAIL VARCHAR(500), CONTACT BIGINT, COUNTRY CHAR(255), STATE CHAR(255), CITY CHAR(255), LANDMARK VARCHAR(500), PINCODE BIGINT, LANDTYPE CHAR(100));
//CREATE TABLE OTPS (EMAIL VARCHAR(500) PRIMARY KEY, OTP BIGINT, TIME_STAMP VARCHAR(500));
//CREATE TABLE USERS (NAME VARCHAR(100), EMAIL VARCHAR(500) PRIMARY KEY, CONTACT BIGINT, PASSWORD VARCHAR(500));
