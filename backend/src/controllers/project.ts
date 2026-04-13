import { Request, Response } from "express";
import util from "util";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

const execAsync = util.promisify(exec);

export const createProject = async (req: Request, res: Response) => {
  try {
    const id = uuidv4();
    await fs.mkdir(`projects/${id}`);

    await execAsync("npm create vite@latest . -- --template react", {
      cwd: `projects/${id}`,
    });

    return res.status(201).json({ message: "Project created", id });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create project" });
  }
};
