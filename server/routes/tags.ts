import { Express } from "express";
var express = require("express");
let router: Express = express.Router();

import TagController from "../controllers/TagController";
import CheckIfError from "../utils/CheckIfError";
import { returnError } from "../utils/returnError";
const tagController = new TagController();

router.get("/", async (req, res) => {
  let result = CheckIfError(await tagController.getTags());
  if (result.error) {
    return returnError(res, result.error);
  }
  return res.send(result.result);
});

export default router;
