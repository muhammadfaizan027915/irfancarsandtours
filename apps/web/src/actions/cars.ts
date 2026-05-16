"use server";

import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import {
  RegisterCarBodySchema,
  RegisterCarBodyDto,
  UpdateCarBodySchema,
  UpdateCarBodyDto,
} from "@icat/contracts";
import {
  handlerFormActionWithError,
  handleServerActionWithError,
} from "@icat/lib";
import { CarService } from "@icat/services";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@icat/lib/auth";
import { finalizeTempFileUrls } from "@icat/lib/utils/fileupload/finalize-temp-file-urls";

export const registerCar = handlerFormActionWithError({
  schema: RegisterCarBodySchema,
  action: async (data: RegisterCarBodyDto) => {
    await requireAdmin();

    const finalizedImageUrls = await finalizeTempFileUrls(
      data.imageUrls,
      "cars",
    );

    const carService = new CarService();
    const car = await carService.createCar({
      ...data,
      imageUrls: finalizedImageUrls,
    });

    return car;
  },
});

export const updateCar = handlerFormActionWithError({
  schema: UpdateCarBodySchema,
  action: async (data: UpdateCarBodyDto) => {
    await requireAdmin();

    const finalizedImageUrls = await finalizeTempFileUrls(
      data.imageUrls,
      "cars",
    );

    const carService = new CarService();
    const car = await carService.updateCar(data.id, {
      ...data,
      imageUrls: finalizedImageUrls,
    });

    revalidatePath(`${DashboardNavigationUrls.CARS}/${car?.id}/edit`);
    return car;
  },
});

export const deleteCar = handleServerActionWithError(async (id: string) => {
  await requireAdmin();
  const carService = new CarService();
  const car = await carService.deleteCar({ id });

  revalidatePath(`${DashboardNavigationUrls.CARS}`);
  return car;
});
