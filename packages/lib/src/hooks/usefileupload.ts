"use client";

import { useState } from "react";
import { uploadFile as uploadFileUtil } from "@icat/lib/utils";

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!file) return null;

    const url = uploadFileUtil({
      file,
      onPreview: (url) => {
        setIsUploading(true);
        setPreviewUrl(url);
      },
      onProgress: (progress) => setProgress(progress),
      onSuccess: () => setIsUploading(false),
      onError: () => setIsUploading(false),
      onFinally: () => {
        setIsUploading(false);
        setProgress(0);
      },
    });

    return url;
  };

  return {
    isUploading,
    previewUrl,
    progress,
    uploadFile,
  };
}
