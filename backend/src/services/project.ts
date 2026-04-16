import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";
import directoryTree from "directory-tree";
import { REACT_PROJECT_COMMAND } from "../config/server";
import { execAsync } from "../utils/exec";
import { AppError } from "../utils/app-error";

export const createProjectService = async (): Promise<string> => {
  const id = uuidv4();
  const projectPath = `projects/${id}`;

  try {
    await fs.mkdir(projectPath);
    await execAsync(REACT_PROJECT_COMMAND, {
      cwd: projectPath,
    });
  } catch (error) {
    throw new AppError("Failed to create project", 500);
  }

  return id;
};

export interface DirectoryNode {
  name: string;
  size?: number;
  type?: "directory" | "file";
  extension?: string;
  children?: DirectoryNode[];
}

export const getDirectoryTreeService = async (
  projectId: string,
): Promise<DirectoryNode> => {
  const trimmedProjectId = projectId.trim();
  if (!trimmedProjectId) {
    throw new AppError("Project id is required", 400);
  }

  const projectsRoot = path.resolve(process.cwd(), "projects");
  const resolvedPath = path.resolve(projectsRoot, trimmedProjectId);

  if (!resolvedPath.startsWith(projectsRoot)) {
    throw new AppError("Invalid project id", 400);
  }

  const stats = await fs.stat(resolvedPath).catch(() => null);

  if (!stats) {
    throw new AppError("Project not found", 404);
  }

  if (!stats.isDirectory()) {
    throw new AppError("Project path is not a directory", 400);
  }

  const tree = directoryTree(resolvedPath, {
    normalizePath: true,
  }) as DirectoryNode | null;

  if (!tree) {
    throw new AppError("Unable to build directory tree", 500);
  }

  return tree;
};
