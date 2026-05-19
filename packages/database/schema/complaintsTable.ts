import { pgTable, text, varchar } from "drizzle-orm/pg-core";

import { timestampColumns } from "../utils";
import { complaintStatusEnum } from "./enums";

export const complaintsTable = pgTable("complaints", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: text("phone").notNull(),
  message: varchar("message").notNull(),
  status: complaintStatusEnum("status").notNull().default("pending"),
  ...timestampColumns,
});

export type ComplaintInsert = typeof complaintsTable.$inferInsert;

export type ComplaintSelect = typeof complaintsTable.$inferSelect;
