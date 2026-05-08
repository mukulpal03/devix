import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";
import directoryTree from "directory-tree";
import { REACT_PROJECT_COMMAND } from "../config/server";
import { AppError } from "../utils/app-error";
import { DockerService } from "./docker";
import { StorageService } from "./storage";
import prisma from "../libs/db";
import { generateRandomName } from "../utils/random-name";

export const createProjectService = async (): Promise<{
  id: string;
  name: string;
}> => {
  const projectName = generateRandomName();
  const ownerId = uuidv4();
  let projectId: string | undefined;
  let projectPath: string | undefined;

  try {
    const project = await prisma.project.create({
      data: {
        name: projectName,
        ownerId,
        projectPath: `s3://placeholder/${uuidv4()}`,
      },
    });

    projectId = project.id;
    projectPath = path.resolve(process.cwd(), "projects", projectId);

    await fs.mkdir(projectPath, { recursive: true });
    await DockerService.scaffoldProject(projectId, REACT_PROJECT_COMMAND);

    console.log(`Syncing scaffolded project ${projectId} to blob storage...`);
    await StorageService.uploadProject(projectId, projectPath);

    return { id: projectId, name: projectName };
  } catch (error) {
    console.log("error while creating project", error);

    if (projectPath) {
      await fs
        .rm(projectPath, { recursive: true, force: true })
        .catch(() => {});
    }
    if (projectId) {
      await DockerService.stopAndRemoveContainer(projectId).catch(() => {});
      await prisma.project.delete({ where: { id: projectId } }).catch(() => {});
    }

    console.error(`Failed to create project ${projectId || "unknown"}:`, error);
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
