import { Express } from "express";
var express = require("express");
let router: Express = express.Router();

import TagController from "../controllers/TagController";
const tagController = new TagController();

router.get("/", async (req, res) => {
  res.send(await tagController.getTags());
});

export default router;
