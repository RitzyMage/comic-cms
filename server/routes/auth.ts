import { Express } from "express";
var express = require("express");
let router: Express = express.Router();
import AuthController from "../controllers/AuthController";
import CheckIfError from "../utils/CheckIfError";
import ClientError from "../utils/ClientError";
import { returnError } from "../utils/returnError";

const authController = new AuthController();

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return returnError(res, new ClientError("must send username and password"));
  }
  let tokenResult = CheckIfError(await authController.verifyUser({ username, password }));

  if (tokenResult.error) {
    return returnError(res, tokenResult.error);
  }
  if (!tokenResult.result.token) {
    return returnError(res, new ClientError("Invalid username or password"));
  }
  res.send(tokenResult.result);
});

export default router;
