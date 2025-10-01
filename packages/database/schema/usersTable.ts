import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { timestampColumns } from "../utils";

export const usersTable = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  image: text("image"),
  email: text("email").unique().notNull(),
  phone: text("phone"),
  cnic: text("cinc"),
  address: text("address"),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  password: text("password").notNull(),
  ...timestampColumns,
});

export type UserInsert = typeof usersTable.$inferInsert;

export type UserSelect = typeof usersTable.$inferSelect;
