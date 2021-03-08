import { Express } from "express";
var express = require("express");
let router: Express = express.Router();
import AuthController from "../controllers/AuthController";

const authController = new AuthController();

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  let token = await authController.verifyUser({ username, password });
  if (!token) {
    res.status(400).send("Invalid username or password");
  } else {
    res.send(token);
  }
});

export default router;
