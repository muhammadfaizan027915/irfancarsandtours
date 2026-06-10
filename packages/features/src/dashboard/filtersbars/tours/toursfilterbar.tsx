"use client";

import { X } from "lucide-react";

import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import { Button } from "@icat/ui/components/button";
import { Card, CardContent, CardHeader } from "@icat/ui/components/card";

import { DateRangeFilter, TextFilter } from "../filters";

export function ToursFilterBar() {
  const { getSearchParams, updateSearchParams } = useSearchRouter();

  const nameValue = getSearchParams("name")?.[0];
  const locationValue = getSearchParams("location")?.[0];
  const startDateValue = getSearchParams("startDate")?.[0];
  const endDateValue = getSearchParams("endDate")?.[0];
  const capacityValue = getSearchParams("maxCapacity")?.[0];

  const hasFilters = Boolean(
    nameValue ||
      locationValue ||
      startDateValue ||
      endDateValue ||
      capacityValue
  );

  const handleClearFilters = () => {
    updateSearchParams({
      name: undefined,
      location: undefined,
      startDate: undefined,
      endDate: undefined,
      maxCapacity: undefined,
    });
  };

  return (
    <Card className="py-4 shadow-none rounded-xl gap-2">
      <CardHeader className="px-4 h-8 flex flex-row gap-2 justify-between items-center">
        <h3 className="font-semibold text-lg">Filter Tours</h3>
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

      <CardContent className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <TextFilter label="Name" name="name" placeholder="Tour Name" />
        <TextFilter label="Location" name="location" placeholder="Location" />
        <DateRangeFilter label="Start Date Range" placeholder="Select dates" />
        <TextFilter
          label="Min Capacity"
          name="maxCapacity"
          placeholder="Capacity"
        />
      </CardContent>
    </Card>
  );
}
