import { SeoService } from "@icat/services";
import { requireAdmin } from "@icat/lib/auth";

export async function getCarSeo(carId: string) {
  await requireAdmin();
  const seoService = new SeoService();
  const result = await seoService.getByCarId(carId);
  return result;
}
