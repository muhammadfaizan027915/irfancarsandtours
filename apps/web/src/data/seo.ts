import { SeoService } from "@icat/services";

export async function getCarSeo(carId: string) {
  const seoService = new SeoService();
  const result = await seoService.getByCarId(carId);
  return result;
}

export async function getTourSeo(tourId: string) {
  const seoService = new SeoService();
  const result = await seoService.getByTourId(tourId);
  return result;
}
