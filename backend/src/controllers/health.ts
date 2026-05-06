import { Request, Response } from "express";
import { ConnectionRegistry } from "../services/connection-registry";
import { ProjectWatcherService } from "../socket/watcher";

export const getHealth = (req: Request, res: Response) => {
  res.status(200).json({
    status: "UP",
    uptime: process.uptime(),
    timestamp: Date.now(),
    metrics: {
      activeProjects: ConnectionRegistry.getActiveProjectCount(),
      activeWatchers: ProjectWatcherService.getWatcherCount(),
      memoryUsage: process.memoryUsage(),
    },
  });
};
