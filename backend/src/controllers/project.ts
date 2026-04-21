import { NextFunction, Request, Response } from "express";
import {
  createProjectService,
  getDirectoryTreeService,
} from "../services/project";
import { DockerService } from "../services/docker";
import { AppError } from "../utils/app-error";

export const createProject = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await createProjectService();

    return res.status(201).json({ message: "Project created", id });
  } catch (error) {
    return next(error);
  }
};

export const getDirectoryTree = async (
  req: Request<{ projectId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { projectId } = req.params;

  if (!projectId) {
    return next(new AppError("Param 'projectId' is required", 400));
  }

  try {
    const tree = await getDirectoryTreeService(projectId);
    return res.status(200).json({
      message: "Directory tree fetched successfully",
      tree,
    });
  } catch (error) {
    return next(error);
  }
};

export const getProjectPorts = async (
  req: Request<{ projectId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { projectId } = req.params;

  if (!projectId) {
    return next(new AppError("Param 'projectId' is required", 400));
  }

  try {
    const ports = await DockerService.getContainerPorts(projectId);
    return res.status(200).json({
      message: "Project ports fetched successfully",
      ports,
    });
  } catch (error) {
    return next(error);
  }
};
