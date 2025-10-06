"use client";

import {
  AlertBox,
  Button,
  Checkbox,
  Input,
  Label,
  Textarea,
  GenericSelect,
  toast,
  Progress,
} from "@icat/ui";
import { registerCar, updateCar } from "@icat/web/actions";
import { useForm, useInputControl } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { RegisterCarBodySchema, UpdateCarBodySchema } from "@icat/contracts";
import {
  AmenitiesList,
  BrandNamesList,
  CarTypesList,
  FuelTypesList,
  TransmissionTypesList,
} from "@icat/database/enums";
import { CarFormProps } from "./car.types";
import { useActionState, useEffect } from "react";
import { useMultiFileUpload } from "@icat/lib/hooks";
import { X } from "lucide-react";
import Image from "next/image";

export function CarForm({ car, mode }: CarFormProps) {
  const isUpdateMode = mode === "update";

  const [lastResult, action] = useActionState(
    isUpdateMode ? updateCar : registerCar,
    null
  );

  const [form, fields] = useForm({
    lastResult,
    defaultValue: isUpdateMode ? car : {},
    onValidate: ({ formData }) =>
      parseWithZod(formData, {
        schema: isUpdateMode ? UpdateCarBodySchema : RegisterCarBodySchema,
      }),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const imageUrlsControl = useInputControl({
    name: fields.imageUrls.name,
    key: fields.imageUrls.key,
    formId: form.id,
  });

  const { files, uploadFiles, deleteFile } = useMultiFileUpload({
    initialUrls: car?.imageUrls,
    onSuccess(files) {
      const urls = files.map((file) => file.previewUrl);

      console.log("All uploaded file URLs:", urls);

      imageUrlsControl.change(urls as string[]);
    },
  });

  useEffect(() => {
    if (lastResult?.status === "success") {
      toast.success(
        `Car ${isUpdateMode ? "updated" : "registered"} successfully.`,
        {
          position: "top-center",
        }
      );
    }
  }, [lastResult]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      uploadFiles(e.target.files);
    }
  };

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

      {isUpdateMode && (
        <Input
          type="hidden"
          name={fields.id.name}
          value={fields.id.defaultValue}
          key={fields.id.key}
        />
      )}

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Car Name</Label>
          <Input
            id="name"
            placeholder="Enter car name"
            key={fields.name.key}
            name={fields.name.name}
            defaultValue={fields.name.defaultValue}
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
            defaultValue={fields.model.defaultValue}
            errors={fields.model.errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="year"
            placeholder="e.g. 2024"
            key={fields.year.key}
            name={fields.year.name}
            defaultValue={fields.year.defaultValue}
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
            defaultValue={fields.seatingCapacity.defaultValue}
            errors={fields.seatingCapacity.errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <GenericSelect
            id="brand"
            options={BrandNamesList}
            placeholder="Select brand name"
            key={fields.brand.key}
            name={fields.brand.name}
            defaultValue={fields.brand.defaultValue}
            errors={fields.brand.errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="carType">Car Type</Label>
          <GenericSelect
            id="carType"
            options={CarTypesList}
            placeholder="Select car type"
            key={fields.carType.key}
            name={fields.carType.name}
            defaultValue={fields.carType.defaultValue}
            errors={fields.carType.errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fuelType">Fuel Type</Label>
          <GenericSelect
            id="fuelType"
            options={FuelTypesList}
            placeholder="Select fuel type"
            key={fields.fuelType.key}
            name={fields.fuelType.name}
            defaultValue={fields.fuelType.defaultValue}
            errors={fields.fuelType.errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transmissionType">Transmission Type</Label>
          <GenericSelect
            id="transmissionType"
            options={TransmissionTypesList}
            placeholder="Select transmission type"
            key={fields.transmissionType.key}
            name={fields.transmissionType.name}
            defaultValue={fields.transmissionType.defaultValue}
            errors={fields.transmissionType.errors}
          />
        </div>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="amenities">Amenities</Label>
          <GenericSelect
            multiple
            id="amenities"
            options={AmenitiesList}
            placeholder="Select amenities"
            key={fields.amenities.key}
            name={fields.amenities.name}
            defaultValue={fields.amenities.defaultOptions}
            errors={fields.amenities.errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Write about the car features..."
            rows={10}
            className="min-h-40"
            key={fields.description.key}
            name={fields.description.name}
            defaultValue={fields.description.defaultValue}
            errors={fields.description.errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="images">Upload Images</Label>
          <Input
            multiple
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            key={fields.imageUrls.key}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((f) => (
            <div
              key={f.id}
              className="relative border rounded-lg overflow-hidden"
            >
              <Image
                src={f.previewUrl || "/placeholder.jpg"}
                alt={f?.file?.name || "Car Image Preview"}
                width={200}
                height={150}
                className="object-cover w-full h-40"
              />
              {f.isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Progress value={f.progress} className="w-3/4" />
                </div>
              )}
              <button
                type="button"
                onClick={() => deleteFile(f.id)}
                className="absolute top-1 right-1 bg-white/80 rounded-full p-1"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <Checkbox
            key={fields.isFeatured.key}
            name={fields.isFeatured.name}
            defaultChecked={fields.isFeatured.defaultChecked}
          />
          <Label className="ml-2">Mark as Featured Car</Label>
        </div>

        <div className="flex items-center">
          <Checkbox
            key={fields.forceWithDriver.key}
            name={fields.forceWithDriver.name}
            defaultChecked={fields.forceWithDriver.defaultChecked}
          />
          <Label className="ml-2">Force booking with driver</Label>
        </div>

        <Button type="submit" size={"lg"} className="ml-auto">
          {isUpdateMode ? "Update Car" : "Register Car"}
        </Button>
      </div>
    </form>
  );
}
