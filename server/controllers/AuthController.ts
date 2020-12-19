import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DAOFunction, TransactionType } from "../dao/DAOFunction";
import UserDAO from "../dao/UserDAO";

const SALT_ROUNDS = 10;

interface UserInfo {
  username: string;
  password: string;
}

export default class AuthController {
  verifyUser = DAOFunction(
    async (userDAO: UserDAO, { username, password }: UserInfo) => {
      let user = await userDAO.getUser(username);
      let match = !!user && bcrypt.compareSync(password, user.hash);
      if (!match) {
        return false;
      }
      return { token: jwt.sign({ username }, process.env.JWT_SECRET ?? "") };
    },
    TransactionType.CLIENT,
    UserDAO
  );

  addUser = DAOFunction(
    async (userDAO: UserDAO, { username, password }: UserInfo) => {
      let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS));
      let user = { username, hash };
      userDAO.create(user);
    },
    TransactionType.ADMIN,
    UserDAO
  );
}
