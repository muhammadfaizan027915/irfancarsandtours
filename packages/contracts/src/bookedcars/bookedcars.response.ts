import { z } from "zod";
import { toDate } from "@icat/contracts/generic";
import { CarListItemResponseSchema } from "@icat/contracts/cars";

export const BookedCarResponseSchema = z.object({
  id: z.string(),
  quotedPrice: z.number().nullish(),
  bookedWithDriver: z.boolean().default(false),
  quantity: z.number().default(1),
  createdAt: toDate(z.date().nullable()),
  updatedAt: toDate(z.date().nullish()),
  deletedAt: toDate(z.date().nullish()),
  bookingId: z.string().nullish(),
  carId: z.string().nullish(),
});

export type BookedCarResponseDto = z.infer<typeof BookedCarResponseSchema>;

export const BookedCarWithCarResponseSchema = BookedCarResponseSchema.extend({
  car: CarListItemResponseSchema.nullish(),
});

export type BookedCarWithCarResponseDto = z.infer<
  typeof BookedCarWithCarResponseSchema
>;

export const BookedCarListResponseSchema = z.array(BookedCarResponseSchema);

export type BookedCarListResponseDto = z.infer<
  typeof BookedCarListResponseSchema
>;

export const BookedCarWithCarListResponseSchema = z.array(
  BookedCarWithCarResponseSchema
);

export type BookedCarWithCarListResponseDto = z.infer<
  typeof BookedCarWithCarListResponseSchema
>;
