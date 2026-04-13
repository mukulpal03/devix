import { Request, Response } from "express";
import {
  createProjectService,
  getDirectoryTreeService,
} from "../services/project";

export const createProject = async (req: Request, res: Response) => {
  try {
    const id = await createProjectService();

    return res.status(201).json({ message: "Project created", id });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create project" });
  }
};

export const getDirectoryTree = async (
  req: Request<{ projectId: string }>,
  res: Response
) => {
  const { projectId } = req.params;

  if (!projectId) {
    return res.status(400).json({ message: "Param 'projectId' is required" });
  }

  try {
    const tree = await getDirectoryTreeService(projectId);
    return res.status(200).json({
      message: "Directory tree fetched successfully",
      tree,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch directory tree";

    if (message === "Project not found") {
      return res.status(404).json({ message });
    }

    if (
      message === "Project id is required" ||
      message === "Project path is not a directory" ||
      message === "Invalid project id"
    ) {
      return res.status(400).json({ message });
    }

    return res.status(500).json({ message: "Failed to fetch directory tree" });
  }
};
