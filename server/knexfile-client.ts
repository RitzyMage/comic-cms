// Update with your config settings.
const stringCase = require("knex-stringcase");

require("dotenv").config();

let useSqlite = !!process.env.USE_SQLITE;

if (useSqlite) {
  module.exports = stringCase({
    client: "sqlite3",
    connection: () => ({
      filename: "./dev.db",
    }),
  });
} else {
  module.exports = stringCase({
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: process.env.ADMIN_USER,
      password: process.env.DB_PASS,
      database: "comics",
    },

    wrapIdentifier: (value: string, origImpl: (val: string) => string) =>
      origImpl(value.toUpperCase()),
    appStringcase: ["snakecase", "lowercase"],
    stringcase: "uppercase",
    recursiveStringcase: () => true,
  });
}
