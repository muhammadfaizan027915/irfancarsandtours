"use client";

import { useState } from "react";
import {
  uploadFile as uploadFileUtil,
  deleteFile as deleteFileUtil,
} from "@icat/lib/utils";

type UploadedFile = {
  id: string;
  file: File | null;
  previewUrl: string;
  progress: number;
  isUploading: boolean;
};

type UseMultiFileUploadOptions = {
  initialUrls?: string[];
  onError?: (error: any) => void;
  onSuccess?: (uploadFiles: UploadedFile[]) => void;
};

export function useMultiFileUpload(options?: UseMultiFileUploadOptions) {
  const { initialUrls = [], onSuccess, onError } = options || {};

  const [files, setFiles] = useState<UploadedFile[]>(
    initialUrls.map((url) => ({
      id: crypto.randomUUID(),
      file: null,
      previewUrl: url,
      progress: 100,
      isUploading: false,
    }))
  );

  const uploadFiles = (selectedFiles: FileList | File[]) => {
    const filesArray = Array.from(selectedFiles);

    filesArray.forEach(async (file) => {
      const id = crypto.randomUUID();
      const newFile: UploadedFile = {
        id,
        file,
        previewUrl: "",
        progress: 0,
        isUploading: true,
      };

      setFiles((prev) => [...prev, newFile]);

      await uploadFileUtil({
        file,
        onPreview: (previewUrl) => updateFile(id, { previewUrl }),
        onProgress: (progress) => updateFile(id, { progress }),
        onSuccess: (previewUrl) => {
          const suceessfullyUploaded = {
            id,
            previewUrl,
            progress: 100,
            isUploading: false,
            file: null,
          };

          updateFile(id, suceessfullyUploaded);
          onSuccess?.([...files, suceessfullyUploaded]);
        },
        onError: (error) => {
          updateFile(id, { isUploading: false });
          onError?.(error);
        },
      });
    });
  };

  const deleteFile = async (id: string) => {
    const file = files.find((file) => file.id === id);
    if (!file) return;

    if (file.previewUrl) {
      const prevFiles = getCurrentFiles();
      const leftFiles = files.filter((f) => f.id !== id);

      setFiles(leftFiles);

      await deleteFileUtil({
        fileUrl: file.previewUrl,
        onSuccess: () => {
          onSuccess?.(leftFiles);
        },
        onError: (error) => {
          setFiles(prevFiles);
          onError?.(error);
        },
      });
    }
  };

  const updateFile = (id: string, updates: Partial<UploadedFile>) => {
    setFiles((prev) =>
      prev.map((file) => (file.id === id ? { ...file, ...updates } : file))
    );
  };

  const getCurrentFiles = () => {
    return JSON.parse(JSON.stringify(files)) as UploadedFile[];
  };

  return {
    files,
    uploadFiles,
    deleteFile,
    updateFile,
  };
}
