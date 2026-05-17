import { SeoService } from "@icat/services";

export async function getCarSeo(carId: string) {
  const seoService = new SeoService();
  const result = await seoService.getByCarId(carId);
  return result;
}
