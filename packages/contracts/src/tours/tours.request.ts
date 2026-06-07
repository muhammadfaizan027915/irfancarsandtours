import { z } from "zod";

import { toDate } from "../generic";

export const RegisterTourBodySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  meetingPoint: z.string().min(1, "Meeting point is required"),
  startDate: toDate(
    z.date("Invalid date format").refine(
      (date) => new Date(date) >= new Date(),
      "Start date must be in the future",
    ),
  ),
  pricePerAdult: z.coerce
    .number()
    .int()
    .min(0, "Price per adult cannot be negative"),
  pricePerChild: z.coerce
    .number()
    .int()
    .min(0, "Price per child cannot be negative"),
  maxCapacity: z.coerce
    .number()
    .int()
    .min(1, "Max capacity must be at least 1"),
  imageUrls: z.array(z.url()).optional(),
  itinerary: z
    .array(
      z.object({
        title: z.string().min(1, "Itinerary title is required"),
        description: z.string().min(1, "Itinerary description is required"),
      }),
    )
    .min(1, "At least one itinerary item is required"),
  inclusions: z.array(z.string()).min(1, "At least one inclusion is required"),
  exclusions: z.array(z.string()).min(1, "At least one exclusion is required"),
  isFeatured: z.coerce.boolean().optional().default(false),
  seoId: z.uuid().optional(),
});

export type RegisterTourBodyDto = z.infer<typeof RegisterTourBodySchema>;

export const UpdateTourBodySchema = RegisterTourBodySchema.partial().extend({
  id: z.uuid(),
});

export type UpdateTourBodyDto = z.infer<typeof UpdateTourBodySchema>;

export const DeleteTourBodySchema = z.object({
  id: z.uuid("Invalid tour ID"),
});

export type DeleteTourBodyDto = z.infer<typeof DeleteTourBodySchema>;

export const GetToursBodySchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(50),
  search: z.string().optional(),
  name: z.string().optional(),
  location: z.string().optional(),
  startDate: toDate(z.date().optional()),
  endDate: toDate(z.date().optional()),
  pricePerAdultMin: z.coerce.number().optional(),
  pricePerAdultMax: z.coerce.number().optional(),
  pricePerChildMin: z.coerce.number().optional(),
  pricePerChildMax: z.coerce.number().optional(),
  maxCapacity: z.coerce.number().optional(),
});

export type GetToursBodyDto = z.infer<typeof GetToursBodySchema>;
