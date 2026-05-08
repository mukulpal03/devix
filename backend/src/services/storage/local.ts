import fs from "fs/promises";
import path from "path";
import { StorageProvider } from "./provider";

export class LocalStorageProvider implements StorageProvider {
  private readonly rootDir: string;

  constructor() {
    this.rootDir = path.resolve(process.cwd(), "blob-storage");
  }

  private getRemotePath(projectId: string, filePath: string = ""): string {
    return path.join(this.rootDir, projectId, filePath);
  }

  async uploadFile(
    projectId: string,
    filePath: string,
    content: Buffer | string,
  ): Promise<void> {
    const fullPath = this.getRemotePath(projectId, filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content);
  }

  async downloadFile(projectId: string, filePath: string): Promise<Buffer> {
    const fullPath = this.getRemotePath(projectId, filePath);
    return fs.readFile(fullPath);
  }

  async deleteFile(projectId: string, filePath: string): Promise<void> {
    const fullPath = this.getRemotePath(projectId, filePath);
    await fs.rm(fullPath, { force: true });
  }

  async uploadDirectory(projectId: string, localPath: string): Promise<void> {
    const remotePath = this.getRemotePath(projectId);
    await fs.mkdir(path.dirname(remotePath), { recursive: true });

    await fs.cp(localPath, remotePath, { 
      recursive: true,
      filter: (source) => {
        const basename = path.basename(source);
        return basename !== "node_modules" && basename !== ".git";
      }
    });
  }

  async downloadDirectory(projectId: string, localPath: string): Promise<void> {
    const remotePath = this.getRemotePath(projectId);

    const exists = await fs
      .access(remotePath)
      .then(() => true)
      .catch(() => false);
    if (!exists) {
      throw new Error(`Project ${projectId} not found in local blob storage`);
    }

    await fs.mkdir(localPath, { recursive: true });
    await fs.cp(remotePath, localPath, { recursive: true });
  }

  async deleteDirectory(projectId: string): Promise<void> {
    const remotePath = this.getRemotePath(projectId);
    await fs.rm(remotePath, { recursive: true, force: true });
  }
}
