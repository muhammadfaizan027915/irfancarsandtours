CREATE TABLE "bookings" (
	"id" text PRIMARY KEY NOT NULL,
	"pickup_address" varchar(255) NOT NULL,
	"pickup_date" date NOT NULL,
	"dropoff_address" varchar(255) NOT NULL,
	"dropoff_date" date NOT NULL,
	"user_id" text NOT NULL,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "booked_cars" (
	"id" text PRIMARY KEY NOT NULL,
	"car_id" text NOT NULL,
	"booking_id" text NOT NULL,
	"quoted_price" integer,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booked_cars" ADD CONSTRAINT "booked_cars_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booked_cars" ADD CONSTRAINT "booked_cars_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;