import { Transaction } from "knex";
import DAO from "./DAO";

export default class UserDAO extends DAO {
  constructor(transaction: Transaction) {
    super(transaction);
  }

  async getUser(username: string) {
    return await this.transaction.select("hash").from("users").where({ username }).first();
  }

  async create(user: { username: string; hash: string }) {
    this.transaction("users").insert(user);
  }
}
