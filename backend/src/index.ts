import express from "express";
import cors from "cors";
import { PORT } from "./config/server";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/ping", (_, res) => {
  return res.json({ message: "pong" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
