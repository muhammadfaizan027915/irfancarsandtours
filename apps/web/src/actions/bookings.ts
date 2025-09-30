"use server";

import { CarBookingRequestSchema, CarBookingRequestDto } from "@icat/contracts";
import { auth, handlerFormActionWithError, UnauthorizedError } from "@icat/lib";
import {  } from "@icat/services";
import { revalidatePath } from "next/cache";

export const bookCar = handlerFormActionWithError({
  schema: CarBookingRequestSchema,
  action: async (data: CarBookingRequestDto) => {
    const session = await auth();
    const sessionUser = session?.user;

    if (!sessionUser?.id) {
      throw new UnauthorizedError({ message: "Unauthorized to book car." });
    }


  },
});
