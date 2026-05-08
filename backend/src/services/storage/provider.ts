export interface StorageProvider {
  uploadFile(projectId: string, filePath: string, content: Buffer | string): Promise<void>;
  downloadFile(projectId: string, filePath: string): Promise<Buffer>;
  deleteFile(projectId: string, filePath: string): Promise<void>;
  uploadDirectory(projectId: string, localPath: string): Promise<void>;
  downloadDirectory(projectId: string, localPath: string): Promise<void>;
  deleteDirectory(projectId: string): Promise<void>;
}
