import { text, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestampColumns } from "../utils";

export const contactsTable = pgTable("contacts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: text("phone").notNull(),
  message: varchar("message").notNull(),
  ...timestampColumns,
});

export type ContactInsert = typeof contactsTable.$inferInsert;

export type ContactSelect = typeof contactsTable.$inferSelect;
