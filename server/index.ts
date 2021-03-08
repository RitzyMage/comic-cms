require("express-async-errors");
require("dotenv").config();

import express from "express";
import ClientController from "./controllers/ClientController";
import cors from "cors";
import bodyParser from "body-parser";

import ComicRoutes from "./routes/comic";
import TagRoutes from "./routes/tags";
import AuthRoutes from "./routes/auth";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: 10000000 }));
const PORT = process.env.PORT;

const clientController = new ClientController();

app.use("/api/comic", ComicRoutes);
app.use("/api/tags", TagRoutes);
app.use("/api/auth", AuthRoutes);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
