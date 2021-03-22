require("dotenv").config();

module.exports = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: process.env.ADMIN_USER,
    password: process.env.DB_PASS_ADMIN,
    database: "comics",
  },
  migrations: {
    directory: "./database/migrations/",
    tableName: "migrations",
  },
  seeds: {
    directory: "./database/seeds/",
  },
};
