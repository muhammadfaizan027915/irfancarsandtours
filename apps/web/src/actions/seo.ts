"use server";

import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { UpsertSeoBodyDto, UpsertSeoBodySchema } from "@icat/contracts";
import { SeoService } from "@icat/services";
import { handlerFormActionWithError } from "@icat/lib";
import { revalidatePath } from "next/cache";

export const upsertCarSeo = handlerFormActionWithError({
  schema: UpsertSeoBodySchema,
  action: async (data: UpsertSeoBodyDto) => {
    const seoService = new SeoService();
    const result = await seoService.upsertSeo(data);
    revalidatePath(`${DashboardNavigationUrls.CARS}/${data.carId}/edit`);
    return result;
  },
});
