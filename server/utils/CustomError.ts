import { ERROR_TYPE } from "./ErrorType";

export default abstract class CustomError {
  public message: string;
  constructor(message: string) {
    this.message = message;
  }
  public abstract type: ERROR_TYPE;
  public get isCustomError() {
    return true;
  }
}
