"use client";

import { Car, ChevronDown, Globe, Image as ImageIcon, Info, Settings2,X } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";

import {
  AmenitiesList,
  BrandNamesList,
  CarTypesList,
  FuelTypesList,
  TransmissionTypesList,
} from "@icat/database/enums";
import { useDisclosure,useMultiFileUpload } from "@icat/lib/hooks";
import { mergeObjectToFormData } from "@icat/lib/utils";
import {
  AlertBox,
  Autocomplete,
  Button,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Input,
  Label,
  Progress,
  SingleSelect,
  Textarea,
  toast,
} from "@icat/ui";
import { cn } from "@icat/ui/lib/utils";
import { registerCar, updateCar } from "@icat/web/actions";

import { SeoFields } from "../seo";
import { CarFormProps } from "./car.types";

export function CarForm({ car, seo, mode }: CarFormProps) {
  const isUpdateMode = mode === "update";
  const [isOpenSeo, , , onToggleSeo] = useDisclosure(false);

  const [result, action, pending] = useActionState(
    isUpdateMode ? updateCar : registerCar,
    null,
  );

  const success = result?.success;
  const error = result?.error;

  const { files, uploadFiles, deleteFile, resetFiles, isUploading } =
    useMultiFileUpload({
      initialUrls: car?.imageUrls,
    });

  useEffect(() => {
    if (result?.success) {
      toast.success(
        `Car ${isUpdateMode ? "updated" : "registered"} successfully.`,
        {
          position: "top-center",
        },
      );

      if (!isUpdateMode) {
        resetFiles();
      }
    }
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
    <form action={actionWithImageUrls} className="space-y-12 w-full pb-24">
      {!success && error?.message && (
        <AlertBox
          key={error.status}
          variant="destructive"
          description={error?.message}
        />
      )}

      {/* --- GROUP 1: Car Registration Details --- */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information Section */}
          <section className="space-y-4 p-6 border rounded-xl bg-card shadow-sm">
            <div className="flex items-center gap-2 border-b pb-2 mb-4">
              <Car className="text-primary size-5" />
              <h2 className="text-xl font-semibold">Basic Information</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
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
                <Label htmlFor="brand">Brand</Label>
                <SingleSelect
                  id="brand"
                  options={BrandNamesList}
                  placeholder="Select brand name"
                  name={"brand"}
                  defaultValue={car?.brand}
                  errors={error?.cause?.brand?._errors}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="e.g. 2024"
                  name={"year"}
                  defaultValue={car?.year}
                  errors={error?.cause?.year?._errors}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carType">Car Type</Label>
                <SingleSelect
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
                <SingleSelect
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
                <SingleSelect
                  id="transmissionType"
                  options={TransmissionTypesList}
                  placeholder="Select transmission type"
                  name={"transmissionType"}
                  defaultValue={car?.transmissionType}
                  errors={error?.cause?.transmissionType?._errors}
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
            </div>
          </section>

          {/* Features & Description Section */}
          <section className="space-y-4 p-6 border rounded-xl bg-card shadow-sm">
            <div className="flex items-center gap-2 border-b pb-2 mb-4">
              <Info className="text-primary size-5" />
              <h2 className="text-xl font-semibold">Features & Description</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amenities">Amenities</Label>
                <Autocomplete
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
                  placeholder="Write about the car features, condition, etc..."
                  rows={8}
                  className="min-h-[220px]"
                  name={"description"}
                  defaultValue={car?.description ?? ""}
                  errors={error?.cause?.description?._errors}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Media Section */}
        <section className="space-y-4 p-6 border rounded-xl bg-card shadow-sm w-full">
          <div className="flex items-center gap-2 border-b pb-2 mb-4">
            <ImageIcon className="text-primary size-5" />
            <h2 className="text-xl font-semibold">Media Gallery</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="images">Upload Car Images</Label>
              <Input
                id="images"
                multiple
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {files?.map((f) => (
                <div key={f.id} className="relative border rounded-lg overflow-hidden group">
                  <Image
                    width={200}
                    height={150}
                    src={f.previewUrl || "/placeholder.jpg"}
                    alt="Preview"
                    className="object-cover w-full h-32"
                  />
                  <button
                    type="button"
                    onClick={() => deleteFile(f.id)}
                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Settings Section */}
        <section className="space-y-4 p-6 border rounded-xl bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b pb-2 mb-4">
            <Settings2 className="text-primary size-5" />
            <h2 className="text-xl font-semibold">Additional Settings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
              <Checkbox id="isFeatured" name={"isFeatured"} defaultChecked={car?.isFeatured} />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="isFeatured" className="cursor-pointer">Mark as Featured Car</Label>
                <p className="text-sm text-muted-foreground">Appears on home page.</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
              <Checkbox id="forceWithDriver" name={"forceWithDriver"} defaultChecked={car?.forceWithDriver ?? false} />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="forceWithDriver" className="cursor-pointer">Force booking with driver</Label>
                <p className="text-sm text-muted-foreground">Renters must book with a driver.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --- GROUP 2: SEO Enhancement --- */}
      <div className="space-y-6 pt-4 border-t">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">SEO Enhancement</h2>
          <p className="text-muted-foreground">Optional: Boost your car&apos;s visibility in search engines.</p>
        </div>

        <Collapsible
          open={isOpenSeo}
          onOpenChange={onToggleSeo}
          className="border rounded-xl p-6 bg-primary/5 border-primary/20 shadow-sm"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2">
                <Globe size={24} className="text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Configure SEO Metadata</h3>
                  <p className="text-sm text-muted-foreground">
                    Title, Description, and Social Sharing preview.
                  </p>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  "size-5 transition-transform duration-200",
                  isOpenSeo && "rotate-180",
                )}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-6">
            <SeoFields seo={seo} errors={error?.cause?.seo} />
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-background/80 backdrop-blur-md z-10 lg:left-[var(--sidebar-width)] transition-[left]">
        <div className="w-full flex justify-end gap-4 px-4 md:px-8">
           <Button
            type="submit"
            size={"lg"}
            className="px-12 font-bold shadow-lg"
            disabled={pending || isUploading}
          >
            {pending ? "Saving..." : isUpdateMode ? "Update Car Details" : "Register Car"}
          </Button>
        </div>
      </div>
    </form>
  );
}
