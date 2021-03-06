import express from "express";
require("express-async-errors");
import ClientController from "./controllers/ClientController";
import cors from "cors";
import bodyParser from "body-parser";
import AuthController from "./controllers/AuthController";
import TagController from "./controllers/TagController";

import ComicRoutes from "./routes/comic";
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: 10000000 }));
const PORT = process.env.PORT;

const clientController = new ClientController();
const authController = new AuthController();
const tagController = new TagController();

app.use("/api/comic", ComicRoutes);

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
    let tag = (req.query.tag as string).toLowerCase().replace(/[^a-z0-9-. ]/g, "");
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

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
