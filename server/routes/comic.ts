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
import { isObject } from "util";
import isError from "../utils/IsError";
import CheckIfError from "../utils/CheckIfError";
var express = require("express");
let router: Express = express.Router();

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

  let count = CheckIfError(await clientController.getComicCount());
  if (count.error) {
    return res.status(500).send(count.error);
  }
  let index = count.result + 1;
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

router.get("/count", async (req, res) => res.send(await clientController.getComicCount()));

router.get("/search", async (req, res) =>
  res.send(await clientController.search(req.query.params as string))
);

router.get("/images", async (req, res) => {
  let count = await clientController.getComicCount();
  if (isError(count)) {
    return res.status(500).send(count);
  }
  if (req.query.tag) {
    let tag = (req.query.tag as string).toLowerCase().replace(/[^a-z0-9-(). ]/g, "");
    return res.send({
      images: await clientController.getTaggedImages(tag),
      count,
    });
  }
  if (req.query.first && req.query.last) {
    let first = parseInt(req.query.first as string);
    let last = parseInt(req.query.last as string);
    if (isError(count)) {
      return res.status(500).send(count);
    }
    return res.send({
      images: await clientController.getBlockImages({ first, last }),
      count,
    });
  }
  res.send({
    images: await clientController.getEndImages(),
    count,
  });
});

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

export default router;
