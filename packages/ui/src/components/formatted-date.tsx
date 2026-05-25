"use client";

import { format } from "date-fns";

interface FormattedDateProps {
  date: Date | string | number;
  formatStr: string;
  className?: string;
}

export function FormattedDate({
  date,
  formatStr,
  className,
}: FormattedDateProps) {
  return (
    <span className={className} suppressHydrationWarning>
      {format(new Date(date), formatStr)}
    </span>
  );
}
