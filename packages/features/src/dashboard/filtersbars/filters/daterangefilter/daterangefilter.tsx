"use client";

import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@icat/ui/components/date-range-picker";
import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import { DateRangeFilterProps } from "./daterangefilter.types";
import { Label } from "@icat/ui/components/label";

export function DateRangeFilter({
  placeholder = "Select date range",
  label,
}: DateRangeFilterProps) {
  const { getSearchParams, updateSearchParams } = useSearchRouter();

  const startDateValue = getSearchParams("startDate")?.[0];
  const endDateValue = getSearchParams("endDate")?.[0];

  const dateRange: DateRange = {
    from: startDateValue ? new Date(startDateValue) : undefined,
    to: endDateValue ? new Date(endDateValue) : undefined,
  };

  const handleDateRangeChange = (range?: DateRange) => {
    updateSearchParams({
      startDate: range?.from?.toDateString(),
      endDate: range?.to?.toDateString(),
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <Label>{label}</Label>}
      <DateRangePicker
        variant="outline"
        placeholder={placeholder}
        onChange={handleDateRangeChange}
        defaultValue={dateRange}
      />
    </div>
  );
}
