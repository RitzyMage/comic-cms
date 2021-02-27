require("dotenv").config();
let useSqliteDev = !!process.env.USE_SQLITE;

if (useSqliteDev) {
  module.exports = {
    client: "sqlite3",
    connection: {
      filename: "./dev.db",
    },
    migrations: {
      directory: "./database/migrations/",
      tableName: "migrations",
    },
    seeds: {
      directory: "./database/seeds/",
    },
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
    migrations: {
      directory: "./database/migrations/",
      tableName: "migrations",
    },
    seeds: {
      directory: "./database/seeds/",
    },
  };
}
