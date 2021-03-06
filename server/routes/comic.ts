import ImageUpload from "../controllers/ImageUpload";
import FeedController from "../controllers/FeedController";
import BuildController from "../controllers/BuildController";
import auth from "../middleware/auth";
import AdminController from "../controllers/AdminController";
import ClientController from "../controllers/ClientController";

const feedController = new FeedController();
const buildController = new BuildController();
const adminController = new AdminController();
const imageUploader = new ImageUpload();
const clientController = new ClientController();

import { Express } from "express";
var express = require("express"),
  router: Express = express.Router();

router.get("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    res.send(await clientController.getComicInfo(id));
  } catch (e) {
    let error = e as Error;
    if (error.message.includes("does not exist")) {
      return res.status(404).send(error.message);
    }
    res.status(500).send(`error ${e.message} thrown in getComicInfo`);
  }
});

router.post("/", auth, async (req, res) => {
  let { title, transcript, mouseover, image, tags } = req.body;

  if (!title) {
    return res.status(400).send("title required");
  }
  if (!transcript) {
    return res.status(400).send("transcript required");
  }
  if (!image) {
    return res.status(400).send("image required");
  }

  let index = Number((await clientController.getComicCount())?.count) + 1;
  let imageData = await imageUploader.uploadImage(image, index);

  await adminController.addComic({
    title,
    transcript,
    mouseover,
    ...imageData,
    tags,
  });
  await feedController.generateUpdatedFeed();

  if (process.env.NODE_ENV != "dev") {
    /*await*/ buildController.generateStaticBuild();
  }

  res.send({ success: true });
});

router.patch("/:id", auth, async (req, res) => {
  let { title, transcript, mouseover, image, tags } = req.body;
  let id = parseInt(req.params.id);

  let imageData;
  if (image) {
    imageData = await imageUploader.uploadImage(image, id);
  }

  await adminController.editComic({
    id,
    params: {
      title,
      transcript,
      mouseover,
      ...imageData,
      tags,
    },
  });
  res.send({ success: true });
});

export default router;
