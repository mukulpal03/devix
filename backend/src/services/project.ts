import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";
import directoryTree from "directory-tree";
import { REACT_PROJECT_COMMAND } from "../config/server";
import { execAsync } from "../utils/exec";

export const createProjectService = async (): Promise<string> => {
  const id = uuidv4();
  const projectPath = `projects/${id}`;

  await fs.mkdir(projectPath);
  await execAsync(REACT_PROJECT_COMMAND, {
    cwd: projectPath,
  });

  return id;
};

export interface DirectoryNode {
  path: string;
  name: string;
  size?: number;
  type?: "directory" | "file";
  extension?: string;
  children?: DirectoryNode[];
}

export const getDirectoryTreeService = async (
  projectId: string
): Promise<DirectoryNode> => {
  const trimmedProjectId = projectId.trim();
  if (!trimmedProjectId) {
    throw new Error("Project id is required");
  }

  const projectsRoot = path.resolve(process.cwd(), "projects");
  const resolvedPath = path.resolve(projectsRoot, trimmedProjectId);

  if (!resolvedPath.startsWith(projectsRoot)) {
    throw new Error("Invalid project id");
  }

  const stats = await fs.stat(resolvedPath).catch(() => null);

  if (!stats) {
    throw new Error("Project not found");
  }

  if (!stats.isDirectory()) {
    throw new Error("Project path is not a directory");
  }

  const tree = directoryTree(resolvedPath, {
    normalizePath: true,
  }) as DirectoryNode | null;

  if (!tree) {
    throw new Error("Unable to build directory tree");
  }

  return tree;
};
