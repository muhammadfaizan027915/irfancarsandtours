"use client";

import { TourBookingStatusSelector } from "@icat/features/dashboard/selectors/tour-booking-status-selector";

import { TourBookingCellProps } from "../columns.types";

export function StatusCell({ row }: TourBookingCellProps) {
  const { id, status } = row.original;

  return (
    <TourBookingStatusSelector
      id={id}
      status={status}
      className="w-[110px] h-8 text-xs capitalize"
    />
  );
}
