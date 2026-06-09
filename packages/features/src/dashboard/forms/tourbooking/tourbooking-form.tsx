"use client";

import { ArrowRight, MapPin, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

import { DetailedUserResponseDto,TourResponseDto } from "@icat/contracts";
import { DashboardNavigationUrls } from "@icat/features/dashboard/sidebar/sidebarnavigation/sidebarnavigation.constants";
import { mergeObjectToFormData } from "@icat/lib/utils";
import {
  AlertBox,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
  toast,
} from "@icat/ui";
import { bookTourAdmin } from "@icat/web/actions";

import { UserSelection } from "../../../common/user-selection/user-selection";
import { SelectedTour, SelectedToursList } from "./selected-tours-list/selected-tours-list";
import { TourSelection } from "./tour-selection/tour-selection";


export function AdminTourBookingForm() {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<DetailedUserResponseDto | null>(null);
  const [isCreatingNewUser, setIsCreatingNewUser] = useState(false);
  const [selectedTours, setSelectedTours] = useState<SelectedTour[]>([]);

  const [result, action, pending] = useActionState(bookTourAdmin, null);

  const success = result?.success;
  const error = result?.error;

  useEffect(() => {
    if (result?.success) {
      toast.success("Booking created successfully.", {
        position: "top-center",
      });
      router.push(DashboardNavigationUrls.BOOKINGS_TOURS);
    }
  }, [result, router]);

  const handleTourSelect = (tour: TourResponseDto) => {
    if (selectedTours.some((st) => st.tour.id === tour.id)) return;
    setSelectedTours([
      ...selectedTours,
      {
        tour,
        adultsNumber: 1,
        childrenNumber: 0,
        quotedPricePerAdult: tour.pricePerAdult ?? 0,
        quotedPricePerChild: tour.pricePerChild ?? 0,
      },
    ]);
  };

  const handleTourUpdate = (tourId: string, updates: Partial<SelectedTour>) => {
    setSelectedTours(
      selectedTours.map((st) => (st.tour.id === tourId ? { ...st, ...updates } : st))
    );
  };

  const handleTourRemove = (tourId: string) => {
    setSelectedTours(selectedTours.filter((st) => st.tour.id !== tourId));
  };

  const handleSubmit = (formData: FormData) => {
    const toursData = selectedTours.map((st) => ({
      tourId: st.tour.id,
      adultsNumber: st.adultsNumber,
      childrenNumber: st.childrenNumber,
      quotedPricePerAdult: st.quotedPricePerAdult,
      quotedPricePerChild: st.quotedPricePerChild,
    }));

    const data: Record<string, unknown> = {
      tours: toursData,
    };

    if (selectedUser) {
      data.userId = selectedUser.id;
      if (!formData.get("name")) formData.set("name", selectedUser.name);
      if (!formData.get("email")) formData.set("email", selectedUser.email);
      if (!formData.get("phone")) formData.set("phone", selectedUser.phone ?? "");
      if (!formData.get("cnic")) formData.set("cnic", selectedUser.cnic ?? "");
    }

    const formDataWithTours = mergeObjectToFormData(formData, data);
    action(formDataWithTours);
  };

  const totalPrice = selectedTours.reduce(
    (total, st) =>
      total +
      st.quotedPricePerAdult * st.adultsNumber +
      st.quotedPricePerChild * st.childrenNumber,
    0
  );

  return (
    <div className="w-full space-y-6 pb-8">
      <Card className="shadow-none">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">Create Manual Tour Booking</CardTitle>
          <p className="text-muted-foreground">
            Create a tour booking for an existing or new customer.
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
                <MapPin className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Select Tours & Pricing</h2>
              </div>

              <TourSelection
                onSelect={handleTourSelect}
                selectedTourIds={selectedTours.map((st) => st.tour.id)}
              />

              <SelectedToursList
                selectedTours={selectedTours}
                onUpdate={handleTourUpdate}
                onRemove={handleTourRemove}
              />

              {selectedTours.length > 0 && (
                <div className="flex justify-end p-4 bg-muted/30 rounded-lg">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Estimated Total</p>
                    <p className="text-3xl font-bold text-primary">Rs. {totalPrice.toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2 border-t pt-8">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Any special requests or instructions..."
                className="min-h-24 resize-none"
                errors={error?.cause?.notes?._errors}
              />
            </div>

            <div className="flex justify-end pt-6">

              <Button
                type="submit"
                size="lg"
                className="px-12 font-bold shadow-lg group"
                disabled={pending || selectedTours.length === 0 || (!selectedUser && !isCreatingNewUser)}
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
