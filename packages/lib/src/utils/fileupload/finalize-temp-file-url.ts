import { gcsClient } from "../gcs-client";

export async function finalizeTempFileUrls(
  tempFileUrls: string[] | undefined,
  destinationPrefix: string,
): Promise<string[]> {
  if (!tempFileUrls || tempFileUrls.length === 0) return [];

  return await Promise.all(
    tempFileUrls.map(async (url) => {
      return await gcsClient.moveTempFileUrlToDestinationUrl(url, destinationPrefix);
    }),
  );
}


export function finalizeTempFileUrl(
  tempFileUrl: string | undefined,
  destinationPrefix: string,
): Promise<string | null> {
  if (!tempFileUrl) return Promise.resolve(null);

  return gcsClient.moveTempFileUrlToDestinationUrl(tempFileUrl, destinationPrefix);
}