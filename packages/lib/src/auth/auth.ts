import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { CredentialsSignin, NextAuthResult } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { SignInBodyDto } from "@icat/contracts";
import {
  accountsTable,
  db,
  sessionsTable,
  usersTable,
  verificationTokensTable,
} from "@icat/database";
import { UserService } from "@icat/services";

import { handleError } from "../errors";
import { authConfig } from "./auth.config";

const result = NextAuth({
  ...authConfig,

  adapter: DrizzleAdapter(db, {
    usersTable,
    sessionsTable,
    verificationTokensTable,
    accountsTable,
  }),

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        try {
          const userService = new UserService();
          const user = await userService.validateUserCredentials(
            credentials as SignInBodyDto
          );

          return user;
        } catch (error) {
          const errorPayload = handleError(error);

          if (errorPayload) {
            throw new CredentialsSignin(errorPayload.message, {
              cause: errorPayload.cause,
            });
          }

          return null;
        }
      },
    }),
  ],
});

export const authHandlers: NextAuthResult['handlers'] = result.handlers;
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;
