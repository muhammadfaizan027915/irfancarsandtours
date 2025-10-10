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
import { handleError } from "../errors";

export const {
  handlers: authHandlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,

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

  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/signin",
  },

  debug: process.env.NODE_ENV === "development",

  session: {
    strategy: "jwt",
  },

  callbacks: {
    jwt({ token, user }) {
      return {
        ...token,
        ...user,
      };
    },

    async session({ session, token }) {
      const { jti, exp, iat, sub, ...user } = token;
      session.user = user as any;
      
      return session;
    },
  },
});
