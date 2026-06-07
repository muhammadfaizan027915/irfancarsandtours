"use server";

import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { UpsertSeoBodyDto, UpsertSeoBodySchema } from "@icat/contracts";
import { SeoService } from "@icat/services";
import { handlerFormActionWithError } from "@icat/lib/handlers";
import { revalidatePath } from "next/cache";

export const upsertTourSeo = handlerFormActionWithError({
  schema: UpsertSeoBodySchema,
  action: async (data: UpsertSeoBodyDto) => {
    const seoService = new SeoService();
    const result = await seoService.upsertSeo(data);
    revalidatePath(`${DashboardNavigationUrls.TOURS}/${data.tourId}/edit`);
    return result;
  },
});
