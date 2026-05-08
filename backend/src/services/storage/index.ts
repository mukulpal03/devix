import { StorageProvider } from "./provider";
import { S3Provider } from "./s3";
import { LocalStorageProvider } from "./local";
import { STORAGE_TYPE } from "../../config/storage";

export class StorageService {
  private static instance: StorageProvider;

  static getInstance(): StorageProvider {
    if (!this.instance) {
      if (STORAGE_TYPE.toUpperCase() === "S3") {
        console.log("StorageService: Initializing S3 Provider");
        this.instance = new S3Provider();
      } else {
        console.log("StorageService: Initializing Local Storage Provider");
        this.instance = new LocalStorageProvider();
      }
    }
    return this.instance;
  }

  static async uploadProject(
    projectId: string,
    localPath: string,
  ): Promise<void> {
    await this.getInstance().uploadDirectory(projectId, localPath);
  }

  static async downloadProject(
    projectId: string,
    localPath: string,
  ): Promise<void> {
    await this.getInstance().downloadDirectory(projectId, localPath);
  }

  static async deleteProject(projectId: string): Promise<void> {
    await this.getInstance().deleteDirectory(projectId);
  }
}
