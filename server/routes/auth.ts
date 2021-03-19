import { Express } from "express";
var express = require("express");
let router: Express = express.Router();
import AuthController from "../controllers/AuthController";
import CheckIfError from "../utils/CheckIfError";

const authController = new AuthController();

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("must send username and password");
  }
  let token = await authController.verifyUser({ username, password });
  if (!token) {
    res.status(400).send("Invalid username or password");
  } else {
    let { result: tokenResult, error } = CheckIfError(token);
    if (error) {
      res.status(500).send(error);
    }
    res.send(tokenResult);
  }
});

export default router;
