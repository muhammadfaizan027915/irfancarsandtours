"use client";

import { ArrowRight, MapPin, User } from "lucide-react";
import { useActionState, useEffect } from "react";

import { mergeObjectToFormData } from "@icat/lib/utils";
import { toast } from "@icat/ui";
import { AlertBox } from "@icat/ui/components/alert";
import { Button } from "@icat/ui/components/button";
import { DateTimePicker } from "@icat/ui/components/date-time-picker";
import { Input } from "@icat/ui/components/input";
import { Label } from "@icat/ui/components/label";
import { Textarea } from "@icat/ui/components/textarea";
import { bookCar } from "@icat/web/actions";

import { CarBookingFormProps } from "./carbooking.types";

export function CarBookingForm({ defaultValue }: CarBookingFormProps) {
  const [result, action, pending] = useActionState(bookCar, null);

  const success = result?.success;
  const error = result?.error;

  const actionWithCars = (formData: FormData) => {
    const formDataWithCars = mergeObjectToFormData(formData, {
      cars: defaultValue?.cars,
    });

    action(formDataWithCars);
  };

  useEffect(() => {
    if (success && !result.data?.isLoggedIn) {
      toast.success(
        "Car Booked successfully, you'll receive a confirmation email!",
        {
          position: "top-center",
        },
      );
    }
  }, [success, result?.data?.isLoggedIn]);

  return (
    <form action={actionWithCars} className="space-y-8 w-full">
      {!success && error?.message && (
        <AlertBox
          key={error.status}
          variant="destructive"
          description={error?.message}
        />
      )}

      {/* Contact Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Contact Information</h2>
        </div>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              name={"name"}
              defaultValue={defaultValue?.name}
              errors={error?.cause?.name?._errors}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              name={"email"}
              defaultValue={defaultValue?.email}
              errors={error?.cause?.email?._errors}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="e.g. +1234567890"
              name={"phone"}
              defaultValue={defaultValue?.phone}
              errors={error?.cause?.phone?._errors}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnic">National ID / CNIC</Label>
            <Input
              id="cnic"
              placeholder="Enter ID number"
              name={"cnic"}
              defaultValue={defaultValue?.cnic}
              errors={error?.cause?.cnic?._errors}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t pt-8">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Logistics Details</h2>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <Label htmlFor="pickupDate">Pick Up Date & Time</Label>
            <DateTimePicker
              id="pickupDate"
              name={"pickupDate"}
              errors={error?.cause?.pickupDate?._errors}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dropoffDate">Drop Off Date & Time</Label>
            <DateTimePicker
              id="dropoffDate"
              name={"dropoffDate"}
              errors={error?.cause?.dropoffDate?._errors}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickupAddress">Pick Up Location</Label>
            <Textarea
              id="pickupAddress"
              placeholder="Enter pick up address"
              className="resize-none min-h-24"
              name={"pickupAddress"}
              errors={error?.cause?.pickupAddress?._errors}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dropoffAddress">Drop Off Location</Label>
            <Textarea
              id="dropoffAddress"
              placeholder="Enter drop off address"
              className="resize-none min-h-24"
              name={"dropoffAddress"}
              errors={error?.cause?.dropoffAddress?._errors}
            />
          </div>
        </div>
      </div>

      <div className="flex pt-6">
        <Button
          size="lg"
          className="w-full font-bold shadow-lg group"

          type="submit"
          disabled={pending}
        >
          Confirm Booking
          <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </form>
  );
}
