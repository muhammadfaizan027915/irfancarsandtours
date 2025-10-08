import {
  getPublicFileUrl,
  getSignedUploadUrl,
  deleteFileFromCloudStorage,
} from "@icat/web/actions/file";
import axios from "axios";

export async function uploadFile(arg: {
  file: File;
  onPreview?: (url: string) => void;
  onProgress?: (progress: number) => void;
  onSuccess?: (fileUrl: string) => void;
  onError?: (error: any) => void;
  onFinally?: () => void;
}): Promise<string | null> {
  const { file, onPreview, onProgress, onSuccess, onError, onFinally } = arg;

  const previewUrl = URL.createObjectURL(file);
  onPreview?.(previewUrl);

  try {
    const result = await getSignedUploadUrl(file.name, file.type);

    if (result.error) return null;

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

    const downloadUrl = await getPublicFileUrl(file.name);
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
  onError?: (error: any) => void;
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
