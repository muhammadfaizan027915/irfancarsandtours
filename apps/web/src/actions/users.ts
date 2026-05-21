"use server";

import {
  UpdateUserBodySchema,
  UpdateUserBodyDto,
  ChangePasswordBodySchema,
  ChangePasswordBodyDto,
} from "@icat/contracts";
import { NavigationUrls } from "@icat/features/header/header.constants";
import { finalizeTempFileUrl } from "@icat/lib/utils/fileupload/finalize-temp-file-url";
import { handlerFormActionWithError } from "@icat/lib/handlers";
import { requireAuth } from "@icat/lib/auth";
import { UserService } from "@icat/services";
import { revalidatePath } from "next/cache";

export const updateUser = handlerFormActionWithError({
  schema: UpdateUserBodySchema,
  action: async (data: UpdateUserBodyDto) => {
    const sessionUser = await requireAuth();

    data.image = await finalizeTempFileUrl(data?.image ?? "", "users");

    const userService = new UserService();
    const user = await userService.updateUser(sessionUser?.id as string, data);

    revalidatePath(NavigationUrls.PROFILE);
    return user;
  },
});

export const changeUserPassword = handlerFormActionWithError({
  schema: ChangePasswordBodySchema,
  action: async (data: ChangePasswordBodyDto) => {
    const sessionUser = await requireAuth();
    const userService = new UserService();
    await userService.changePassword(sessionUser?.id as string, data);
  },
});
