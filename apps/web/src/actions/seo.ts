"use server";

import { UpsertSeoBodyDto, UpsertSeoBodySchema } from "@icat/contracts";
import { SeoService } from "@icat/services";
import { handlerFormActionWithError } from "@icat/lib";
import { revalidatePath } from "next/cache";

export const upsertCarSeo = handlerFormActionWithError({
  schema: UpsertSeoBodySchema,
  action: async (data: UpsertSeoBodyDto) => {
    const seoService = new SeoService();
    const result = await seoService.upsertSeo(data);
    revalidatePath("/dashboard/cars");
    return result;
  },
});

export const getSeoByCarId = async (carId: string) => {
  const seoService = new SeoService();
  return await seoService.getByCarId(carId);
};
