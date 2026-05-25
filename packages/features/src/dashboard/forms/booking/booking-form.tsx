"use client";

import { ArrowRight, Calendar, MapPin, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { CarResponseDto, DetailedUserResponseDto } from "@icat/contracts";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { mergeObjectToFormData } from "@icat/lib/utils";
import {
  AlertBox,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DateTimePicker,
  Input,
  Label,
  Textarea,
  toast,
} from "@icat/ui";
import { bookCarAdmin } from "@icat/web/actions";

import { CarSelection } from "./components/car-selection/car-selection";
import { SelectedCar, SelectedCarsList } from "./components/selected-cars-list";
import { UserSelection } from "./components/user-selection/user-selection";

export function AdminBookingForm() {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<DetailedUserResponseDto | null>(null);
  const [isCreatingNewUser, setIsCreatingNewUser] = useState(false);
  const [selectedCars, setSelectedCars] = useState<SelectedCar[]>([]);

  const [result, action, pending] = useActionState(bookCarAdmin, null);

  const success = result?.success;
  const error = result?.error;

  useEffect(() => {
    if (success) {
      toast.success("Booking created successfully.", {
        position: "top-center",
      });
      router.push(DashboardNavigationUrls.BOOKINGS);
    }
  }, [success, router]);

  const handleCarSelect = (car: CarResponseDto) => {
    if (selectedCars.some((sc) => sc.car.id === car.id)) return;
    setSelectedCars([
      ...selectedCars,
      {
        car,
        quantity: 1,
        bookedWithDriver: car.forceWithDriver ?? false,
        quotedPrice: car.startingPrice ?? 0,
      },
    ]);
  };

  const handleCarUpdate = (carId: string, updates: Partial<SelectedCar>) => {
    setSelectedCars(
      selectedCars.map((sc) => (sc.car.id === carId ? { ...sc, ...updates } : sc))
    );
  };

  const handleCarRemove = (carId: string) => {
    setSelectedCars(selectedCars.filter((sc) => sc.car.id !== carId));
  };

  const handleSubmit = (formData: FormData) => {
    const carsData = selectedCars.map((sc) => ({
      carId: sc.car.id,
      quantity: sc.quantity,
      bookedWithDriver: sc.bookedWithDriver,
      quotedPrice: sc.quotedPrice,
    }));

    const data: Record<string, unknown> = {
      cars: carsData,
    };

    if (selectedUser) {
      data.userId = selectedUser.id;
      if (!formData.get("name")) formData.set("name", selectedUser.name);
      if (!formData.get("email")) formData.set("email", selectedUser.email);
      if (!formData.get("phone")) formData.set("phone", selectedUser.phone ?? "");
      if (!formData.get("cnic")) formData.set("cnic", selectedUser.cnic ?? "");
    }

    const formDataWithCars = mergeObjectToFormData(formData, data);
    action(formDataWithCars);
  };

  const totalPrice = selectedCars.reduce(
    (total, sc) => total + sc.quotedPrice * sc.quantity,
    0
  );

  return (
    <div className="w-full space-y-6 pb-8">
      <Card className="shadow-none">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">Create Manual Booking</CardTitle>
          <p className="text-muted-foreground">
            Create a booking for an existing or new customer.
          </p>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <form action={handleSubmit} className="space-y-8">
            {!success && error?.message && (
              <AlertBox
                key={error.status}
                variant="destructive"
                description={error?.message}
              />
            )}

            {/* User Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <UserIcon className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Customer Information</h2>
              </div>

              <UserSelection
                selectedUser={selectedUser}
                onSelect={(user) => {
                  setSelectedUser(user);
                  setIsCreatingNewUser(false);
                }}
                onCreateNew={() => {
                  setSelectedUser(null);
                  setIsCreatingNewUser(true);
                }}
              />

              {(isCreatingNewUser || selectedUser) && (
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Customer name"
                      defaultValue={selectedUser?.name}
                      readOnly={!!selectedUser}
                      errors={error?.cause?.name?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email address"
                      defaultValue={selectedUser?.email}
                      readOnly={!!selectedUser}
                      errors={error?.cause?.email?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Phone number"
                      defaultValue={selectedUser?.phone ?? ""}
                      readOnly={!!selectedUser}
                      errors={error?.cause?.phone?._errors}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnic">National ID / CNIC</Label>
                    <Input
                      id="cnic"
                      name="cnic"
                      placeholder="ID Number"
                      defaultValue={selectedUser?.cnic ?? ""}
                      readOnly={!!selectedUser}
                      errors={error?.cause?.cnic?._errors}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4 border-t pt-8">
              <div className="flex items-center gap-2">
                <Calendar className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Select Cars & Pricing</h2>
              </div>

              <CarSelection
                onSelect={handleCarSelect}
                selectedCarIds={selectedCars.map((sc) => sc.car.id)}
              />

              <SelectedCarsList
                selectedCars={selectedCars}
                onUpdate={handleCarUpdate}
                onRemove={handleCarRemove}
              />

              {selectedCars.length > 0 && (
                <div className="flex justify-end p-4 bg-muted/30 rounded-lg">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Estimated Total</p>
                    <p className="text-3xl font-bold text-primary">Rs. {totalPrice.toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Pickup & Dropoff Section */}
            <div className="space-y-4 border-t pt-8">
              <div className="flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Logistics Details</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Pick Up Date & Time</Label>
                  <DateTimePicker
                    id="pickupDate"
                    name="pickupDate"
                    errors={error?.cause?.pickupDate?._errors}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dropoffDate">Drop Off Date & Time</Label>
                  <DateTimePicker
                    id="dropoffDate"
                    name="dropoffDate"
                    errors={error?.cause?.dropoffDate?._errors}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupAddress">Pick Up Location</Label>
                  <Textarea
                    id="pickupAddress"
                    name="pickupAddress"
                    placeholder="Enter pickup address"
                    className="min-h-24 resize-none"
                    errors={error?.cause?.pickupAddress?._errors}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dropoffAddress">Drop Off Location</Label>
                  <Textarea
                    id="dropoffAddress"
                    name="dropoffAddress"
                    placeholder="Enter drop off address"
                    className="min-h-24 resize-none"
                    errors={error?.cause?.dropoffAddress?._errors}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                size="lg"
                className="px-12 font-bold shadow-lg group"
                disabled={pending || selectedCars.length === 0 || (!selectedUser && !isCreatingNewUser)}
              >
                {pending ? "Creating Booking..." : "Create Booking"}
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

