import { Transaction } from "knex";
import CustomError from "../utils/CustomError";

import DAO from "./DAO";
import DatabaseError from "./DatabaseError";

enum TransactionType {
  CLIENT,
  ADMIN,
}

function DAOFunction<D extends DAO, ReturnType, ArgsType = void>(
  wrapped: (dao: D, args: ArgsType) => Promise<ReturnType>,
  type: TransactionType,
  constructor: { new (t: Transaction): D }
): (args: ArgsType) => Promise<ReturnType | CustomError> {
  return TransactionFunction(async (transaction: Transaction, args: ArgsType) => {
    let dao = new constructor(transaction);
    return wrapped(dao, args);
  }, type);
}

function TransactionFunction<ArgsType, ReturnType>(
  wrapped: (transaction: Transaction, args: ArgsType) => Promise<ReturnType>,
  type: TransactionType
): (args: ArgsType) => Promise<ReturnType | CustomError> {
  return async (args: ArgsType) => {
    let transaction = await (type === TransactionType.ADMIN
      ? DAO.getAdminTransaction()
      : DAO.getClientTransaction());
    try {
      let result = await wrapped(transaction, args);
      await transaction.commit();
      return result;
    } catch (e) {
      await transaction.rollback();
      console.error(e);
      return new DatabaseError(`got unknown exception ${e.message}`);
    }
  };
}

export { DAOFunction, TransactionType, TransactionFunction };
