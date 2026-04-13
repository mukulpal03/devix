import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
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
