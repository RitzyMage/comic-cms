import express from "express";
require("express-async-errors");
import ClientController from "./controllers/ClientController";
import cors from "cors";
import bodyParser from "body-parser";
import AuthController from "./controllers/AuthController";
import auth from "./middleware/auth";
import AdminController from "./controllers/AdminController";
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: 1000000 }));
const PORT = process.env.PORT;

const clientController = new ClientController();
const authController = new AuthController();
const adminController = new AdminController();

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
    res.send(await clientController.getBlockImages(first, last));
  }
  res.send([]);
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
    res.status(400).send("title required");
  }
  if (!transcript) {
    res.status(400).send("transcript required");
  }
  if (!image) {
    res.status(400).send("image required");
  }

  let image_lowres = "http://example.com/logo.png";
  let height = 800;
  let width = 900;
  await adminController.addComic({
    title,
    transcript,
    mouseover,
    image: image_lowres,
    image_lowres,
    height,
    width,
  });
  res.send({ success: true });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
