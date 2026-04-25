"use client";

import { X } from "lucide-react";
import { Button } from "@icat/ui/components/button";
import { Card, CardHeader, CardContent } from "@icat/ui/components/card";
import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import { DateRangeFilter, TextFilter } from "../filters";

export function ComplaintsFilterBar() {
  const { getSearchParams, updateSearchParams } = useSearchRouter();

  const nameValue = getSearchParams("name")?.[0];
  const emailValue = getSearchParams("email")?.[0];
  const phoneValue = getSearchParams("phone")?.[0];
  const startDateValue = getSearchParams("startDate")?.[0];
  const endDateValue = getSearchParams("endDate")?.[0];

  const hasFilters = Boolean(
    nameValue || emailValue || phoneValue || startDateValue || endDateValue
  );

  const handleClearFilters = () => {
    updateSearchParams({
      name: undefined,
      email: undefined,
      phone: undefined,
      startDate: undefined,
      endDate: undefined,
    });
  };

  return (
    <Card className="py-4 shadow-none rounded-xl gap-2">
      <CardHeader className="px-4 h-8 flex flex-row gap-2 justify-between items-center">
        <h3 className="font-semibold text-lg">Filter Complaints</h3>
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
        <TextFilter label="Name" paramName="name" placeholder="Search by name" />
        <TextFilter
          label="Email"
          paramName="email"
          placeholder="Search by email"
        />
        <TextFilter
          label="Phone"
          paramName="phone"
          placeholder="Search by phone"
        />
        <DateRangeFilter label="Date Range" />
      </CardContent>
    </Card>
  );
}
