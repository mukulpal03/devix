import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

export const globalErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const isProduction = process.env.NODE_ENV === "production";

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      ...(isProduction ? {} : { stack: error.stack }),
    });
  }

  const fallbackMessage = "Internal server error";
  const safeMessage = error instanceof Error ? error.message : fallbackMessage;

  return res.status(500).json({
    message: isProduction ? fallbackMessage : safeMessage,
    ...(isProduction
      ? {}
      : { stack: error instanceof Error ? error.stack : undefined }),
  });
};
