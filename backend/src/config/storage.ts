export const STORAGE_TYPE = process.env.STORAGE_TYPE || "LOCAL";

export const S3_CONFIG = {
  bucket: process.env.S3_BUCKET!,
  region: process.env.S3_REGION!,
  accessKeyId: process.env.S3_ACCESS_KEY_ID!,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
};
