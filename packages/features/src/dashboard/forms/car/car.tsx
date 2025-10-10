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
import { mergeObjectToFormData } from "@icat/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";

export function CarForm({ car, mode }: CarFormProps) {
  const isUpdateMode = mode === "update";

  const [result, action] = useActionState(
    isUpdateMode ? updateCar : registerCar,
    null
  );

  const success = result?.success;
  const error = result?.error;

  const { files, uploadFiles, deleteFile, resetFiles } = useMultiFileUpload({
    initialUrls: car?.imageUrls,
  });

  useEffect(() => {
    if (result?.success) {
      toast.success(
        `Car ${isUpdateMode ? "updated" : "registered"} successfully.`,
        {
          position: "top-center",
        }
      );
    }

    resetFiles()
  }, [result]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      uploadFiles(e.target.files);
    }
  };

  const actionWithImageUrls = (formData: FormData) => {
    const imageUrls = files?.map((file) => file.previewUrl);

    const formDataWithImageUrls = mergeObjectToFormData(formData, {
      ...(isUpdateMode ? { id: car?.id } : {}),
      imageUrls,
    });

    action(formDataWithImageUrls);
  };

  return (
    <form action={actionWithImageUrls} className="space-y-6">
      {!success && error?.message && (
        <AlertBox
          key={error.status}
          variant="destructive"
          description={error?.message}
        />
      )}

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Car Name</Label>
          <Input
            id="name"
            placeholder="Enter car name"
            name={"name"}
            defaultValue={car?.name}
            errors={error?.cause?.name?._errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            placeholder="Enter model"
            name={"model"}
            defaultValue={car?.model}
            errors={error?.cause?.model?._errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="year"
            placeholder="e.g. 2024"
            name={"year"}
            defaultValue={car?.year}
            errors={error?.cause?.year?._errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seatingCapacity">Seating Capacity</Label>
          <Input
            id="seatingCapacity"
            type="number"
            placeholder="e.g. 5"
            name={"seatingCapacity"}
            defaultValue={car?.seatingCapacity}
            errors={error?.cause?.seatingCapacity?._errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <GenericSelect
            id="brand"
            options={BrandNamesList}
            placeholder="Select brand name"
            name={"brand"}
            defaultValue={car?.brand}
            errors={error?.cause?.brand?._errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="carType">Car Type</Label>
          <GenericSelect
            id="carType"
            options={CarTypesList}
            placeholder="Select car type"
            name={"carType"}
            defaultValue={car?.carType}
            errors={error?.cause?.carType?._errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fuelType">Fuel Type</Label>
          <GenericSelect
            id="fuelType"
            options={FuelTypesList}
            placeholder="Select fuel type"
            name={"fuelType"}
            defaultValue={car?.fuelType}
            errors={error?.cause?.fuelType?._errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transmissionType">Transmission Type</Label>
          <GenericSelect
            id="transmissionType"
            options={TransmissionTypesList}
            placeholder="Select transmission type"
            name={"transmissionType"}
            defaultValue={car?.transmissionType}
            errors={error?.cause?.transmissionType?._errors}
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
            name={"amenities"}
            defaultValue={car?.amenities}
            errors={error?.cause?.amenities?._errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Write about the car features..."
            rows={10}
            className="min-h-40"
            name={"description"}
            defaultValue={car?.description ?? ""}
            errors={error?.cause?.description?._errors}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="images">Upload Images</Label>
          <Input
            id="images"
            multiple
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files?.map((f) => (
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
          <Checkbox name={"isFeatured"} defaultChecked={car?.isFeatured} />
          <Label className="ml-2">Mark as Featured Car</Label>
        </div>

        <div className="flex items-center">
          <Checkbox
            name={"forceWithDriver"}
            defaultChecked={car?.forceWithDriver ?? false}
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
