import { relations } from "drizzle-orm";
import { carsTable } from "./carsTable";
import { seoTable } from "./seoTable";

export const carsRelations = relations(carsTable, ({ one }) => ({
  seo: one(seoTable, {
    fields: [carsTable.seoId],
    references: [seoTable.id],
  }),
}));

export const seoRelations = relations(seoTable, ({ one }) => ({
  car: one(carsTable),
}));
