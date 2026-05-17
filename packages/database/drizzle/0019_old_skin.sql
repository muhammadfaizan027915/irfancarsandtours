ALTER TABLE "booked_cars" DROP CONSTRAINT "booked_cars_car_id_cars_id_fk";
--> statement-breakpoint
ALTER TABLE "booked_cars" ADD CONSTRAINT "booked_cars_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;