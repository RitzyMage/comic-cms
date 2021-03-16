import CustomError from "../utils/CustomError";
import { ERROR_TYPE } from "../utils/ErrorType";

export default class DatabaseError extends CustomError {
  type = ERROR_TYPE.DATABASE;
}
