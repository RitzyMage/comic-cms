import express from "express";
require("express-async-errors");
import ClientController from "./controllers/ClientController";
import cors from "cors";
import bodyParser from "body-parser";
import AuthController from "./controllers/AuthController";
import auth from "./middleware/auth";
import AdminController from "./controllers/AdminController";
import TagController from "./controllers/TagController";
import ImageUpload from "./controllers/ImageUpload";
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: 10000000 }));
const PORT = process.env.PORT;

const clientController = new ClientController();
const authController = new AuthController();
const adminController = new AdminController();
const imageUploader = new ImageUpload();
const tagController = new TagController();

app.get("/api/tags", async (req, res) => {
  res.send(await tagController.getTags());
});

app.post("/api/auth/login", async (req, res) => {
  let { username, password } = req.body;
  let token = await authController.verifyUser({ username, password });
  if (!token) {
    res.status(400).send("Invalid username or password");
  } else {
    res.send(token);
  }
});

app.get("/api/count", async (req, res) => res.send(await clientController.getComicCount()));

app.get("/api/search", async (req, res) =>
  res.send(await clientController.search(req.query.params as string))
);

app.get("/api/images", async (req, res) => {
  let count = await clientController.getComicCount();
  if (req.query.tag) {
    let tag = (req.query.tag as string).toLowerCase().replace(/[^a-z0-9 ]/g, "");
    return res.send({
      images: await clientController.getTaggedImages(tag),
      ...count,
    });
  }
  if (req.query.first && req.query.last) {
    let first = parseInt(req.query.first as string);
    let last = parseInt(req.query.last as string);
    return res.send({
      images: await clientController.getBlockImages({ first, last }),
      ...count,
    });
  }
  res.send({
    images: await clientController.getEndImages(),
    ...count,
  });
});

app.get("/api/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  res.send(await clientController.getComicInfo(id));
});

app.post("/api/comic", auth, async (req, res) => {
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
  res.send({ success: true });
});

app.patch("/api/comic/:id", auth, async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
