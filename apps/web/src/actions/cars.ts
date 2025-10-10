"use server";

import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar";
import {
  RegisterCarBodySchema,
  RegisterCarBodyDto,
  UpdateCarBodySchema,
  UpdateCarBodyDto,
} from "@icat/contracts";
import {
  auth,
  handlerFormActionWithError,
  handleServerActionWithError,
  UnauthorizedError,
} from "@icat/lib";
import { CarService } from "@icat/services";
import { revalidatePath } from "next/cache";

export const registerCar = handlerFormActionWithError({
  schema: RegisterCarBodySchema,
  action: async (data: RegisterCarBodyDto) => {
    const session = await auth();
    const sessionUser = session?.user;

    if (!sessionUser?.id) {
      throw new UnauthorizedError({ message: "Unauthorized to create car." });
    }

    const carService = new CarService();
    const car = await carService.createCar(data);

    return car;
  },
});

export const updateCar = handlerFormActionWithError({
  schema: UpdateCarBodySchema,
  action: async (data: UpdateCarBodyDto) => {
    const session = await auth();
    const sessionUser = session?.user;

    if (!sessionUser?.id) {
      throw new UnauthorizedError({ message: "Unauthorized to update car." });
    }

    const carService = new CarService();
    const car = await carService.updateCar(data.id, data);

    revalidatePath(`${DashboardNavigationUrls.CARS}/${car?.id}/edit`);
    return car;
  },
});

export const deleteCar = handleServerActionWithError(async (id: string) => {
  const session = await auth();
  const sessionUser = session?.user;

  if (!sessionUser?.id) {
    throw new UnauthorizedError({ message: "Unauthorized to delete car." });
  }

  const carService = new CarService();
  const car = await carService.deleteCar({ id });

  revalidatePath(`${DashboardNavigationUrls.CARS}`);
  return car;
});
