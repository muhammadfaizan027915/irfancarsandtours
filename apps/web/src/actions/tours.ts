"use server";
import {
  RegisterTourBodySchema,
  RegisterTourBodyDto,
  UpdateTourBodySchema,
  UpdateTourBodyDto,
} from "@icat/contracts";
import {
  handlerFormActionWithError,
  handleServerActionWithError,
} from "@icat/lib/handlers";
import { TourService } from "@icat/services";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@icat/lib/auth";
import { finalizeTempFileUrls } from "@icat/lib/utils/fileupload/finalize-temp-file-url";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";

export const createTour = handlerFormActionWithError({
  schema: RegisterTourBodySchema,
  action: async (data: RegisterTourBodyDto ) => {
    await requireAdmin();

    data.imageUrls = await finalizeTempFileUrls(data.imageUrls, "tours");

    const tourService = new TourService();
    const tour = await tourService.createTour(data);

    revalidatePath(DashboardNavigationUrls.TOURS);
    return tour;
  },
});

export const updateTour = handlerFormActionWithError({
  schema: UpdateTourBodySchema,
  action: async (data: UpdateTourBodyDto) => {
    await requireAdmin();

    const { id, ...updates } = data;

    if (!id) {
      throw new Error("Tour ID is required for update");
    }

    updates.imageUrls = await finalizeTempFileUrls(updates.imageUrls, "tours");

    const tourService = new TourService();
    const tour = await tourService.updateTour(id, updates);

    revalidatePath(`${DashboardNavigationUrls.TOURS}/${tour?.id}/edit`);
    return tour;
  },
});

export const deleteTour = handleServerActionWithError(async (id: string) => {
  await requireAdmin();
  const tourService = new TourService();
  const tour = await tourService.deleteTour({ id });

  revalidatePath(DashboardNavigationUrls.TOURS);
  return tour;
});
