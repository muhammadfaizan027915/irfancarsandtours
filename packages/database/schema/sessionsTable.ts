import { pgTable, text,timestamp } from "drizzle-orm/pg-core";

import { timestampColumns } from "../utils";
import { usersTable } from "./usersTable";

export const sessionsTable = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
  ...timestampColumns,
});


export type SessionInsert = typeof sessionsTable.$inferInsert;

export type SessionSelect = typeof sessionsTable.$inferSelect;