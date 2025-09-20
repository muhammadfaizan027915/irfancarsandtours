"use server";

import {
  UpdateUserBodySchema,
  UpdateUserBodyDto,
  ChangePasswordBodySchema,
  ChangePasswordBodyDto,
} from "@icat/contracts";
import { NavigationUrls } from "@icat/features";
import { auth, handlerFormActionWithError, UnauthorizedError } from "@icat/lib";
import { UserService } from "@icat/services";
import { revalidatePath } from "next/cache";

export const updateUser = handlerFormActionWithError(
  UpdateUserBodySchema,
  async (data: UpdateUserBodyDto) => {
    const session = await auth();
    const sessionUser = session?.user;

    if (!sessionUser?.id) {
      throw new UnauthorizedError({ message: "Unauthorized to update user." });
    }

    const userService = new UserService();
    const user = await userService.updateUser(sessionUser?.id, data);

    revalidatePath(NavigationUrls.PROFILE);
    return user;
  }
);

export const changeUserPassword = handlerFormActionWithError(
  ChangePasswordBodySchema,
  async (data: ChangePasswordBodyDto) => {
    const session = await auth();
    const sessionUser = session?.user;

    if (!sessionUser?.id) {
      throw new UnauthorizedError({ message: "Unauthorized to update user." });
    }

    const userService = new UserService();
    await userService.changePassword(sessionUser?.id, data);
  }
);
