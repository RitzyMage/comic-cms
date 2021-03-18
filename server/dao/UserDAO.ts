import { Transaction } from "knex";
import DAO from "./DAO";
import DatabaseError from "./DatabaseError";

export default class UserDAO extends DAO {
  constructor(transaction: Transaction) {
    super(transaction);
  }

  async getUser(username: string): Promise<{ hash: string } | DatabaseError> {
    try {
      return await this.transaction.select("hash").from("users").where({ username }).first();
    } catch (e) {
      console.error(e);
      return new DatabaseError(`could not get user ${username} from database`);
    }
  }

  async create(user: { username: string; hash: string }): Promise<void | DatabaseError> {
    try {
      this.transaction("users").insert(user);
    } catch (e) {
      console.error(e);
      return new DatabaseError(`failed to create user ${user.username} in database`);
    }
  }
}
