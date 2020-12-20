require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: "123456",
    database: "pushme_db",
    host: "localhost",
    port: "27017"
  },
  test: {
    username: "root",
    password: "",
    database: "pushme_db_test",
    host: "localhost",
    port: "27017"
  },
  production: {}
};
