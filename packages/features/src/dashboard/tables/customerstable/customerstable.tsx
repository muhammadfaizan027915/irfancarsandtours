import { DataTable } from "@icat/ui";
import { customersColumns } from "./columns";
import { CustomersTableProps } from "./customerstable.types";

export async function CustoemrsTable({ customers, pagination }: CustomersTableProps) {
  return <DataTable columns={customersColumns} data={customers} pagination={pagination} />;
}
