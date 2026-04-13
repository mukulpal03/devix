import express from "express";
import cors from "cors";
import { PORT } from "./config/server";
import apiRouter from "./routes";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./middlewares/error-handler";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/api", apiRouter);

app.get("/ping", (_, res) => {
  return res.json({ message: "pong" });
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
