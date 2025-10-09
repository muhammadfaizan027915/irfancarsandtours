import { DataTable } from "@icat/ui";
import { customersColumns } from "./columns";
import { CustomersTableProps } from "./customerstable.types";

export async function CustoemrsTable({ customers }: CustomersTableProps) {
  return <DataTable columns={customersColumns} data={customers} />;
}
