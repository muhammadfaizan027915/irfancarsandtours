ALTER TABLE "cars" ADD COLUMN "slug" varchar(255);--> statement-breakpoint
ALTER TABLE "tours" ADD COLUMN "slug" varchar(255);--> statement-breakpoint
ALTER TABLE "cars" ADD CONSTRAINT "cars_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "tours" ADD CONSTRAINT "tours_slug_unique" UNIQUE("slug");