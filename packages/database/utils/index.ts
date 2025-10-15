import { timestamp } from "drizzle-orm/pg-core";

export const timestampColumns = {
  deletedAt: timestamp("deleted_at", {
    mode: "date",
    withTimezone: true,
  }),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date",
    withTimezone: true,
  })
    .defaultNow()
    .$onUpdateFn(() => new Date()),
};
