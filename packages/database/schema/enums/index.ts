export const BrandNamesList = [
    "",
    "use",
    "Acura",
    "AlfaRomeo",
    "AstonMartin",
    "Audi",
    "BMW",
    "BYD",
    "Bentley",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Dodge",
    "Ferrari",
    "Fiat",
    "Ford",
    "GMC",
    "Genesis",
    "Honda",
    "Hummer",
    "Hyundai",
    "Infiniti",
    "Jaguar",
    "Jeep",
    "Kia",
    "Lamborghini",
    "Landrover",
    "Lexus",
    "Lincoln",
    "Lotus",
    "Lucid",
    "MB",
    "Maserati",
    "Mazda",
    "Mclaren",
    "Mini",
    "Mitsubishi",
    "Nissan",
    "Polestar",
    "Porsche",
    "RAM",
    "RollsRoyce",
    "Subaru",
    "Tesla",
    "Toyota",
    "Vinfast",
    "Volkswagen",
    "Volvo",
] as const;

export type BrandNames = (typeof BrandNamesList)[number];

export const CarTypesList = [
  "SUV",
  "Sedan",
  "Hatchback",
  "Convertible",
  "Sports Car",
  "Compact",
  "Coupe",
  "Minivan",
  "Pickup Truck",
  "Station Wagon",
  "Luxury",
  "Crossover",
  "Off-Road",
] as const;

export type CarTypes = (typeof CarTypesList)[number];

export const FuelTypesList = [
  "Petrol",
  "Diesel",
  "Electric",
  "Hybrid",
] as const;

export type FuelTypes = (typeof FuelTypesList)[number];

export const TransmissionTypesList = ["Automatic", "Manual"] as const;

export type TransmissionTypes = (typeof TransmissionTypesList)[number];

export const AmenitiesList = [
  "GPS",
  "Bluetooth",
  "Heated Seats",
  "Sunroof/Moonroof",
  "Air Conditioning",
  "Backup Camera",
  "Cruise Control",
  "Alloy Wheels",
  "Keyless Entry",
  "Leather Seats",
  "Parking Sensors",
] as const;

export type Amenities = (typeof AmenitiesList)[number];
