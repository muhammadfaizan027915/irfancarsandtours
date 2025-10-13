CREATE TYPE "public"."booking_status_enum" AS ENUM('pending', 'confirmed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."user_roles_enum" AS ENUM('admin', 'user');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_roles_enum" DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "status" "booking_status_enum" DEFAULT 'pending' NOT NULL;