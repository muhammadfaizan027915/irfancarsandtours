import { Button, Input, Label, Textarea } from "@icat/ui";
import { CarFormProps } from "./car.types";

export function CarForm({ defaultValues, mode }: CarFormProps) {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Car Name</Label>
          <Input id="name" placeholder="Enter car name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input id="model" placeholder="Enter model" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input id="year" type="number" placeholder="e.g. 2024" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" placeholder="e.g. Toyota" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Car Type</Label>
          <Input id="carType" placeholder="e.g. Toyota" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Fuel Type</Label>
          <Input id="fuelType" placeholder="e.g. Toyota" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Transmission Type</Label>
          <Input id="transmissionType" placeholder="e.g. Toyota" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seatingCapacity">Seating Capacity</Label>
          <Input id="seatingCapacity" type="number" placeholder="e.g. 5" />
        </div>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Write about the car features..."
            rows={6}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="images">Upload Images</Label>
          <Input id="images" type="file" multiple accept="image/*" />
        </div>

        <Button type="submit" size={"lg"} className="ml-auto">
          Register Car
        </Button>
      </div>
    </form>
  );
}
