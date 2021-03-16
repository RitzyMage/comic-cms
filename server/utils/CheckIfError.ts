import CustomError from "./CustomError";
import isError from "./IsError";

export default function CheckIfError<T>(result: T | CustomError) {
  if (isError(result)) {
    return {
      error: result as CustomError,
      result: undefined,
    };
  }
  return {
    error: undefined,
    result: result as T,
  };
}
