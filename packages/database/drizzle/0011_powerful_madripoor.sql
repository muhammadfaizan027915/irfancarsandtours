ALTER TABLE "cars" ALTER COLUMN "brand" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."brand_enum";--> statement-breakpoint
CREATE TYPE "public"."brand_enum" AS ENUM('Audi', 'BMW', 'BYD', 'Chevrolet', 'Changan', 'Ford', 'GMC', 'Honda', 'Hummer', 'Hyundai', 'Jeep', 'Kia', 'Landrover', 'Lexus', 'MB', 'Maserati', 'Mazda', 'Mitsubishi', 'Mercedes', 'Nissan', 'Porsche', 'Suzuki', 'Tesla', 'Toyota');--> statement-breakpoint
ALTER TABLE "cars" ALTER COLUMN "brand" SET DATA TYPE "public"."brand_enum" USING "brand"::"public"."brand_enum";