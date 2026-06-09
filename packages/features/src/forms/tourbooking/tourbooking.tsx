"use client";

import { ArrowRight, Info,Minus, Plus, User } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

import { mergeObjectToFormData } from "@icat/lib/utils";
import { toast } from "@icat/ui";
import { AlertBox } from "@icat/ui/components/alert";
import { Button } from "@icat/ui/components/button";
import { Input } from "@icat/ui/components/input";
import { Label } from "@icat/ui/components/label";
import { Textarea } from "@icat/ui/components/textarea";
import { bookTour } from "@icat/web/actions";

import { TourBookingFormProps } from "./tourbooking.types";

export function TourBookingForm({
  defaultValue,
  hideNumberOfAdultsAndChildren,
}: TourBookingFormProps) {
  const [result, action, pending] = useActionState(bookTour, null);

  const [adults, setAdults] = useState(
    defaultValue?.tours?.[0]?.adultsNumber ?? 1,
  );
  const [children, setChildren] = useState(
    defaultValue?.tours?.[0]?.childrenNumber ?? 0,
  );

  const success = result?.success;
  const error = result?.error;

  const tour = defaultValue?.tours?.[0];

  const actionWithTours = (formData: FormData) => {
    const formDataWithTours = mergeObjectToFormData(formData, {
      tours: [
        {
          ...tour,
          adultsNumber: adults,
          childrenNumber: children,
        },
      ],
    });

    action(formDataWithTours);
  };

  useEffect(() => {
    if (result?.success && !result.data?.isLoggedIn) {
      toast.success(
        "Tour Booked successfully, you'll receive a confirmation email!",
        {
          position: "top-center",
        },
      );
    }
  }, [result, result?.data?.isLoggedIn]);

  return (
    <form action={actionWithTours} className="space-y-8 w-full">
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
          <Info className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Booking Details</h2>
        </div>

        {!hideNumberOfAdultsAndChildren ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
                Adults
              </Label>
              <div className="flex items-center justify-between p-2 border rounded-lg bg-background">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                >
                  <Minus size={14} />
                </Button>
                <span className="font-bold text-lg">{adults}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8"
                  onClick={() => setAdults(adults + 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
                Children
              </Label>
              <div className="flex items-center justify-between p-2 border rounded-lg bg-background">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                >
                  <Minus size={14} />
                </Button>
                <span className="font-bold text-lg">{children}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8"
                  onClick={() => setChildren(children + 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            placeholder="Any special requirements?"
            className="resize-none min-h-24"
            name={"notes"}
            errors={error?.cause?.notes?._errors}
          />
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
