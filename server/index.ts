import express from "express";
require("express-async-errors");
import ClientController from "./controllers/ClientController";
import cors from "cors";
import bodyParser from "body-parser";
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT;

const clientController = new ClientController();

app.post("/api/auth/login", async (req, res) => {
  console.log(req.body.username, req.body.password);
  res.send({});
});

app.get("/api/count", async (req, res) =>
  res.send(await clientController.getComicCount())
);
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

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
