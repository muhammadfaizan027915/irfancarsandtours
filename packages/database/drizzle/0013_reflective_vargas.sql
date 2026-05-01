CREATE TABLE "seo" (
	"id" text PRIMARY KEY NOT NULL,
	"car_id" text NOT NULL,
	"title" varchar(255),
	"description" text,
	"keywords" text,
	"og_image" text,
	"robots" varchar(50),
	"canonical_url" text,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "seo_car_id_unique" UNIQUE("car_id")
);
--> statement-breakpoint
ALTER TABLE "seo" ADD CONSTRAINT "seo_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;