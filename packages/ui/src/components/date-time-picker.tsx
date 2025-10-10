"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@icat/ui/lib/utils";
import { Button } from "@icat/ui/components/button";
import { Calendar } from "@icat/ui/components/calendar";
import { Input } from "@icat/ui/components/input";
import { Label } from "@icat/ui/components/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@icat/ui/components/popover";

type DateTimePickerProps = {
  id?: string;
  name?: string;
  defaultValue?: string;
  errors?: string[];
};

export function DateTimePicker({
  id,
  name,
  defaultValue,
  errors,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  );
  const [time, setTime] = React.useState<string>(
    defaultValue
      ? new Date(defaultValue).toLocaleTimeString("en-GB")
      : "10:30:00"
  );

  const hasError = errors && errors.length > 0;

  const combinedValue = React.useMemo(() => {
    if (!date || !time) return "";
    const [h, m, s] = time.split(":").map(Number);
    const final = new Date(date);
    final.setHours(h, m, s ?? 0);
    return final.toISOString();
  }, [date, time]);

  return (
    <div className="flex flex-col gap-2 w-full">
      {name && <input type="hidden" name={name} value={combinedValue} />}

      <div className="flex gap-4">
        {/* Date Picker (50%) */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              id={id}
              type="button"
              aria-invalid={hasError ? "true" : undefined}
              className={cn(
                "flex h-11 w-full min-w-[50%] items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-base md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow]",
                "disabled:cursor-not-allowed disabled:opacity-50",
                hasError
                  ? "border-destructive text-destructive aria-invalid:ring-destructive/40"
                  : ""
              )}
            >
              {date ? date.toLocaleDateString() : "Select date"}
              <ChevronDownIcon className="ml-2 h-4 w-4 opacity-70" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(d) => {
                setDate(d);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>

        {/* Time Picker (50%) */}
        <Input
          type="time"
          step="1"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          aria-invalid={hasError ? "true" : undefined}
          className={cn(
            "h-11 w-full min-w-[50%]",
            "bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden",
            hasError ? "border-destructive text-destructive" : ""
          )}
        />
      </div>

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
