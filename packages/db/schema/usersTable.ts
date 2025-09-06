import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { timestampColumns } from "../utils";

export const usersTable = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  image: text("image"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  password: text("password").notNull(),
  ...timestampColumns,
});
