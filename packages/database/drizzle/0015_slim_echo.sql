ALTER TABLE "seo" DROP CONSTRAINT "seo_car_id_unique";--> statement-breakpoint
ALTER TABLE "seo" DROP CONSTRAINT "seo_car_id_cars_id_fk";
--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "seo_id" text;--> statement-breakpoint
ALTER TABLE "cars" ADD CONSTRAINT "cars_seo_id_seo_id_fk" FOREIGN KEY ("seo_id") REFERENCES "public"."seo"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "seo" DROP COLUMN "car_id";--> statement-breakpoint
ALTER TABLE "cars" ADD CONSTRAINT "cars_seo_id_unique" UNIQUE("seo_id");