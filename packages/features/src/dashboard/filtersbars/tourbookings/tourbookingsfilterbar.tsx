"use client";

import { X } from "lucide-react";

import { BookingStatusList } from "@icat/database/enums";
import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import { Button } from "@icat/ui/components/button";
import { Card, CardContent, CardHeader } from "@icat/ui/components/card";

import { DateRangeFilter, SelectFilter, TextFilter } from "../filters";

export function TourBookingsFilterBar() {
  const { getSearchParams, updateSearchParams } = useSearchRouter();

  const idValue = getSearchParams("id")?.[0];
  const nameValue = getSearchParams("name")?.[0];
  const emailValue = getSearchParams("email")?.[0];
  const phoneValue = getSearchParams("phone")?.[0];
  const statusValue = getSearchParams("status")?.[0];
  const startDateValue = getSearchParams("startDate")?.[0];
  const endDateValue = getSearchParams("endDate")?.[0];

  const hasFilters = Boolean(
    idValue ||
      nameValue ||
      emailValue ||
      phoneValue ||
      statusValue ||
      startDateValue ||
      endDateValue
  );

  const handleClearFilters = () => {
    updateSearchParams({
      id: undefined,
      name: undefined,
      email: undefined,
      phone: undefined,
      status: undefined,
      startDate: undefined,
      endDate: undefined,
    });
  };

  return (
    <Card className="py-4 shadow-none rounded-xl gap-2">
      <CardHeader className="px-4 h-8 flex flex-row gap-2 justify-between items-center">
        <h3 className="font-semibold text-lg">Filter Tour Bookings</h3>
        {hasFilters && (
          <Button
            onClick={handleClearFilters}
            size="sm"
            variant="outline"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </CardHeader>

      <CardContent className="px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
        <TextFilter label="Booking ID" name="id" placeholder="BKTO..." />
        <TextFilter label="Customer Name" name="name" placeholder="Name" />
        <TextFilter label="Email" name="email" placeholder="Email" />
        <TextFilter label="Phone" name="phone" placeholder="Phone" />
        <SelectFilter
          label="Status"
          name="status"
          options={BookingStatusList}
        />
        <DateRangeFilter label="Date Range" />
      </CardContent>
    </Card>
  );
}
