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
      mysql_password: "wXfL9vJyH",
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

//CREATE TABLE SITES (ID BIGINT(100) AUTO_INCREMENT PRIMARY KEY,NAME VARCHAR(100),COUNTRY VARCHAR(100),STATE VARCHAR(100),CITY VARCHAR(100),LANDMARK VARCHAR(100),PINCODE VARCHAR(100),CONTACT BIGINT(50),EMAIL VARCHAR(100));
//CREATE TABLE OTPS (EMAIL VARCHAR(100), OTP BIGINT(100));
//CREATE TABLE USERS (EMAIL VARCHAR(100) PRIMARY KEY,NAME VARCHAR(100),CONTACT BIGINT(100),PASSWORD VARCHAR(100));
