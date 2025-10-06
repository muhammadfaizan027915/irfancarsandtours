import {
  deleteFileFromCloudStorage,
  getSignedDownloadUrl,
  getSignedUploadUrl,
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
    const signedUploadUrl = await getSignedUploadUrl(file.name, file.type);

    await axios.put(signedUploadUrl, file, {
      headers: { "Content-Type": file.type },
      onUploadProgress: (e) => {
        if (e.total) {
          const progress = Math.round((e.loaded * 100) / e.total);
          onProgress?.(progress);
        }
      },
    });

    const downloadUrl = await getSignedDownloadUrl(file.name);

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

  try {
    onStart?.();
    await deleteFileFromCloudStorage(fileUrl);
    onSuccess?.();
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    onError?.(error);
    return false;
  } finally {
    onFinally?.();
  }
}
