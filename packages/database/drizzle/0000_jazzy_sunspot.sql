CREATE TYPE "public"."amenities_enum" AS ENUM('GPS', 'Bluetooth', 'Heated Seats', 'Sunroof/Moonroof', 'Air Conditioning', 'Backup Camera', 'Cruise Control', 'Alloy Wheels', 'Keyless Entry', 'Leather Seats', 'Parking Sensors');--> statement-breakpoint
CREATE TYPE "public"."brand_enum" AS ENUM('', 'use', 'Acura', 'AlfaRomeo', 'AstonMartin', 'Audi', 'BMW', 'BYD', 'Bentley', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ferrari', 'Fiat', 'Ford', 'GMC', 'Genesis', 'Honda', 'Hummer', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Lamborghini', 'Landrover', 'Lexus', 'Lincoln', 'Lotus', 'Lucid', 'MB', 'Maserati', 'Mazda', 'Mclaren', 'Mini', 'Mitsubishi', 'Nissan', 'Polestar', 'Porsche', 'RAM', 'RollsRoyce', 'Subaru', 'Tesla', 'Toyota', 'Vinfast', 'Volkswagen', 'Volvo');--> statement-breakpoint
CREATE TYPE "public"."car_type_enum" AS ENUM('SUV', 'Sedan', 'Hatchback', 'Convertible', 'Sports Car', 'Compact', 'Coupe', 'Minivan', 'Pickup Truck', 'Station Wagon', 'Luxury', 'Crossover', 'Off-Road');--> statement-breakpoint
CREATE TYPE "public"."fuel_type_enum" AS ENUM('Petrol', 'Diesel', 'Electric', 'Hybrid');--> statement-breakpoint
CREATE TYPE "public"."transmission_type_enum" AS ENUM('Automatic', 'Manual');--> statement-breakpoint
CREATE TABLE "cars" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"model" varchar(255) NOT NULL,
	"year" integer NOT NULL,
	"brand" "brand_enum" NOT NULL,
	"car_type" "car_type_enum" NOT NULL,
	"fuel_type" "fuel_type_enum" NOT NULL,
	"transmission_type" "transmission_type_enum" NOT NULL,
	"amenities" "amenities_enum"[] NOT NULL,
	"image_urls" varchar(500)[],
	"seating_capacity" integer NOT NULL,
	"description" text,
	"is_featured" boolean DEFAULT false,
	"times_searched" integer DEFAULT 0,
	"is_allowed_booking_without_driver" boolean DEFAULT false,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"image" text,
	"email" text NOT NULL,
	"phone" text,
	"address" text,
	"email_verified" timestamp,
	"password" text NOT NULL,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"session_token" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires" timestamp NOT NULL,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "verification_tokens" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;