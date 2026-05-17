import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  trustHost: true,

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

  providers: [],
};
