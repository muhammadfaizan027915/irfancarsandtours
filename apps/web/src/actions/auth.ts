"use server";

import { handlerFormActionWithError, signIn } from "@icat/lib";
import { UserService } from "@icat/services";
import {
  SignInBodySchema,
  CreateUserBodySchema,
  CreateUserBodyDto,
  SignInBodyDto,
} from "@icat/contracts";
import { NavigationUrls } from "@icat/features";
import { redirect, RedirectType } from "next/navigation";

export const logInUser = handlerFormActionWithError(
  SignInBodySchema,
  async (data: SignInBodyDto) => {
    await signIn("credentials", {
      ...data,
      redirectTo: NavigationUrls.HOME,
    });
  }
);

export const signUpUser = handlerFormActionWithError(
  CreateUserBodySchema,
  async (data: CreateUserBodyDto) => {
    const userService = new UserService();
    const createdUser = await userService.createUser(data);

    if (createdUser?.id) {
      redirect(NavigationUrls.SIGNIN, RedirectType.push);
    }
  }
);
