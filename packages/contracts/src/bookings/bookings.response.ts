import z from "zod";
import { PaginatedResponseSchema, toDate } from "../generic";
import { DetailedUserResponseSchema } from "../users";

export const BookingResponseSchema = z.object({
  id: z.uuid(),
  userId: z.string(),
  pickupAddress: z.string().min(1),
  pickupDate: toDate(z.date()),
  dropoffAddress: z.string().min(1),
  dropoffDate: toDate(z.date()),
  deletedAt: toDate(z.date().nullish()),
  createdAt: toDate(z.date()),
  updatedAt: toDate(z.date()),
});

export type BookingResponseDto = z.infer<typeof BookingResponseSchema>;

const BookingListItemResponseSchema = BookingResponseSchema.omit({
  deletedAt: true,
});

export type BookingListItemResponseDto = z.infer<
  typeof BookingListItemResponseSchema
>;

export const BookingWithUserListItemResponseSchema =
  BookingListItemResponseSchema.extend({
    bookedBy: DetailedUserResponseSchema.pick({
      id: true,
      name: true,
      email: true,
      phone: true,
      cnic: true,
      image: true,
    }),
  });

export type BookingWithUserListItemResponseDto = z.infer<
  typeof BookingWithUserListItemResponseSchema
>;

export const BookingListResponseSchema = z.array(BookingListItemResponseSchema);

export type BookingListResponseDto = z.infer<typeof BookingListResponseSchema>;

export const PaginatedBookingResponseSchema = PaginatedResponseSchema(
  BookingListItemResponseSchema
);

export type PaginatedBookingResponseDto = z.infer<
  typeof PaginatedBookingResponseSchema
>;

export const BookingWithUserListResponseSchema = z.array(
  BookingWithUserListItemResponseSchema
);

export type BookingWithUserListResponseDto = z.infer<
  typeof BookingWithUserListResponseSchema
>;

export const PaginatedBookingWithUserResponseSchema = PaginatedResponseSchema(
  BookingWithUserListItemResponseSchema
);

export type PaginatedBookingWithUserResponseDto = z.infer<
  typeof PaginatedBookingWithUserResponseSchema
>;
