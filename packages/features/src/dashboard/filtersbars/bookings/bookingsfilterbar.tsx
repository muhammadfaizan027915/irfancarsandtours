"use client";

import { X } from "lucide-react";
import { Button } from "@icat/ui/components/button";
import { Card, CardHeader, CardContent } from "@icat/ui/components/card";
import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import { DateRangeFilter, SearchFilter } from "../filters";

export function BookingsFilterBar() {
  const { getSearchParams, updateSearchParams } = useSearchRouter();

  const searchValue = getSearchParams("search")?.[0] || "";
  const startDateValue = getSearchParams("startDate")?.[0];
  const endDateValue = getSearchParams("endDate")?.[0];

  const hasFilters = Boolean(searchValue || startDateValue || endDateValue);

  const handleClearFilters = () => {
    updateSearchParams({
      search: undefined,
      startDate: undefined,
      endDate: undefined,
    });
  };

  return (
    <Card className="py-4 shadow-none rounded-xl gap-2">
      <CardHeader className="px-4 h-8 flex flex-row gap-2 justify-between">
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

      <CardContent className="px-4 flex flex-col md:flex-row gap-4 items-end">
        <DateRangeFilter />
        <SearchFilter />
      </CardContent>
    </Card>
  );
}
