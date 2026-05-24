"use server";

import {
  UpdateUserBodySchema,
  UpdateUserBodyDto,
  ChangePasswordBodySchema,
  ChangePasswordBodyDto,
  CreateUserBodySchema,
  CreateUserBodyDto,
} from "@icat/contracts";
import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { finalizeTempFileUrl } from "@icat/lib/utils/fileupload/finalize-temp-file-url";
import { handlerFormActionWithError } from "@icat/lib/handlers";
import { requireAdmin, requireAuth } from "@icat/lib/auth";
import { UserService } from "@icat/services";
import { revalidatePath } from "next/cache";

export const createUser = handlerFormActionWithError({
  schema: CreateUserBodySchema,
  action: async (data: CreateUserBodyDto) => {
    await requireAdmin();

    const userService = new UserService();
    const user = await userService.createUser(data);

    revalidatePath(DashboardNavigationUrls.CUSTOMERS);
    return user;
  },
});

export const updateUser = handlerFormActionWithError({
  schema: UpdateUserBodySchema,
  action: async (data: UpdateUserBodyDto) => {
    const sessionUser = await requireAuth();

    if (data?.image) {
      data.image = await finalizeTempFileUrl(data.image, "users");
    }

    const userService = new UserService();
    const user = await userService.updateUser(sessionUser?.id as string, data);

    revalidatePath(NavigationUrls.PROFILE);
    return user;
  },
});

export const updateUserById = handlerFormActionWithError({
  schema: UpdateUserBodySchema,
  action: async (data: UpdateUserBodyDto) => {
    await requireAdmin();

    const { id, ...updates } = data;

    if (!id) {
      throw new Error("User ID is required for update.");
    }

    if (updates?.image) {
      updates.image = await finalizeTempFileUrl(updates.image, "users");
    }

    const userService = new UserService();
    const user = await userService.updateUser(id, updates);

    revalidatePath(DashboardNavigationUrls.CUSTOMERS);
    revalidatePath(`${DashboardNavigationUrls.CUSTOMERS}/${id}`);
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
