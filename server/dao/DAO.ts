import { Transaction } from "knex";

import knex from "knex";
const adminConnection = knex(require("../knexfile"));
const clientConnection = knex(require("../knexfile-client"));

export default class DAO {
  protected transaction: Transaction;
  constructor(transaction: Transaction) {
    this.transaction = transaction;
  }

  public static async getClientTransaction() {
    return await clientConnection.transaction();
  }

  public static async getAdminTransaction() {
    return await adminConnection.transaction();
  }
}
