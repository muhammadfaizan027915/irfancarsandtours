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
  handlers = handlers;
  auth = auth;
  signIn = signIn;
  signOut = signOut;

  async hashPassword(password: string): Promise<string> {
    const bcrypt = await import("bcryptjs");
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashed: string): Promise<boolean> {
    const bcrypt = await import("bcryptjs");
    return bcrypt.compare(password, hashed);
  }
}
