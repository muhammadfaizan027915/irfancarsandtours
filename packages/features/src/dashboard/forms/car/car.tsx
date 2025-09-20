"use client";

import { AlertBox, Button, Checkbox, Input, Label, Textarea } from "@icat/ui";
import { registerCar, updateUser } from "@icat/web/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { RegisterCarBodySchema, UpdateCarBodySchema } from "@icat/contracts";
import { CarFormProps } from "./car.types";
import { useActionState } from "react";

export function CarForm({ defaultValue, mode }: CarFormProps) {
  const isUpdateMode = mode === "update";

  const [lastResult, action] = useActionState(
    isUpdateMode ? updateUser : registerCar,
    null
  );

  const [form, fields] = useForm({
    lastResult,
    ...(!isUpdateMode ? defaultValue : {}),
    onValidate: ({ formData }) =>
      parseWithZod(formData, {
        schema: isUpdateMode ? UpdateCarBodySchema : RegisterCarBodySchema,
      }),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      id={form.id}
      action={action}
      onSubmit={form.onSubmit}
      className="space-y-6"
    >
      {form?.errors?.map((error) => (
        <AlertBox key={error} variant="destructive" description={error} />
      ))}

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Car Name</Label>
          <Input
            id="name"
            placeholder="Enter car name"
            key={fields.name.key}
            name={fields.name.name}
            defaultValue={fields.name.initialValue}
            errors={fields.name.errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            placeholder="Enter model"
            key={fields.model.key}
            name={fields.model.name}
            defaultValue={fields.model.initialValue}
            errors={fields.model.errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="number"
            placeholder="e.g. 2024"
            key={fields.year.key}
            name={fields.year.name}
            defaultValue={fields.year.initialValue}
            errors={fields.year.errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seatingCapacity">Seating Capacity</Label>
          <Input
            id="seatingCapacity"
            type="number"
            placeholder="e.g. 5"
            key={fields.seatingCapacity.key}
            name={fields.seatingCapacity.name}
            defaultValue={fields.seatingCapacity.initialValue}
            errors={fields.seatingCapacity.errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            placeholder="e.g. Toyota"
            key={fields.brand.key}
            name={fields.brand.name}
            defaultValue={fields.brand.initialValue}
            errors={fields.brand.errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Car Type</Label>
          <Input
            id="carType"
            placeholder="e.g. Toyota"
            key={fields.carType.key}
            name={fields.carType.name}
            defaultValue={fields.carType.initialValue}
            errors={fields.carType.errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Fuel Type</Label>
          <Input
            id="fuelType"
            placeholder="e.g. Toyota"
            key={fields.fuelType.key}
            name={fields.fuelType.name}
            defaultValue={fields.fuelType.initialValue}
            errors={fields.fuelType.errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Transmission Type</Label>
          <Input
            id="transmissionType"
            placeholder="e.g. Toyota"
            key={fields.transmissionType.key}
            name={fields.transmissionType.name}
            defaultValue={fields.transmissionType.initialValue}
            errors={fields.transmissionType.errors}
          />
        </div>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Write about the car features..."
            rows={10}
            className="h-40"
            key={fields.description.key}
            name={fields.description.name}
            defaultValue={fields.description.initialValue}
            errors={fields.description.errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="images">Upload Images</Label>
          <Input id="images" type="file" multiple accept="image/*" />
        </div>

        <div className="flex items-center">
          <Checkbox
            key={fields.isFeatured.key}
            name={fields.isFeatured.name}
            defaultValue={fields.isFeatured.initialValue}
            // errors={fields.name.errors}
          />{" "}
          <Label className="ml-2">Mark as Featured Car</Label>
        </div>

        <div className="flex items-center">
          <Checkbox
            key={fields.isAllowedBookingWithoutDriver.key}
            name={fields.isAllowedBookingWithoutDriver.name}
            defaultValue={fields.isAllowedBookingWithoutDriver.initialValue}
            // errors={fields.name.errors}
          />{" "}
          <Label className="ml-2">Allowed to book without driver</Label>
        </div>

        <Button type="submit" size={"lg"} className="ml-auto">
          {isUpdateMode ? "Update Car" : "Register Car"}
        </Button>
      </div>
    </form>
  );
}
