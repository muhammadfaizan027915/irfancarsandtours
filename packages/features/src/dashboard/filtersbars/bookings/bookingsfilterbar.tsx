"use client";

import { X } from "lucide-react";
import { Button } from "@icat/ui/components/button";
import { Card, CardHeader, CardContent } from "@icat/ui/components/card";
import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import { DateRangeFilter, TextFilter } from "../filters";

export function BookingsFilterBar() {
  const { getSearchParams, updateSearchParams } = useSearchRouter();

  const idValue = getSearchParams("id")?.[0];
  const nameValue = getSearchParams("name")?.[0];
  const addressValue = getSearchParams("address")?.[0];
  const startDateValue = getSearchParams("startDate")?.[0];
  const endDateValue = getSearchParams("endDate")?.[0];

  const hasFilters = Boolean(
    idValue || nameValue || addressValue || startDateValue || endDateValue
  );

  const handleClearFilters = () => {
    updateSearchParams({
      id: undefined,
      name: undefined,
      address: undefined,
      startDate: undefined,
      endDate: undefined,
    });
  };

  return (
    <Card className="py-4 shadow-none rounded-xl gap-2">
      <CardHeader className="px-4 h-8 flex flex-row gap-2 justify-between items-center">
        <h3 className="font-semibold text-lg">Filter Bookings</h3>
        {hasFilters && (
          <Button
            onClick={handleClearFilters}
            size="sm"
            variant="outline"
            className="shadow-none"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </CardHeader>

      <CardContent className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <TextFilter label="Booking ID" paramName="id" placeholder="BK..." />
        <TextFilter label="Customer Name" paramName="name" placeholder="Name" />
        <TextFilter
          label="Address"
          paramName="address"
          placeholder="Pickup/Dropoff"
        />
        <DateRangeFilter label="Date Range" />
      </CardContent>
    </Card>
  );
}
