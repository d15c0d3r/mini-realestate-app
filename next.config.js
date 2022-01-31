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
      mysql_username: "sql6469432",
      mysql_password: "IBUBubmpIy",
      mysql_dbname: "sql6469432",
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
//tparjonigrftgnosgt@kvhrr.com
//12345