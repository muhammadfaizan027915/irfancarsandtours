"use client";

import { useState } from "react";
import { getSignedDownloadUrl, getSignedUploadUrl } from "@icat/web/actions/file";
import axios from "axios";

interface UseFileUploadOptions {
  onSuccess?: (fileUrl: string) => void;
  onError?: (error: any) => void;
  onProgress?: (progress: number) => void;
}

export function useFileUpload(options?: UseFileUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!file) return null;
    setPreviewUrl(URL.createObjectURL(file));
    return upload(file, file.name, file.type);
  };

  const upload = async (
    file: Blob | Buffer,
    fileName: string,
    contentType = "application/octet-stream"
  ): Promise<string | null> => {
    try {
      setIsUploading(true);
      setProgress(10);

      const signedUploadUrl = await getSignedUploadUrl(fileName, contentType);

      await axios.put(signedUploadUrl, file, {
        headers: { "Content-Type": contentType },
        onUploadProgress: (e) => {
          if (e.total) {
            const p = Math.round((e.loaded * 100) / e.total);
            setProgress(p);
            options?.onProgress?.(p);
          }
        },
      });

      const downloadUrl = await getSignedDownloadUrl(fileName);
      setPreviewUrl(downloadUrl);

      options?.onSuccess?.(downloadUrl);
      return downloadUrl;
    } catch (error) {
      options?.onError?.(error);
      return null;
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return {
    isUploading,
    previewUrl,
    progress,
    uploadFile,
    upload,
  };
}
