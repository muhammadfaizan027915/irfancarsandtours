import { Button, DateTimePicker, Input, Label, Textarea } from "@icat/ui";
import { ArrowRight } from "lucide-react";

export function CarBookingForm() {
  return (
    <form className="grid gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input id="name" placeholder="Enter your name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Email Address</Label>
        <Input id="name" placeholder="Enter your email address" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Phone Number</Label>
        <Input id="name" placeholder="Enter your phone number" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">CNIC Number</Label>
        <Input id="name" placeholder="Enter your CNIC Number" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Pick Up Date</Label>
        <DateTimePicker />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Pick Up Address</Label>
        <Textarea
          className="resize-none"
          placeholder="Enter your pick up address"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Drop off Date</Label>
        <DateTimePicker />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Drop off Address</Label>
        <Textarea
          className="resize-none"
          placeholder="Enter your drop off addresss"
        />
      </div>

      <Button size={"lg"} className="font-bold shadow-none group mt-2">
        Confirm Booking
        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
}
