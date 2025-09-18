import { timestamp, pgTable, text } from "drizzle-orm/pg-core";
import { usersTable } from "./usersTable";
import { timestampColumns } from "../utils";

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