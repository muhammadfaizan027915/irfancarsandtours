ALTER TABLE "cars" ADD COLUMN "is_featured" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "times_searched" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "is_allowed_booking_without_driver" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "cars" DROP COLUMN "price_per_day";