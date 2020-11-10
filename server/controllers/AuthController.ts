export default class AuthController {
  async verifyUser(username: string, password: string) {
    console.log(username, password);
    return { token: "TOKEN" };
  }
}
