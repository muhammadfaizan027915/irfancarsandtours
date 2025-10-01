ALTER TABLE "cars" RENAME COLUMN "is_allowed_booking_without_driver" TO "force_with_driver";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "cinc" text;--> statement-breakpoint
ALTER TABLE "booked_cars" ADD COLUMN "booked_with_driver" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "booked_cars" ADD COLUMN "quantity" integer DEFAULT 1;