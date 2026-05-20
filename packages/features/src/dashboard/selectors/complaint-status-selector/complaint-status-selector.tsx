"use client";

import { useOptimistic, useRef, useTransition } from "react";
import { toast } from "sonner";

import { ComplaintStatus, ComplaintStatusList } from "@icat/database/enums";
import { SingleSelect } from "@icat/ui";
import { updateComplaintStatus } from "@icat/web/actions/complaints";

type ComplaintStatusSelectorProps = {
  id: string;
  status: ComplaintStatus;
  className?: string;
};

export function ComplaintStatusSelector({
  id,
  status,
  className,
}: ComplaintStatusSelectorProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    status,
    (_, newStatus: ComplaintStatus) => newStatus,
  );

  const handleStatusChange = (newStatus: string) => {
    startTransition(() => {
      setOptimisticStatus(newStatus as ComplaintStatus);
      setTimeout(() => {
        formRef.current?.requestSubmit();
      }, 0);
    });
  };

  const action = async (formData: FormData) => {
    const result = await updateComplaintStatus(null, formData);
    if (result && !result.success) {
      toast.error(
        result.error?.message || "Failed to update complaint status",
        {
          position: "top-center",
        },
      );
    } else if (result?.success) {
      toast.success("Complaint status updated successfully!", {
        position: "top-center",
      });
    }
  };

  return (
    <form ref={formRef} action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={optimisticStatus} />

      <SingleSelect
        name="status"
        options={ComplaintStatusList}
        value={optimisticStatus}
        onChange={handleStatusChange}
        disabled={isPending}
        className={className}
      />
    </form>
  );
}
