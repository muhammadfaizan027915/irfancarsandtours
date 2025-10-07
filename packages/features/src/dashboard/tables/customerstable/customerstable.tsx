import { auth } from "@icat/lib";
import { customersColumns } from "./columns";
import { DataTable } from "@icat/ui";
import { UserService } from "@icat/services";

export async function CustoemrsTable() {
  const session = await auth();

  if (!session?.user?.email) return <p>Not authenticated</p>;

  const userService = new UserService();
  const response = await userService.getAll();

  const cars = response?.data || [];

  return <DataTable columns={customersColumns} data={cars} />;
}
