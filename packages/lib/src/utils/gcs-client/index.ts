import { Storage, GetSignedUrlConfig } from "@google-cloud/storage";

export class GCSClient {
  private storage: Storage;
  private bucketName: string;
  private bucket: ReturnType<Storage["bucket"]>;

  constructor() {
    this.storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
    });

    this.bucketName = process.env.GCS_BUCKET_NAME!;
    this.bucket = this.storage.bucket(this.bucketName);
  }

  async createSignedUploadUrl(
    fileName: string,
    contentType: string,
    expiresIn = 15 * 60 * 1000
  ): Promise<string> {
    const file = this.bucket.file(fileName);

    const options: GetSignedUrlConfig = {
      version: "v4",
      action: "write",
      expires: Date.now() + expiresIn,
      contentType,
    };

    const [url] = await file.getSignedUrl(options);
    return url;
  }

  async createSignedDownloadUrl(
    fileName: string,
    expiresIn = 5 * 60 * 1000
  ): Promise<string> {
    const file = this.bucket.file(fileName);

    const options: GetSignedUrlConfig = {
      version: "v4",
      action: "read",
      expires: Date.now() + expiresIn,
    };

    const [url] = await file.getSignedUrl(options);
    return url;
  }

  async uploadFile(
    fileName: string,
    buffer: Buffer,
    contentType = "application/octet-stream"
  ): Promise<string> {
    const file = this.bucket.file(fileName);
    await file.save(buffer, {
      contentType,
      resumable: false,
      public: false,
    });
    return `gs://${this.bucketName}/${fileName}`;
  }

  async deleteFile(fileName: string): Promise<boolean> {
    const file = this.bucket.file(fileName);
    await file.delete({ ignoreNotFound: true });
    return true;
  }

  async replaceFile(
    oldFileName: string,
    newFileName: string,
    buffer: Buffer,
    contentType = "application/octet-stream"
  ): Promise<string> {
    await this.deleteFile(oldFileName);
    return this.uploadFile(newFileName, buffer, contentType);
  }

  async setBucketCors(
    origins: string[] = ["*"],
    methods: string[] = ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    responseHeaders: string[] = ["Content-Type", "Authorization"],
    maxAgeSeconds = 3600
  ): Promise<void> {
    await this.bucket.setCorsConfiguration([
      {
        origin: origins,
        method: methods,
        responseHeader: responseHeaders,
        maxAgeSeconds,
      },
    ]);
  }

  async getFileMetadata(fileName: string) {
    const file = this.bucket.file(fileName);
    const [metadata] = await file.getMetadata();
    return metadata;
  }

  async getFileBuffer(fileName: string): Promise<Buffer> {
    const file = this.bucket.file(fileName);
    const [buffer] = await file.download();
    return buffer;
  }

  async fileExists(fileName: string): Promise<boolean> {
    const file = this.bucket.file(fileName);
    const [exists] = await file.exists();
    return exists;
  }
}

export const gcsClient = new GCSClient();
