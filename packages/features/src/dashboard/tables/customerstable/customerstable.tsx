import { DataTable } from "@icat/ui/components/data-table";

import { customersColumns } from "./columns";
import { CustomersTableProps } from "./customerstable.types";

export async function CustomersTable({ customers, pagination }: CustomersTableProps) {
  return <DataTable columns={customersColumns} data={customers} pagination={pagination} />;
}
