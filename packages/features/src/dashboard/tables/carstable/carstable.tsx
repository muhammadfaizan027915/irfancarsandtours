import { columns } from "./columns";
import { DataTable } from "@icat/ui";

export function CarsTable() {
  return <DataTable columns={columns} data={[]} />;
}
