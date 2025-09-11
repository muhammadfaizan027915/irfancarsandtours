"use server";

import { handlerFormActionWithError } from "@icat/lib";
import { AuthService, UserService } from "@icat/services";
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
    const authService = new AuthService();
    await authService.signIn("credentials", data);
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
