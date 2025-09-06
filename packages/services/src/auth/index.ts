import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  db,
  usersTable,
  sessionsTable,
  verificationTokensTable,
  accountsTable,
} from "@icat/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable,
    sessionsTable,
    verificationTokensTable,
    accountsTable,
  }),
  providers: [],
});

export class AuthService {
  static handlers = handlers;
  static auth = auth;
  static signIn = signIn;
  static signOut = signOut;
}
