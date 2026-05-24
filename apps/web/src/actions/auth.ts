"use server";

import { signIn, signOut } from "@icat/lib/auth";
import { handlerFormActionWithError } from "@icat/lib/handlers";
import { UserService, AuthService } from "@icat/services";
import {
  SignInBodySchema,
  CreateUserBodySchema,
  CreateUserBodyDto,
  SignInBodyDto,
  ForgotPasswordBodySchema,
  ForgotPasswordBodyDto,
  ResetPasswordBodySchema,
  ResetPasswordBodyDto,
} from "@icat/contracts";
import { NavigationUrls } from "@icat/features/common/header/header.constants";
import { redirect, RedirectType } from "next/navigation";

export const logInUser = handlerFormActionWithError({
  schema: SignInBodySchema,
  action: async (data: SignInBodyDto) => {
    await signIn("credentials", {
      ...data,
      redirectTo: NavigationUrls.HOME,
    });
  },
});

export const signUpUser = handlerFormActionWithError({
  schema: CreateUserBodySchema,
  action: async (data: CreateUserBodyDto) => {
    const userService = new UserService();
    const createdUser = await userService.createUser(data);

    if (createdUser?.id) {
      redirect(NavigationUrls.SIGNIN, RedirectType.push);
    }
  },
});

export const lougOutUser = async () => {
  await signOut();
};

export const forgotPassword = handlerFormActionWithError({
  schema: ForgotPasswordBodySchema,
  action: async (data: ForgotPasswordBodyDto) => {
    const authService = new AuthService();
    await authService.forgotPassword(data);
  },
});

export const resetPassword = handlerFormActionWithError({
  schema: ResetPasswordBodySchema,
  action: async (data: ResetPasswordBodyDto) => {
    const authService = new AuthService();
    await authService.resetPassword(data);
    redirect(NavigationUrls.SIGNIN, RedirectType.push);
  },
});
