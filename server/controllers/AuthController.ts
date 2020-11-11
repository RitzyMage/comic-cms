import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export default class AuthController {
  async verifyUser(username: string, password: string) {
    let hash = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_ROUNDS));
    console.log(username, hash);
    return { token: "TOKEN" };
  }
}
