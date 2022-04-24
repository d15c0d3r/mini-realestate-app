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
        email_id: "minirealestatewebsite@outlook.com",
        email_pass: "naneepappi@123",
        jwt_secret: "7cYF43X$33Mb143",
      },
    };
  }
  return {
    reactStrictMode: true,
    env: {
      mysql_host: "remotemysql.com",
      mysql_port: "3306",
      db_email: "ibssphybrijaajtkkw@nvhrw.com",
      db_pass: "12345",
      db_ssl: false,
      email_id: "minirealestatewebsite@outlook.com",
      email_pass: "naneepappi@123",
      jwt_secret: "7cYF43X$33Mb143",
      domain: "https://mini-realestate-app.vercel.app/",
      mysql_username: "Yzt1CFU4gZ",
      mysql_password: "jgVVbJ3eYL",
      mysql_dbname: "Yzt1CFU4gZ",
    },
  };
};
