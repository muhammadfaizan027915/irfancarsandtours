"use server";

import {
  UpdateUserBodySchema,
  UpdateUserBodyDto,
  ChangePasswordBodySchema,
  ChangePasswordBodyDto,
} from "@icat/contracts";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { handlerFormActionWithError } from "@icat/lib";
import { getSessionUser } from "@icat/web/data/uesrs";
import { UserService } from "@icat/services";
import { revalidatePath } from "next/cache";

export const updateUser = handlerFormActionWithError({
  schema: UpdateUserBodySchema,
  action: async (data: UpdateUserBodyDto) => {
    const sessionUser = await getSessionUser();
    const userService = new UserService();
    const user = await userService.updateUser(sessionUser?.id as string, data);

    revalidatePath(NavigationUrls.PROFILE);
    return user;
  },
});

export const changeUserPassword = handlerFormActionWithError({
  schema: ChangePasswordBodySchema,
  action: async (data: ChangePasswordBodyDto) => {
    const sessionUser = await getSessionUser();
    const userService = new UserService();
    await userService.changePassword(sessionUser?.id as string, data);
  },
});
