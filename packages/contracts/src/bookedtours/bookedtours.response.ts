import z from "zod";

import { PaginatedResponseSchema, toDate } from "../generic";
import { TourListItemResponseSchema } from "../tours";

export const BookedTourResponseSchema = z.object({
  id: z.string(),
  tourId: z.string(),
  tourBookingId: z.string(),
  adultsNumber: z.number().int(),
  childrenNumber: z.number().int(),
  quotedPricePerAdult: z.number().int(),
  quotedPricePerChild: z.number().int(),
  createdAt: toDate(z.date().nullish()),
  updatedAt: toDate(z.date().nullish()),
  deletedAt: toDate(z.date().nullish()),
});

export type BookedTourListItemResponseDto = z.infer<typeof BookedTourResponseSchema>;

export const BookedTourWithTourResponseSchema = BookedTourResponseSchema.extend({
  tour: TourListItemResponseSchema.nullish(),
});

export type BookedTourWithTourResponseDto = z.infer<
  typeof BookedTourWithTourResponseSchema
>;

export const BookedTourListResponseSchema = z.array(BookedTourResponseSchema);

export type BookedTourListResponseDto = z.infer<
  typeof BookedTourListResponseSchema
>;

export const BookedTourWithTourListResponseSchema = z.array(
  BookedTourWithTourResponseSchema,
);

export type BookedTourWithTourListResponseDto = z.infer<
  typeof BookedTourWithTourListResponseSchema
>;

export const PaginatedBookedTourResponseSchema = PaginatedResponseSchema(
  BookedTourWithTourListResponseSchema,
);

export type PaginatedBookedTourResponseDto = z.infer<
  typeof PaginatedBookedTourResponseSchema
>;