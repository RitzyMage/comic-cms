import express from "express";
import ClientController from "./controllers/ClientController";
import cors from "cors";
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT;

const clientController = new ClientController();

app.get("/api/count", async (req, res) =>
  res.send(await clientController.getComicCount())
);
app.get("/api/ends", async (req, res) => {
  res.send(await clientController.getEndImages());
});
app.get("/api/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  res.send(await clientController.getComic(id));
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
