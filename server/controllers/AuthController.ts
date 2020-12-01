import bcrypt from "bcryptjs";
import knex from "knex";
const connection = knex(require("../knexfile"));
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export default class AuthController {
  async verifyUser(username: string, password: string) {
    let user = await connection.select("hash").from("users").where({ username }).first();
    let match = !!user && bcrypt.compareSync(password, user.hash);
    if (!match) {
      return false;
    }
    return { token: jwt.sign({ username }, process.env.JWT_SECRET ?? "") };
  }

  async addUser(username: string, password: string) {
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS));
    let user = { username, hash };
    await connection("users").insert(user);
  }
}
