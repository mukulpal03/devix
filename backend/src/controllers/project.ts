import { Request, Response } from "express";
import util from "util";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import { REACT_PROJECT_COMMAND } from "../config/server";

const execAsync = util.promisify(exec);

export const createProject = async (req: Request, res: Response) => {
  try {
    const id = uuidv4();
    await fs.mkdir(`projects/${id}`);

    await execAsync(REACT_PROJECT_COMMAND, {
      cwd: `projects/${id}`,
    });

    return res.status(201).json({ message: "Project created", id });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create project" });
  }
};
