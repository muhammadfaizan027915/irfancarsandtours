ALTER TABLE "cars" ADD COLUMN "deleted_at" timestamp DEFAULT null;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "deleted_at" timestamp DEFAULT null;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "deleted_at" timestamp DEFAULT null;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "deleted_at" timestamp DEFAULT null;--> statement-breakpoint
ALTER TABLE "verification_tokens" ADD COLUMN "deleted_at" timestamp DEFAULT null;