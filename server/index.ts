import express from "express";
require("express-async-errors");
import ClientController from "./controllers/ClientController";
import cors from "cors";
import bodyParser from "body-parser";
import AuthController from "./controllers/AuthController";
import auth from "./middleware/auth";
import AdminController from "./controllers/AdminController";
import ImageUpload from "./controllers/ImageUpload";
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: 1000000 }));
const PORT = process.env.PORT;

const clientController = new ClientController();
const authController = new AuthController();
const adminController = new AdminController();
const imageUploader = new ImageUpload();

app.post("/api/auth/login", async (req, res) => {
  let token = await authController.verifyUser(req.body.username, req.body.password);
  if (!token) {
    res.status(400).send("Invalid username or password");
  } else {
    res.send(token);
  }
});

app.get("/api/count", async (req, res) => res.send(await clientController.getComicCount()));
app.get("/api/ends", async (req, res) => {
  res.send(await clientController.getEndImages());
});

app.get("/api/images", async (req, res) => {
  if (req.query.first && req.query.last) {
    let first = parseInt(req.query.first as string);
    let last = parseInt(req.query.last as string);
    res.send({
      images: await clientController.getBlockImages(first, last),
      ...(await clientController.getComicCount()),
    });
  }
  res.send({
    images: [],
    ...(await clientController.getComicCount()),
  });
});

app.get("/api/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  res.send(await clientController.getComic(id));
});

app.get("/api/:id/all", async (req, res) => {
  let id = parseInt(req.params.id);
  res.send({
    comicInfo: await clientController.getComic(id),
    comicCount: (await clientController.getComicCount())?.count,
    extraImages: await clientController.getEndImages(),
    tags: await clientController.getTags(id),
  });
});

app.post("/api/comic", auth, async (req, res) => {
  let { title, transcript, mouseover, image } = req.body;

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
  });
  res.send({ success: true });
});

app.patch("/api/comic/:id", auth, async (req, res) => {
  let { title, transcript, mouseover, image } = req.body;
  let id = parseInt(req.params.id);

  let imageData = await imageUploader.uploadImage(image, id);

  await adminController.editComic(id, {
    title,
    transcript,
    mouseover,
    ...imageData,
  });
  res.send({ success: true });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
