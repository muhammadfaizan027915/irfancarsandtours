import { CarCard } from "./carcard";

export function Cars() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <CarCard varient="small" />
      <CarCard varient="small" />
      <CarCard varient="small" />
    </div>
  );
}
