"use client";

import { Input } from "@icat/ui/components/input";
import { Label } from "@icat/ui/components/label";
import { Button } from "@icat/ui/components/button";
import { AlertBox } from "@icat/ui/components/alert";
import { Textarea } from "@icat/ui/components/textarea";
import { DateTimePicker } from "@icat/ui/components/date-time-picker";
import { ArrowRight, User, Mail, Phone, IdCard } from "lucide-react";
import { useActionState } from "react";
import { mergeObjectToFormData } from "@icat/lib/utils";
import { CarBookingFormProps } from "./carbooking.types";
import { bookCar } from "@icat/web/actions";

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

  return (
    <form action={actionWithCars} className="grid gap-4 w-full">
      {!success && error?.message && (
        <AlertBox
          key={error.status}
          variant="destructive"
          description={error?.message}
        />
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>

        <Input
          id="name"
          placeholder="Enter your name"
          startIcon={<User size={18} />}
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
          placeholder="Enter your email address"
          startIcon={<Mail size={18} />}
          name={"email"}
          defaultValue={defaultValue?.email}
          errors={error?.cause?.email?._errors}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          placeholder="Enter your phone number"
          startIcon={<Phone size={18} />}
          name={"phone"}
          defaultValue={defaultValue?.phone}
          errors={error?.cause?.phone?._errors}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cnic">CNIC</Label>
        <Input
          id="cnic"
          placeholder="Enter your CNIC number"
          startIcon={<IdCard size={18} />}
          name={"cnic"}
          defaultValue={defaultValue?.cnic}
          errors={error?.cause?.cnic?._errors}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pickupDate">Pick Up Date</Label>
        <DateTimePicker
          id="pickupDate"
          name={"pickupDate"}
          errors={error?.cause?.pickupDate?._errors}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pickupAddress">Pick Up Address</Label>
        <Textarea
          id="pickupAddress"
          placeholder="Enter your pick up address"
          className="resize-none"
          name={"pickupAddress"}
          errors={error?.cause?.pickupAddress?._errors}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dropoffDate">Drop Off Date</Label>
        <DateTimePicker
          id="dropoffDate"
          name={"dropoffDate"}
          errors={error?.cause?.dropoffDate?._errors}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dropoffAddress">Drop Off Address</Label>
        <Textarea
          id="dropoffAddress"
          placeholder="Enter your drop off address"
          className="resize-none"
          name={"dropoffAddress"}
          errors={error?.cause?.dropoffAddress?._errors}
        />
      </div>

      <Button
        size="lg"
        className="font-bold shadow-none group mt-2"
        type="submit"
        disabled={pending}
      >
        Confirm Booking
        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
}
