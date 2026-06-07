"use client";

import {
  ArrowRight,
  Clock,
  ImageIcon,
  Info,
  Plus,
  Settings2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";

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
  DateTimePicker,
  Input,
  Label,
  Textarea,
  toast,
} from "@icat/ui";
import { createTour, updateTour } from "@icat/web/actions";
import { TourFormProps } from "./tour.types";

export function TourForm({ tour, mode }: TourFormProps) {
  const isUpdateMode = mode === "update";

  const [result, action, pending] = useActionState(
    isUpdateMode ? updateTour : createTour,
    null,
  );

  const error = result?.error;

  const { files, uploadFiles, deleteFile, resetFiles, isUploading } =
    useMultiFileUpload({
      initialUrls: tour?.imageUrls as string[],
    });

  const [itinerary, setItinerary] = useState(
    tour?.itinerary || [{ title: "", description: "" }],
  );
  const [inclusions, setInclusions] = useState<string[]>(
    tour?.inclusions || [],
  );
  const [exclusions, setExclusions] = useState<string[]>(
    tour?.exclusions || [],
  );

  useEffect(() => {
    if (tour && isUpdateMode) {
      setItinerary(tour.itinerary || [{ title: "", description: "" }]);
      setInclusions(tour.inclusions || []);
      setExclusions(tour.exclusions || []);
    }
  }, [tour, isUpdateMode]);

  useEffect(() => {
    if (result?.success) {
      toast.success(
        `Tour ${isUpdateMode ? "updated" : "created"} successfully.`,
        { position: "top-center" },
      );
      if (!isUpdateMode) {
        resetFiles();
        setItinerary([{ title: "", description: "" }]);
        setInclusions([]);
        setExclusions([]);
      }
    }
  }, [result, isUpdateMode, resetFiles]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) uploadFiles(e.target.files);
  };

  const actionWithData = (formData: FormData) => {
    const imageUrls = files?.map((file) => file.previewUrl);

    const formDataWithData = mergeObjectToFormData(formData, {
      ...(isUpdateMode ? { id: tour?.id } : {}),
      imageUrls,
      itinerary,
      inclusions: inclusions.filter((i) => i.trim() !== ""),
      exclusions: exclusions.filter((e) => e.trim() !== ""),
    });

    action(formDataWithData);
  };

  return (
    <div className="w-full space-y-8 pb-4">
      <Card className="shadow-none">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">
            {isUpdateMode ? "Update Tour" : "Create New Tour"}
          </CardTitle>
          <p className="text-muted-foreground">
            {isUpdateMode
              ? "Update tour details, itinerary, and pricing."
              : "Fill in the details below to create a new tour package."}
          </p>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <form action={actionWithData} className="space-y-8">
            {error?.message && (
              <AlertBox
                key={error.status}
                variant="destructive"
                description={error?.message}
              />
            )}

            <div className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Info className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Basic Information</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2 lg:col-span-2">
                    <Label htmlFor="name">Tour Name</Label>
                    <Input
                      id="name"
                      placeholder="Grand Canyon Full Day Tour"
                      name="name"
                      defaultValue={tour?.name}
                      errors={error?.cause?.name?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Las Vegas, NV"
                      name="location"
                      defaultValue={tour?.location}
                      errors={error?.cause?.location?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meetingPoint">Meeting Point</Label>
                    <Input
                      id="meetingPoint"
                      placeholder="Main Entrance, Hotel Bellagio"
                      name="meetingPoint"
                      defaultValue={tour?.meetingPoint}
                      errors={error?.cause?.meetingPoint?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Start Date & Time </Label>
                    <div className="relative">
                      <DateTimePicker
                        id="startDate"
                        name="startDate"
                        defaultValue={
                          tour?.startDate ? String(tour.startDate) : undefined
                        }
                        errors={error?.cause?.startDate?._errors}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    name="description"
                    defaultValue={tour?.description}
                    errors={error?.cause?.description?._errors}
                  />
                </div>
              </div>

              {/* Pricing & Capacity */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings2 className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Pricing & Capacity</h2>
                </div>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pricePerAdult">Price Per Adult</Label>
                    <Input
                      id="pricePerAdult"
                      type="number"
                      placeholder="150"
                      name="pricePerAdult"
                      defaultValue={tour?.pricePerAdult}
                      errors={error?.cause?.pricePerAdult?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricePerChild">Price Per Child</Label>
                    <Input
                      id="pricePerChild"
                      type="number"
                      placeholder="80"
                      name="pricePerChild"
                      defaultValue={tour?.pricePerChild}
                      errors={error?.cause?.pricePerChild?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxCapacity">Max Capacity</Label>
                    <Input
                      id="maxCapacity"
                      type="number"
                      placeholder="20"
                      name="maxCapacity"
                      defaultValue={tour?.maxCapacity}
                      errors={error?.cause?.maxCapacity?._errors}
                    />
                  </div>
                </div>
              </div>

              {/* Itinerary */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="size-5 text-primary" />
                    <h2 className="text-lg font-semibold">Itinerary</h2>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setItinerary([
                        ...itinerary,
                        { title: "", description: "" },
                      ])
                    }
                  >
                    <Plus className="size-4 mr-2" /> Add Step
                  </Button>
                </div>
                <div className="space-y-4">
                  {itinerary.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-start p-4 border rounded-lg bg-muted/30"
                    >
                      <div className="flex-1 space-y-4">
                        <Input
                          placeholder="Step Title (e.g., Morning Pickup)"
                          value={item.title}
                          onChange={(e) => {
                            const newItinerary = [...itinerary];
                            newItinerary[index].title = e.target.value;
                            setItinerary(newItinerary);
                          }}
                        />
                        <Textarea
                          placeholder="Step Description"
                          value={item.description}
                          onChange={(e) => {
                            const newItinerary = [...itinerary];
                            newItinerary[index].description = e.target.value;
                            setItinerary(newItinerary);
                          }}
                        />
                      </div>
                      {itinerary.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() =>
                            setItinerary(
                              itinerary.filter((_, i) => i !== index),
                            )
                          }
                        >
                          <X className="size-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Inclusions</h2>
                  </div>
                  <Autocomplete
                    options={[]}
                    creatable
                    placeholder="Add inclusions (press Enter)..."
                    value={inclusions}
                    onChange={(vals) => setInclusions(vals)}
                    errors={error?.cause?.inclusions?._errors}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Exclusions</h2>
                  </div>
                  <Autocomplete
                    options={[]}
                    creatable
                    placeholder="Add exclusions (press Enter)..."
                    value={exclusions}
                    onChange={(vals) => setExclusions(vals)}
                    errors={error?.cause?.exclusions?._errors}
                  />
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

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings2 className="size-5 text-primary" />
                  <h2 className="text-lg font-semibold">Additional Settings</h2>
                </div>
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer w-fit">
                  <Checkbox
                    name="isFeatured"
                    defaultChecked={tour?.isFeatured ?? false}
                  />
                  <span>Mark as Featured Tour</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                size="lg"
                className="px-12 font-bold shadow-lg group"
                disabled={pending || isUploading}
              >
                {pending
                  ? "Saving..."
                  : isUpdateMode
                    ? "Update Tour"
                    : "Create Tour"}
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
