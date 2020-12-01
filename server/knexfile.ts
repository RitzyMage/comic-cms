// Update with your config settings.
const knexStringCase = require("knex-stringcase");

require("dotenv").config();

module.exports = knexStringCase({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: process.env.ADMIN_USER,
    password: process.env.DB_PASS,
    database: "comics",
  },
  migrations: {
    directory: "./database/migrations/",
    tableName: "migrations",
  },
  seeds: {
    directory: "./database/seeds/",
  },

  wrapIdentifier: (value: string, origImpl: (val: string) => string) =>
    origImpl(value.toUpperCase()),
  appStringcase: ["snakecase", "lowercase"],
  stringcase: "uppercase",
  recursiveStringcase: () => true,
});
