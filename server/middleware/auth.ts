import { RequestHandler } from "express";
import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";

let auth: RequestHandler = (req: any, res: any, next: () => void) => {
  let tokenEncoded = req.headers.authorization?.split(" ")[1];
  if (!tokenEncoded) {
    return res.status(403).send("no authorization sent");
  }
  jwt.verify(
    tokenEncoded,
    process.env.JWT_SECRET as string,
    (
      err: JsonWebTokenError | NotBeforeError | TokenExpiredError | null,
      user: object | undefined
    ) => {
      if (err) {
        return res.status(403).send(err);
      }
      next();
    }
  );
};

export default auth;
