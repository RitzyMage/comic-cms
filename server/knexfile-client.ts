// Update with your config settings.

require("dotenv").config();

let useSqlite = !!process.env.USE_SQLITE;

if (useSqlite) {
  module.exports = {
    client: "sqlite3",
    connection: () => ({
      filename: "./dev.db",
    }),
  };
} else {
  module.exports = {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: process.env.ADMIN_USER,
      password: process.env.DB_PASS,
      database: "comics",
    },
  };
}
