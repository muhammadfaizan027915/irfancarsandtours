"use client";

import { useActionState, useEffect } from "react";
import Image from "next/image";
import { Car, ImageIcon, Info, Settings2, X } from "lucide-react";

import {
  AmenitiesList,
  BrandNamesList,
  CarTypesList,
  FuelTypesList,
  TransmissionTypesList,
} from "@icat/database/enums";
import { useMultiFileUpload } from "@icat/lib/hooks";
import { mergeObjectToFormData } from "@icat/lib/utils";
import {
  AlertBox,
  Autocomplete,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  SingleSelect,
  Textarea,
  toast,
} from "@icat/ui";
import { registerCar, updateCar } from "@icat/web/actions";

import { CarFormProps } from "./car.types";

export function CarForm({ car, mode }: CarFormProps) {
  const isUpdateMode = mode === "update";

  const [result, action, pending] = useActionState(
    isUpdateMode ? updateCar : registerCar,
    null,
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
        { position: "top-center" },
      );
      if (!isUpdateMode) resetFiles();
    }
  }, [result]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) uploadFiles(e.target.files);
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
    <div className="w-full space-y-8 pb-4">
      <Card className="shadow-none">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">
            {isUpdateMode ? "Update Car" : "Register New Car"}
          </CardTitle>
          <p className="text-muted-foreground">
            Fill in the details below to {isUpdateMode ? "update" : "register"}{" "}
            your vehicle.
          </p>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <form action={actionWithImageUrls} className="space-y-8">
            {!success && error?.message && (
              <AlertBox
                key={error.status}
                variant="destructive"
                description={error?.message}
              />
            )}

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Car className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Basic Information</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Car Name</Label>
                    <Input
                      id="name"
                      placeholder="Toyota"
                      name="name"
                      defaultValue={car?.name}
                      errors={error?.cause?.name?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      placeholder="Fortuner"
                      name="model"
                      defaultValue={car?.model}
                      errors={error?.cause?.model?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <SingleSelect
                      id="brand"
                      options={BrandNamesList}
                      placeholder="Select brand"
                      name="brand"
                      defaultValue={car?.brand}
                      errors={error?.cause?.brand?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      placeholder="2024"
                      name="year"
                      defaultValue={car?.year}
                      errors={error?.cause?.year?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carType">Car Type</Label>
                    <SingleSelect
                      id="carType"
                      options={CarTypesList}
                      placeholder="SUV"
                      name="carType"
                      defaultValue={car?.carType}
                      errors={error?.cause?.carType?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <SingleSelect
                      id="fuelType"
                      options={FuelTypesList}
                      placeholder="Petrol"
                      name="fuelType"
                      defaultValue={car?.fuelType}
                      errors={error?.cause?.fuelType?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transmissionType">Transmission</Label>
                    <SingleSelect
                      id="transmissionType"
                      options={TransmissionTypesList}
                      placeholder="Automatic"
                      name="transmissionType"
                      defaultValue={car?.transmissionType}
                      errors={error?.cause?.transmissionType?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seatingCapacity">Capacity</Label>
                    <Input
                      id="seatingCapacity"
                      type="number"
                      placeholder="5"
                      name="seatingCapacity"
                      defaultValue={car?.seatingCapacity}
                      errors={error?.cause?.seatingCapacity?._errors}
                    />
                  </div>
                </div>
              </div>

              {/* Features & Description */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Info className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">
                    Features & Description
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amenities">Amenities</Label>
                    <Autocomplete
                      options={AmenitiesList}
                      placeholder="Select amenities"
                      name="amenities"
                      defaultValue={car?.amenities}
                      errors={error?.cause?.amenities?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      name="description"
                      defaultValue={car?.description ?? ""}
                      errors={error?.cause?.description?._errors}
                    />
                  </div>
                </div>
              </div>

              {/* Media */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ImageIcon className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Media Gallery</h2>
                </div>
                <Input
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {files?.map((f) => (
                    <div
                      key={f.id}
                      className="relative aspect-video rounded-lg overflow-hidden border"
                    >
                      <Image
                        src={f.previewUrl || "/placeholder.jpg"}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => deleteFile(f.id)}
                        className="absolute top-1 right-1 bg-destructive rounded-full p-1 text-white"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings2 className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Additional Settings</h2>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer">
                    <Checkbox
                      name="isFeatured"
                      defaultChecked={car?.isFeatured}
                    />
                    <span>Mark as Featured</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer">
                    <Checkbox
                      name="forceWithDriver"
                      defaultChecked={car?.forceWithDriver ?? false}
                    />
                    <span>Force booking with driver</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                size="lg"
                className="px-12 font-bold shadow-lg"
                disabled={pending}
              >
                {pending
                  ? "Saving..."
                  : isUpdateMode
                    ? "Update Car"
                    : "Register Car"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
