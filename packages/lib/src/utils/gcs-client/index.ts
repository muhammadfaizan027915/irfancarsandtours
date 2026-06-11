import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";

export class GCSClient {
  private storage: Storage;
  private bucketName: string;
  private bucket: ReturnType<Storage["bucket"]>;

  constructor() {
    const getEnv = (key: string) =>
      process.env[key]?.trim().replace(/^["']|["']$/g, "") || "";

    const projectId = getEnv("GCS_PROJECT_ID");
    const clientEmail = getEnv("GCS_CLIENT_EMAIL");
    const rawPrivateKey = getEnv("GCS_PRIVATE_KEY");
    this.bucketName = getEnv("GCS_BUCKET_NAME");

    // if (!projectId || !clientEmail || !rawPrivateKey || !this.bucketName) {
    //   throw new Error(
    //     "GCS configuration is incomplete. Please check your environment variables.",
    //   );
    // }

    const privateKey = rawPrivateKey
      .replace(/\\n/g, "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join("\n");

    this.storage = new Storage({
      projectId,
      credentials: { client_email: clientEmail, private_key: privateKey },
    });

    this.bucket = this.storage.bucket(this.bucketName);
  }

  private getFile(identifier: string) {
    const fileName = this.extractFileNameFromUrl(identifier);
    return this.bucket.file(fileName);
  }

  extractFileNameFromUrl(url: string): string {
    if (!url) return "";

    const match = url.match(/https:\/\/storage\.googleapis\.com\/[^/]+\/(.+)/);
    const fileKey = match ? match[1] : url;

    return decodeURIComponent(fileKey?.split("?")[0]);
  }

  async createPublicUrl(fileName: string) {
    if (!fileName) return "";

    const extractedFileName = this.extractFileNameFromUrl(fileName);
    const fileKey = extractedFileName
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");

    return `https://storage.googleapis.com/${this.bucketName}/${fileKey}`;
  }

  async createSignedUploadUrl(
    fileName: string,
    contentType: string,
    expiresIn = 15 * 60 * 1000,
  ): Promise<string> {
    const options: GetSignedUrlConfig = {
      version: "v4",
      action: "write",
      expires: Date.now() + expiresIn,
      contentType,
    };
    const [url] = await this.getFile(fileName).getSignedUrl(options);
    return url;
  }

  async createSignedDownloadUrl(
    identifier: string,
    expiresIn = 5 * 60 * 1000,
  ): Promise<string> {
    const file = this.getFile(identifier);
    await file.makePublic();
    const [url] = await file.getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + expiresIn,
    });
    return url;
  }

  async uploadFile(
    fileName: string,
    buffer: Buffer,
    contentType = "application/octet-stream",
  ): Promise<string> {
    await this.getFile(fileName).save(buffer, {
      contentType,
      resumable: false,
      public: false,
    });
    return await this.createPublicUrl(fileName);
  }

  async deleteFile(identifier: string): Promise<boolean> {
    await this.getFile(identifier).delete({ ignoreNotFound: true });
    return true;
  }

  async moveFile(
    sourceIdentifier: string,
    destinationFileName: string,
  ): Promise<string> {
    const sourceFile = this.getFile(sourceIdentifier);
    const destinationFile = this.bucket.file(destinationFileName);

    await sourceFile.copy(destinationFile);
    await sourceFile.delete({ ignoreNotFound: true });

    return await this.createPublicUrl(destinationFileName);
  }

  async moveTempFileUrlToDestinationUrl(
    fileUrl: string,
    destinationPrefix: string,
  ): Promise<string> {
    const fileName = this.extractFileNameFromUrl(fileUrl);
    if (!fileName.startsWith("temp/")) {
      return fileUrl;
    }

    const prefix = destinationPrefix.endsWith("/")
      ? destinationPrefix
      : `${destinationPrefix}/`;
    const newFileName = fileName.replace("temp/", prefix);

    return await this.moveFile(fileUrl, newFileName);
  }

  async replaceFile(
    oldIdentifier: string,
    newFileName: string,
    buffer: Buffer,
    contentType = "application/octet-stream",
  ): Promise<string> {
    await this.deleteFile(oldIdentifier);
    return await this.uploadFile(newFileName, buffer, contentType);
  }

  async setBucketCors(
    origins: string[] = ["*"],
    methods: string[] = ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    responseHeaders: string[] = ["Content-Type", "Authorization"],
    maxAgeSeconds = 3600,
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

  async getFileMetadata(identifier: string) {
    const [metadata] = await this.getFile(identifier).getMetadata();
    return metadata;
  }

  async getFileBuffer(identifier: string): Promise<Buffer> {
    const [buffer] = await this.getFile(identifier).download();
    return buffer;
  }

  async fileExists(identifier: string): Promise<boolean> {
    const [exists] = await this.getFile(identifier).exists();
    return exists;
  }
}

type GlobalWithGCSClient = typeof globalThis & { gcsClient?: GCSClient };

const gcsClientSingleton =
  (globalThis as GlobalWithGCSClient).gcsClient || new GCSClient();

if (process.env.NODE_ENV !== "production") {
  (globalThis as GlobalWithGCSClient).gcsClient = gcsClientSingleton;
}

export const gcsClient = gcsClientSingleton;
