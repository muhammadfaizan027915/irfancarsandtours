"use client";

import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Calendar } from "@icat/ui/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@icat/ui/components/popover";
import { cn } from "@icat/ui/lib/utils";

type DateRangePickerProps = {
  id?: string;
  name?: string;
  placeholder?: string;
  errors?: string[];
  disabled?: boolean;
  onChange?: (dateRange: DateRange | undefined) => void;
  variant?: "default" | "outline";
  defaultValue?: {
    from?: string | Date;
    to?: string | Date;
  };
};

export function DateRangePicker({
  id,
  name,
  placeholder = "Pick a date range",
  defaultValue,
  errors,
  disabled = false,
  onChange,
  variant = "outline",
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: defaultValue?.from ? new Date(defaultValue.from) : undefined,
    to: defaultValue?.to ? new Date(defaultValue.to) : undefined,
  });

  const hasError = errors && errors.length > 0;

  const handleDateRangeChange = (range: DateRange | undefined) => {
    // Ensure we always have a valid DateRange object
    const validRange: DateRange = {
      from: range?.from,
      to: range?.to,
    };
    setDateRange(validRange);
    onChange?.(validRange);
  };

  const formatDateRange = () => {
    if (!dateRange.from && !dateRange.to) {
      return placeholder;
    }
    if (dateRange.from && !dateRange.to) {
      return format(dateRange.from, "MMM dd, yyyy");
    }
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "MMM dd")} - ${format(
        dateRange.to,
        "MMM dd, yyyy",
      )}`;
    }
    return placeholder;
  };

  const baseStyles = cn(
    "flex h-11 w-full min-w-[50%] items-center justify-between rounded-lg border px-3 py-2 text-base md:text-sm",
    "focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    {
      "border-border bg-background focus-visible:border-ring":
        variant === "default" && !hasError,
      "border-border dark:bg-input/30 focus-visible:border-ring":
        variant === "outline" && !hasError,
      "border-destructive text-destructive focus-visible:ring-destructive/40":
        hasError,
    },
  );

  const hiddenInputValue = React.useMemo(() => {
    if (!dateRange.from || !dateRange.to) return "";
    return JSON.stringify({
      from: dateRange.from.toISOString(),
      to: dateRange.to.toISOString(),
    });
  }, [dateRange]);

  return (
    <div className="flex flex-col gap-2 w-full">
      {name && <input type="hidden" name={name} value={hiddenInputValue} />}

      <Popover open={open && !disabled} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            disabled={disabled}
            aria-invalid={hasError ? "true" : undefined}
            className={baseStyles}
          >
            <span className="flex-1 text-left">{formatDateRange()}</span>
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-70 flex-shrink-0" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateRangeChange}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>

      {hasError && (
        <div className="text-sm text-destructive mt-1">
          {errors?.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </div>
      )}
    </div>
  );
}
