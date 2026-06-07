import { z } from "zod";

import { PaginatedResponseSchema, toDate } from "../generic";

export const TourResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string(),
  location: z.string(),
  meetingPoint: z.string(),
  startDate: toDate(z.date()),
  pricePerAdult: z.number().int(),
  pricePerChild: z.number().int(),
  maxCapacity: z.number().int(),
  imageUrls: z.array(z.url()).nullish(),
  itinerary: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })),
  inclusions: z.array(z.string()),
  exclusions: z.array(z.string()),
  isFeatured: z.boolean(),
  seoId: z.uuid().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullish(),
});

export type TourResponseDto = z.infer<typeof TourResponseSchema>;

export const TourListItemResponseSchema = TourResponseSchema.omit({
  description: true,
  itinerary: true,
  inclusions: true,
  exclusions: true,
});

export type TourListItemResponseDto = z.infer<typeof TourListItemResponseSchema>;

export const ToursListResponseSchema = z.array(TourListItemResponseSchema);

export type ToursListResponseDto = z.infer<typeof ToursListResponseSchema>;

export const PaginatedTourResponseSchema = PaginatedResponseSchema(TourListItemResponseSchema);

export type PaginatedTourResponseDto = z.infer<typeof PaginatedTourResponseSchema>;
