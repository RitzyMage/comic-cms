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
import CheckIfError from "../utils/CheckIfError";
import ClientError from "../utils/ClientError";
import { returnError } from "../utils/returnError";
var express = require("express");
let router: Express = express.Router();

router.post("/", auth, async (req, res) => {
  let { title, transcript, mouseover, image, tags } = req.body;

  if (!title) {
    return returnError(res, new ClientError(`title required`));
  }
  if (!transcript) {
    return returnError(res, new ClientError(`transcript required`));
  }
  if (!image) {
    return returnError(res, new ClientError(`image required`));
  }
  if (tags) {
    if (!Array.isArray(tags)) {
      return returnError(res, new ClientError(`if tags are given, they must be an array`));
    }
    if (!tags.every(tag => typeof tag === "string")) {
      return returnError(res, new ClientError(`each tag must be a string`));
    }
  }

  let count = CheckIfError(await clientController.getComicCount());
  if (count.error) {
    return returnError(res, count.error);
  }
  let index = count.result + 1;

  let imageDataResult = CheckIfError(await imageUploader.uploadImage(image, index));
  if (imageDataResult.error) {
    return returnError(res, imageDataResult.error);
  }
  let imageData = imageDataResult.result;

  let addResult = CheckIfError(
    await adminController.addComic({
      title,
      transcript,
      mouseover,
      ...imageData,
      tags,
    })
  );
  if (addResult.error) {
    return returnError(res, addResult.error);
  }

  let feedResult = CheckIfError(await feedController.generateUpdatedFeed());
  if (feedResult.error) {
    console.error("error while generating feed");
    console.error(feedResult.error);
  }

  if (process.env.NODE_ENV != "dev") {
    /*await*/ buildController.generateStaticBuild();
  }

  res.send({ success: true });
});

router.patch("/:id", auth, async (req, res) => {
  let { title, transcript, mouseover, image, tags } = req.body;
  let id = parseInt(req.params.id);

  if (isNaN(id)) {
    return returnError(res, new ClientError(`invalid comic id ${id}`));
  }

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

router.get("/count", async (req, res) => {
  let result = CheckIfError(await clientController.getComicCount());
  if (result.error) {
    return returnError(res, result.error);
  }
  return res.send({ count: result.result });
});

router.get("/search", async (req, res) => {
  let search = req.query.params;
  if (typeof search !== "string") {
    return returnError(res, new ClientError(`search terms must be string`));
  }

  let result = CheckIfError(await clientController.search(req.query.params as string));
  if (result.error) {
    return returnError(res, result.error);
  }

  return res.send(result.result);
});

router.get("/images", async (req, res) => {
  let { tag, first, last } = req.query;

  let count = CheckIfError(await clientController.getComicCount());
  if (count.error) {
    return returnError(res, count.error);
  }
  if (tag) {
    if (typeof tag !== "string") {
      return returnError(res, new ClientError(`tag must be string`));
    }
    let tagEscaped = (req.query.tag as string).toLowerCase().replace(/[^a-z0-9-(). ]/g, "");
    let imageResult = CheckIfError(await clientController.getTaggedImages(tagEscaped));
    if (imageResult.error) {
      return returnError(res, imageResult.error);
    }

    return res.send({
      images: imageResult.result,
      count,
    });
  }
  if (first && last) {
    let firstIndex = parseInt(first as string);
    let lastIndex = parseInt(last as string);
    if (isNaN(firstIndex) || isNaN(lastIndex)) {
      return returnError(res, new ClientError(`invalid range ${firstIndex} to ${lastIndex}`));
    }

    let imageResult = CheckIfError(
      await clientController.getBlockImages({ first: firstIndex, last: lastIndex })
    );
    if (imageResult.error) {
      return returnError(res, imageResult.error);
    }
    return res.send({
      images: imageResult.result,
      count,
    });
  }

  let endImagesResult = CheckIfError(await clientController.getEndImages());
  if (endImagesResult.error) {
    return returnError(res, endImagesResult.error);
  }
  res.send({
    images: endImagesResult.result,
    count,
  });
});

router.get("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  if (isNaN(id)) {
    return returnError(res, new ClientError(`${id} is not a valid id`));
  }

  let getComicResult = CheckIfError(await clientController.getComicInfo(id));
  if (getComicResult.error) {
    return returnError(res, getComicResult.error);
  }
  return res.send(getComicResult.result);
});

export default router;
