"use client";

import { ComplaintStatusSelector } from "@icat/features/dashboard/selectors/complaint-status-selector";

import { ComplaintCellProps } from "../columns.types";

export function StatusCell({ row }: ComplaintCellProps) {
  const { id, status } = row.original;

  return (
    <ComplaintStatusSelector
      id={id}
      status={status}
      className="w-[110px] h-8 text-xs capitalize"
    />
  );
}
