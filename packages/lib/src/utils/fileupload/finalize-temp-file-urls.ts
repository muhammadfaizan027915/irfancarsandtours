import { gcsClient } from "../gcs-client";

export async function finalizeTempFileUrls(
  tempFileUrls: string[],
  destinationPrefix: string,
): Promise<string[]> {
  if (!tempFileUrls || tempFileUrls.length === 0) return [];

  return await Promise.all(
    tempFileUrls.map(async (url) => {
      const publicUrl = await gcsClient.moveTempFileUrlToDestinationUrl(
        url,
        destinationPrefix,
      );

      return publicUrl;
    }),
  );
}
