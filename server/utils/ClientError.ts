import CustomError from "./CustomError";
import { ERROR_TYPE } from "./ErrorType";

export default class ClientError extends CustomError {
  type = ERROR_TYPE.CLIENT;
}
