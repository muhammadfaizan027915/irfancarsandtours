import axios from "axios";

import {
  deleteFileFromCloudStorage,
  getPublicFileUrl,
  getSignedUploadUrl,
} from "@icat/web/actions/file";

export async function uploadFile(arg: {
  file: File;
  onPreview?: (url: string) => void;
  onProgress?: (progress: number) => void;
  onSuccess?: (fileUrl: string) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
}): Promise<string | null> {
  const { file, onPreview, onProgress, onSuccess, onError, onFinally } = arg;

  const previewUrl = URL.createObjectURL(file);
  onPreview?.(previewUrl);

  try {
    const uniqueFileName = generateUniqueFileName(file.name, "temp");

    const result = await getSignedUploadUrl(uniqueFileName, file.type);

    if (result.error) {
      onError?.(result.error);
      return null;
    }

    const signedUploadUrl = result.data;

    await axios.put(signedUploadUrl, file, {
      headers: { "Content-Type": file.type },
      onUploadProgress: (e) => {
        if (e.total) {
          const progress = Math.round((e.loaded * 100) / e.total);
          onProgress?.(progress);
        }
      },
    });

    const downloadUrl = await getPublicFileUrl(uniqueFileName);
    onSuccess?.(downloadUrl);
    return downloadUrl;
  } catch (error) {
    onError?.(error);
    return null;
  } finally {
    URL.revokeObjectURL(previewUrl);
    onFinally?.();
  }
}

export async function deleteFile(arg: {
  fileUrl: string;
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
}): Promise<boolean> {
  const { fileUrl, onStart, onSuccess, onError, onFinally } = arg;

  onStart?.();
  const result = await deleteFileFromCloudStorage(fileUrl);

  if (result.error) {
    onError?.(result.error);
    onFinally?.();

    return false;
  }

  onSuccess?.();
  onFinally?.();

  return true;
}

export function generateUniqueFileName(
  fileName: string,
  prefix?: string,
): string {
  const fileExtension = fileName.split(".").pop();
  const uniqueFileName = `${crypto.randomUUID()}.${fileExtension}`;

  if (!prefix) return uniqueFileName;

  const cleanPrefix = prefix.endsWith("/") ? prefix : `${prefix}/`;
  return `${cleanPrefix}${uniqueFileName}`;
}
