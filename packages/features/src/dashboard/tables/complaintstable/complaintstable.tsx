import { DataTable } from "@icat/ui/components/data-table";

import { complaintColumns } from "./columns";
import { ComplaintsTableProps } from "./complaintstable.types";

export function ComplaintsTable({ complaints, pagination }: ComplaintsTableProps) {
  return (
    <DataTable columns={complaintColumns} data={complaints} pagination={pagination} />
  );
}
