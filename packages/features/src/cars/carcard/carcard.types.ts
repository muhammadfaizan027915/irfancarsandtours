// Tentative Car Type
export type Car = {
  make: string; // e.g., Toyota
  model: string; // e.g., Corolla
  year: number; // e.g., 2022
  bodyType: "sedan" | "suv"; // type of car
  transmissionType: "manual" | "automatic" | "cvt" | "dct"; // gear system
  fuelType: "petrol" | "diesel" | "electric" | "hybrid";
  engineCapacity: number; // e.g., 1800 (cc)
  seatingCapacity: number; // e.g., 5
  color: string; // e.g., Red
  price: number; // e.g., 25000
};

export type CarCardProps = {
  // car: Car;
  varient?: "small" | "default";
};
