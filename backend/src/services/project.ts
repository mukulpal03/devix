import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";
import directoryTree from "directory-tree";
import { REACT_PROJECT_COMMAND } from "../config/server";
import { AppError } from "../utils/app-error";
import { DockerService } from "./docker";
import prisma from "../libs/db";

export const createProjectService = async (name?: string): Promise<string> => {
  const projectName = name || "Untitled Project";
  const ownerId = uuidv4();

  const project = await prisma.project.create({
    data: {
      name: projectName,
      ownerId,
      projectPath: `s3://placeholder/${uuidv4()}`,
    },
  });

  const id = project.id;
  const projectPath = path.resolve(process.cwd(), "projects", id);

  try {
    await fs.mkdir(projectPath, { recursive: true });
    await DockerService.scaffoldProject(id, REACT_PROJECT_COMMAND);

    return id;
  } catch (error) {
    await fs.rm(projectPath, { recursive: true, force: true }).catch(() => {});
    await DockerService.stopAndRemoveContainer(id).catch(() => {});
    await prisma.project.delete({ where: { id } }).catch(() => {});

    console.error(`Failed to create project ${id}:`, error);
    throw new AppError("Failed to create project", 500);
  }
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
