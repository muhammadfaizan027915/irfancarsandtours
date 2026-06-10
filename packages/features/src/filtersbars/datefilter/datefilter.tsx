"use client";

import { DateRange } from "react-day-picker";

import { useSearchRouter } from "@icat/lib/hooks/usersearchrouter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@icat/ui/components/card";
import { DateRangePicker } from "@icat/ui/components/date-range-picker";

export type DateFilterProps = {
  title: string;
  startParam?: string;
  endParam?: string;
  placeholder?: string;
};

export function DateFilter({
  title,
  startParam = "startDate",
  endParam = "endDate",
  placeholder = "Select date range",
}: DateFilterProps) {
  const { getSearchParams, updateSearchParams } = useSearchRouter();

  const startDateValue = getSearchParams("startDate")?.[0];
  const endDateValue = getSearchParams("endDate")?.[0];

  const dateRange: DateRange = {
    from: startDateValue ? new Date(startDateValue) : undefined,
    to: endDateValue ? new Date(endDateValue) : undefined,
  };

  const handleDateRangeChange = (range?: DateRange) => {
    updateSearchParams({
      [startParam]: range?.from?.toDateString(),
      [endParam]: range?.to?.toDateString(),
    });
  };

  return (
    <Card className="shadow-none rounded-xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <DateRangePicker
          variant="outline"
          placeholder={placeholder}
          defaultValue={dateRange}
          onChange={handleDateRangeChange}
        />
      </CardContent>
    </Card>
  );
}
