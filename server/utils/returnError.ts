import { Response } from "express";
import CustomError from "./CustomError";
import { ERROR_TYPE } from "./ErrorType";

export function returnError(res: Response<any>, error: CustomError) {
  if (error.type === ERROR_TYPE.CLIENT) {
    let statusCode = error.message.includes("does not exist") ? 404 : 400;
    return res.status(statusCode).send(error);
  }
  return res.status(500).send(error);
}
