// Update with your config settings.

require("dotenv").config();

module.exports = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: process.env.CLIENT_USER,
    password: process.env.DB_PASS_CLIENT,
    database: "comics",
  },
};
