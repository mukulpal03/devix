import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs/promises";
import path from "path";
import mime from "mime-types";
import { StorageProvider } from "./provider";
import { S3_CONFIG } from "../../config/storage";

export class S3Provider implements StorageProvider {
  private client: S3Client;
  private bucket: string;

  constructor() {
    this.bucket = S3_CONFIG.bucket;
    this.client = new S3Client({
      region: S3_CONFIG.region,
      credentials: {
        accessKeyId: S3_CONFIG.accessKeyId,
        secretAccessKey: S3_CONFIG.secretAccessKey,
      },
      forcePathStyle: S3_CONFIG.forcePathStyle,
    });
  }

  private getS3Key(projectId: string, filePath: string = ""): string {
    // S3 keys use forward slashes even on Windows
    return path.join(projectId, filePath).replace(/\\/g, "/");
  }

  async uploadFile(
    projectId: string,
    filePath: string,
    content: Buffer | string,
  ): Promise<void> {
    const key = this.getS3Key(projectId, filePath);
    const contentType = mime.lookup(filePath) || "application/octet-stream";

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: content,
        ContentType: contentType,
      }),
    );
  }

  async downloadFile(projectId: string, filePath: string): Promise<Buffer> {
    const key = this.getS3Key(projectId, filePath);
    const response = await this.client.send(
      new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );

    const streamToBuffer = (stream: any): Promise<Buffer> =>
      new Promise((resolve, reject) => {
        const chunks: any[] = [];
        stream.on("data", (chunk: any) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks)));
      });

    return streamToBuffer(response.Body);
  }

  async deleteFile(projectId: string, filePath: string): Promise<void> {
    const key = this.getS3Key(projectId, filePath);
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }

  async uploadDirectory(projectId: string, localPath: string): Promise<void> {
    const files = await this.getAllFiles(localPath);

    await Promise.all(
      files.map(async (file) => {
        const relativePath = path.relative(localPath, file);
        const fileContent = await fs.readFile(file);
        const key = this.getS3Key(projectId, relativePath);
        const contentType = mime.lookup(file) || "application/octet-stream";

        const upload = new Upload({
          client: this.client,
          params: {
            Bucket: this.bucket,
            Key: key,
            Body: fileContent,
            ContentType: contentType,
          },
        });

        await upload.done();
      }),
    );
  }

  async downloadDirectory(projectId: string, localPath: string): Promise<void> {
    const prefix = this.getS3Key(projectId) + "/";
    let isTruncated = true;
    let continuationToken: string | undefined;

    while (isTruncated) {
      const listResponse = await this.client.send(
        new ListObjectsV2Command({
          Bucket: this.bucket,
          Prefix: prefix,
          ContinuationToken: continuationToken,
        }),
      );

      if (listResponse.Contents) {
        await Promise.all(
          listResponse.Contents.map(async (obj) => {
            if (!obj.Key) return;

            const relativePath = obj.Key.substring(prefix.length);
            const destination = path.join(localPath, relativePath);

            await fs.mkdir(path.dirname(destination), { recursive: true });

            const fileData = await this.downloadFile(projectId, relativePath);
            await fs.writeFile(destination, fileData);
          }),
        );
      }

      isTruncated = listResponse.IsTruncated || false;
      continuationToken = listResponse.NextContinuationToken;
    }
  }

  async deleteDirectory(projectId: string): Promise<void> {
    const prefix = this.getS3Key(projectId) + "/";
    let isTruncated = true;
    let continuationToken: string | undefined;

    while (isTruncated) {
      const listResponse = await this.client.send(
        new ListObjectsV2Command({
          Bucket: this.bucket,
          Prefix: prefix,
          ContinuationToken: continuationToken,
        }),
      );

      if (listResponse.Contents && listResponse.Contents.length > 0) {
        await this.client.send(
          new DeleteObjectsCommand({
            Bucket: this.bucket,
            Delete: {
              Objects: listResponse.Contents.map((obj) => ({ Key: obj.Key })),
            },
          }),
        );
      }

      isTruncated = listResponse.IsTruncated || false;
      continuationToken = listResponse.NextContinuationToken;
    }
  }

  private async getAllFiles(
    dirPath: string,
    fileList: string[] = [],
  ): Promise<string[]> {
    const files = await fs.readdir(dirPath);
    for (const file of files) {
      const name = path.join(dirPath, file);
      const stat = await fs.stat(name);
      if (stat.isDirectory()) {
        await this.getAllFiles(name, fileList);
      } else {
        fileList.push(name);
      }
    }
    return fileList;
  }
}
