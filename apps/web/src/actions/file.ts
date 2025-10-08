"use server";

import { handleServerActionWithError } from "@icat/lib";
import { gcsClient } from "@icat/lib/utils/gcs-client";

export const getSignedUploadUrl = handleServerActionWithError(
  async (fileName: string, contentType: string) => {
    const signedUploadUrl = await gcsClient.createSignedUploadUrl(
      fileName,
      contentType
    );

    return signedUploadUrl;
  }
);

export async function getPublicFileUrl(fileName: string) {
  return gcsClient.createPublicUrl(fileName);
}

export const deleteFileFromCloudStorage = handleServerActionWithError(
  async (fileIdentifier: string) => {
    return await gcsClient.deleteFile(fileIdentifier);
  }
);
