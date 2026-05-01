import { DataTable } from "@icat/ui/components/data-table";

import { complaintColumns } from "./columns";
import { ComplaintsTableProps } from "./complaintstable.types";

export function ComplaintsTable({ data, pagination }: ComplaintsTableProps) {
  return (
    <DataTable columns={complaintColumns} data={data} pagination={pagination} />
  );
}
