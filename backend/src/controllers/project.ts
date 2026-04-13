import { Request, Response } from "express";
import { createProjectService } from "../services/project";

export const createProject = async (req: Request, res: Response) => {
  try {
    const id = await createProjectService();

    return res.status(201).json({ message: "Project created", id });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create project" });
  }
};
