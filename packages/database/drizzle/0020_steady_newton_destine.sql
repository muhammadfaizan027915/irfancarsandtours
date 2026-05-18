ALTER TABLE "booked_cars" DROP CONSTRAINT "booked_cars_car_id_cars_id_fk";
--> statement-breakpoint
ALTER TABLE "booked_cars" DROP CONSTRAINT "booked_cars_booking_id_bookings_id_fk";
--> statement-breakpoint
ALTER TABLE "booked_cars" ADD CONSTRAINT "booked_cars_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "booked_cars" ADD CONSTRAINT "booked_cars_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE cascade;