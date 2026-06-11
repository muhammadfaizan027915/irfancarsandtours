"use client";

import { useOptimistic, useRef, useTransition } from "react";
import { toast } from "sonner";

import { BookingStatus, BookingStatusList } from "@icat/database/enums";
import { mergeObjectToFormData } from "@icat/lib/utils";
import { SingleSelect } from "@icat/ui";
import { updateBookingStatus } from "@icat/web/actions/bookings";

type BookingStatusSelectorProps = {
  id: string;
  status: BookingStatus;
  className?: string;
};

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
    if (!newStatus) return;

    startTransition(() => {
      setOptimisticStatus(newStatus as BookingStatus);
      setTimeout(() => {
        formRef.current?.requestSubmit();
      }, 0);
    });
  };

  const action = async (formData: FormData) => {
    const data = mergeObjectToFormData(formData, {
      id,
      status: optimisticStatus,
    });

    const result = await updateBookingStatus(null, data);
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
      <SingleSelect
        options={BookingStatusList}
        value={optimisticStatus}
        onChange={handleStatusChange}
        disabled={isPending}
        className={className}
      />
    </form>
  );
}
