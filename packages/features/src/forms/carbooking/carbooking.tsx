"use client";

import {
  Button,
  DateTimePicker,
  Input,
  Label,
  Textarea,
  AlertBox,
  toast,
} from "@icat/ui";
import { ArrowRight, User, Mail, Phone, IdCard } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { CarBookingRequestDto, CarBookingRequestSchema } from "@icat/contracts";
import { CarBookingFormProps } from "./carbooking.types";
import { bookCar } from "@icat/web/actions";

export function CarBookingForm({ defaultValue }: CarBookingFormProps) {
  const [lastResult, action] = useActionState(bookCar, null);

  const [form, fields] = useForm({
    lastResult,
    defaultValue: defaultValue as CarBookingRequestDto,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: CarBookingRequestSchema }),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  useEffect(() => {
    if (lastResult?.status === "success") {
      toast.success("Car booked successfully!", { position: "top-center" });
    }
  }, [lastResult]);

  return (
    <form
      action={action}
      onSubmit={form.onSubmit}
      className="grid gap-4 w-full"
    >
      {form?.errors?.map((error) => (
        <AlertBox key={error} variant="destructive" description={error} />
      ))}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>

        <Input
          id="name"
          name={fields.name.name}
          defaultValue={fields.name.defaultValue}
          errors={fields.name.errors}
          placeholder="Enter your name"
          startIcon={<User size={18} />}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Email Address</Label>
        <Input
          id="email"
          type="email"
          name={fields.email.name}
          defaultValue={fields.email.defaultValue}
          errors={fields.email.errors}
          placeholder="Enter your email address"
          startIcon={<Mail size={18} />}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Phone Number</Label>
        <Input
          id="phone"
          name={fields.phone.name}
          defaultValue={fields.phone.defaultValue}
          errors={fields.phone.errors}
          placeholder="Enter your phone number"
          startIcon={<Phone size={18} />}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">CNIC</Label>
        <Input
          id="cnic"
          name={fields.cnic.name}
          defaultValue={fields.cnic.defaultValue}
          errors={fields.cnic.errors}
          placeholder="Enter your CNIC number"
          startIcon={<IdCard size={18} />}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Pick Up Date</Label>
        <DateTimePicker
          name={fields.pickupDate.name}
          defaultValue={fields.pickupDate.defaultValue}
          errors={fields.pickupDate.errors}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Pick Up Address</Label>
        <Textarea
          id="pickupAddress"
          name={fields.pickupAddress.name}
          defaultValue={fields.pickupAddress.defaultValue}
          errors={fields.pickupAddress.errors}
          placeholder="Enter your pick up address"
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Drop Off Date</Label>
        <DateTimePicker
          name={fields.dropoffDate.name}
          defaultValue={fields.dropoffDate.defaultValue}
          errors={fields.dropoffDate.errors}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Drop Off Address</Label>
        <Textarea
          id="dropoffAddress"
          name={fields.dropoffAddress.name}
          defaultValue={fields.dropoffAddress.defaultValue}
          errors={fields.dropoffAddress.errors}
          placeholder="Enter your drop off address"
          className="resize-none"
        />
      </div>

      <Button size="lg" className="font-bold shadow-none group mt-2">
        Confirm Booking
        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
}
