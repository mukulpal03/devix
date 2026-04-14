import express from "express";
import cors from "cors";
import apiRouter from "./routes";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./middlewares/error-handler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", apiRouter);

app.get("/ping", (_, res) => {
  res.json({ message: "pong" });
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
