import { z } from "zod";
import {
  BrandNamesList,
  FuelTypesList,
  AmenitiesList,
  CarTypesList,
  TransmissionTypesList,
} from "@icat/database/enums";
import { toArray } from "../generic";

export const RegisterCarBodySchema = z.object({
  name: z.string("Name is required").min(1, "Name cannot be empty"),
  model: z.string("Model is required").min(1, "Model cannot be empty"),
  year: z
    .number("Year is required")
    .int("Year is required")
    .min(1900, "Year must be 1900 or later"),
  description: z.string().optional(),
  brand: z.enum(BrandNamesList, "Please select a valid brand"),
  carType: z.enum(CarTypesList, "Please select a valid car type"),
  fuelType: z.enum(FuelTypesList, "Please select a valid fuel type"),
  transmissionType: z.enum(
    TransmissionTypesList,
    "Please select a valid transmission type"
  ),
  amenities: z.preprocess((val) => {
    if (!val) return undefined;
    return Array.isArray(val) ? val : [val];
  }, z.array(z.enum(AmenitiesList, "Please select a valid amenities"))),
  imageUrls: z
    .preprocess((val) => {
      if (!val) return undefined;
      return Array.isArray(val) ? val : [val];
    }, z.array(z.url("Each image must be a valid URL")))
    .optional(),
  seatingCapacity: z
    .number("Seating capacity is required")
    .int("Seating capacity is required")
    .min(1, "Seating capacity must be at least 1"),
  isFeatured: z.boolean().optional().default(false),
  forceWithDriver: z.boolean().optional().default(false),
});

export type RegisterCarBodyDto = z.infer<typeof RegisterCarBodySchema>;

export const UpdateCarBodySchema = RegisterCarBodySchema.partial().extend({
  id: z.uuid("Invalid car ID"),
});

export type UpdateCarBodyDto = z.infer<typeof UpdateCarBodySchema>;

export const DeleteCarBodySchema = z.object({
  id: z.uuid("Invalid car ID"),
});

export type DeleteCarBodyDto = z.infer<typeof DeleteCarBodySchema>;

export const GetCarsBodySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1)),

  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10)),

  search: z.string().optional(),

  brand: z.enum(BrandNamesList).optional(),

  carType: z.preprocess((val) => {
    if (!val) return undefined;
    return Array.isArray(val) ? val : [val];
  }, z.array(z.enum(CarTypesList)).optional()),

  fuelType: z.preprocess((val) => {
    if (!val) return undefined;
    return Array.isArray(val) ? val : [val];
  }, z.array(z.enum(FuelTypesList)).optional()),

  transmissionType: z.preprocess((val) => {
    if (!val) return undefined;
    return Array.isArray(val) ? val : [val];
  }, z.array(z.enum(TransmissionTypesList)).optional()),

  amenities: z.preprocess((val) => {
    if (!val) return undefined;
    return Array.isArray(val) ? val : [val];
  }, z.array(z.enum(AmenitiesList)).optional()),
});

export type GetCarsBodyDto = z.infer<typeof GetCarsBodySchema>;
