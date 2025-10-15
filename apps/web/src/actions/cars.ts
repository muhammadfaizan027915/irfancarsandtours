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

export const registerCar = handlerFormActionWithError({
  schema: RegisterCarBodySchema,
  action: async (data: RegisterCarBodyDto) => {
    const carService = new CarService();
    const car = await carService.createCar(data);

    return car;
  },
});

export const updateCar = handlerFormActionWithError({
  schema: UpdateCarBodySchema,
  action: async (data: UpdateCarBodyDto) => {
    const carService = new CarService();
    const car = await carService.updateCar(data.id, data);

    revalidatePath(`${DashboardNavigationUrls.CARS}/${car?.id}/edit`);
    return car;
  },
});

export const deleteCar = handleServerActionWithError(async (id: string) => {
  const carService = new CarService();
  const car = await carService.deleteCar({ id });

  revalidatePath(`${DashboardNavigationUrls.CARS}`);
  return car;
});
