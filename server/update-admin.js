const SALT_ROUNDS = 10;

const bcrypt = require("bcryptjs");
const knex = require("knex");

const databaseConnection = knex(require("./knexfile.ts"));

replaceUser = async (username, password) => {
  let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS));
  let user = { username, hash };

  await databaseConnection("users").del();
  await databaseConnection("users").insert(user);
  await databaseConnection.destroy();
};

replaceUser("admin", "test2");
