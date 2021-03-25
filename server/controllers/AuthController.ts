import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DAOFunction, TransactionType } from "../dao/DAOFunction";
import UserDAO from "../dao/UserDAO";
import CheckIfError from "../utils/CheckIfError";

interface UserInfo {
  username: string;
  password: string;
}

export default class AuthController {
  verifyUser = DAOFunction(
    async (userDAO: UserDAO, { username, password }: UserInfo) => {
      let userResult = CheckIfError(await userDAO.getUser(username));
      if (userResult.error) {
        return userResult.error;
      }
      let user = userResult.result;
      let match = !!user && bcrypt.compareSync(password, user.hash);
      if (!match) {
        return { token: "" };
      }
      return { token: jwt.sign({ username }, process.env.JWT_SECRET ?? "") };
    },
    TransactionType.CLIENT,
    UserDAO
  );
}
