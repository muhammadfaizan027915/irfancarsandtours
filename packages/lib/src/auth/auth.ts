import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  db,
  usersTable,
  sessionsTable,
  verificationTokensTable,
  accountsTable,
} from "@icat/database";
import { UserService } from "@icat/services";
import { SignInBodyDto } from "@icat/contracts";
import { BaseApiError, ValidationError } from "../errors";

export const {
  handlers: authHandlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
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

          const user = await userService.validateUser(
            credentials as SignInBodyDto
          );

          return user;
        } catch (error) {
          if (error instanceof BaseApiError) {
            throw new CredentialsSignin(error.message, { cause: error.cause });
          }

          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/signin",
  },

  debug: process.env.NODE_ENV === "development",
});
