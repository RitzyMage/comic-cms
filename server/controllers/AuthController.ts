import bcrypt from "bcryptjs";
import knex from "knex";
const connection = knex(require("../knexfile"));

const SALT_ROUNDS = 10;

export default class AuthController {
  async verifyUser(username: string, password: string) {
    let user = await connection
      .select("hash")
      .from("users")
      .where({ username })
      .first();
    let match = !!user && bcrypt.compareSync(password, user.hash);
    console.log(match);
    return { token: "TOKEN" };
  }

  async addUser(username: string, password: string) {
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS));
    let user = { username, hash };
    await connection("users").insert(user);
  }
}
