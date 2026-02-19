"use client";

import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@icat/ui/components/date-range-picker";
import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import { DateRangeFilterProps } from "./daterangefilter.types";

export function DateRangeFilter({
  placeholder = "Select date range",
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
    <div className="w-full md:w-64">
      <DateRangePicker
        variant="outline"
        placeholder={placeholder}
        onChange={handleDateRangeChange}
        defaultValue={dateRange}
      />
    </div>
  );
}
