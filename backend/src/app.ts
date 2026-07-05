import express from "express";
import cors from "cors";
import apiRouter from "./routes";
import healthRouter from "./routes/health";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./middlewares/error-handler";
import { globalApiLimiter } from "./middlewares/rate-limit";
import { previewProxyMiddleware } from "./middlewares/preview-proxy";

const app = express();

app.use(cors());

app.use(previewProxyMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", globalApiLimiter, apiRouter);
app.use("/health", healthRouter);

app.get("/ping", (_, res) => {
  res.json({ message: "pong" });
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
