"use client";

import { useOptimistic, useRef, useTransition } from "react";
import { toast } from "sonner";

import { BookingStatus, BookingStatusList } from "@icat/database/enums";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@icat/ui";
import { updateBookingStatus } from "@icat/web/actions/bookings";

type BookingStatusSelectorProps = {
  id: string;
  status: BookingStatus;
  className?: string;
}

export function BookingStatusSelector({
  id,
  status,
  className,
}: BookingStatusSelectorProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    status,
    (_, newStatus: BookingStatus) => newStatus,
  );

  const handleStatusChange = (newStatus: string) => {
    startTransition(() => {
      setOptimisticStatus(newStatus as BookingStatus);
      setTimeout(() => {
        formRef.current?.requestSubmit();
      }, 0);
    });
  };

  const action = async (formData: FormData) => {
    const result = await updateBookingStatus(null, formData);
    if (result && !result.success) {
      toast.error(result.error?.message || "Failed to update booking status", {
        position: "top-center",
      });
    } else if (result?.success) {
      toast.success("Booking status updated successfully!", {
        position: "top-center",
      });
    }
  };

  return (
    <form ref={formRef} action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={optimisticStatus} />
      <Select
        value={optimisticStatus}
        onValueChange={handleStatusChange}
        disabled={isPending}
      >
        <SelectTrigger className={className}>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {BookingStatusList.map((s) => (
            <SelectItem key={s} value={s} className="capitalize text-xs">
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  );
}
