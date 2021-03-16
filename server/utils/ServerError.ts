import CustomError from "./CustomError";
import { ERROR_TYPE } from "./ErrorType";

export default class ServerError extends CustomError {
  type = ERROR_TYPE.SERVER;
}
