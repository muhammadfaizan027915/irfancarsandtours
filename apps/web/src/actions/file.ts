"use server";

import { gcsClient } from "@icat/lib/utils/gcs-client";

export async function getSignedUploadUrl(
  fileName: string,
  contentType: string
) {
  try {
    return await gcsClient.createSignedUploadUrl(fileName, contentType);
  } catch (error) {
    console.log("Error in getSignedUploadUrl:", error);
    throw error;
  }
}

export async function getSignedDownloadUrl(fileName: string) {
  return await gcsClient.createSignedDownloadUrl(fileName);
}

export async function deleteFileFromCloudStorage(fileIdentifier: string) {
  try {
    return await gcsClient.deleteFile(fileIdentifier);
  } catch (error) {
    console.log("Error in delete file:", error);
    throw error;
  }
}
