CREATE TABLE "tours" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"location" varchar(255) NOT NULL,
	"meeting_point" text NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"price_per_adult" integer NOT NULL,
	"price_per_child" integer NOT NULL,
	"max_capacity" integer NOT NULL,
	"image_urls" text[],
	"itinerary" jsonb NOT NULL,
	"inclusions" text[],
	"exclusions" text[],
	"is_featured" boolean DEFAULT false,
	"seo_id" text,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "tours_seo_id_unique" UNIQUE("seo_id")
);
--> statement-breakpoint
CREATE TABLE "tour_bookings" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"status" "booking_status_enum" DEFAULT 'pending' NOT NULL,
	"total_price" integer NOT NULL,
	"notes" text,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "booked_tours" (
	"id" text PRIMARY KEY NOT NULL,
	"tour_booking_id" text NOT NULL,
	"tour_id" text NOT NULL,
	"adults_number" integer NOT NULL,
	"children_number" integer NOT NULL,
	"quoted_price_per_adult" integer NOT NULL,
	"quoted_price_per_child" integer NOT NULL,
	"deleted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "tours" ADD CONSTRAINT "tours_seo_id_seo_id_fk" FOREIGN KEY ("seo_id") REFERENCES "public"."seo"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tour_bookings" ADD CONSTRAINT "tour_bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "booked_tours" ADD CONSTRAINT "booked_tours_tour_booking_id_tour_bookings_id_fk" FOREIGN KEY ("tour_booking_id") REFERENCES "public"."tour_bookings"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "booked_tours" ADD CONSTRAINT "booked_tours_tour_id_tours_id_fk" FOREIGN KEY ("tour_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE cascade;