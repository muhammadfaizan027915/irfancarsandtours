"use client";

import { BookingStatusSelector } from "@icat/features/dashboard/selectors/booking-status-selector";

import { BookingCellProps } from "../columns.types";

export function StatusCell({ row }: BookingCellProps) {
  const { id, status } = row.original;

  return (
    <BookingStatusSelector
      id={id}
      status={status}
      className="w-[110px] h-8 text-xs capitalize"
    />
  );
}
