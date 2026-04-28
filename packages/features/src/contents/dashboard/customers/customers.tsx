import { GetUsersBodyDto } from "@icat/contracts";
import { CustoemrsTable } from "@icat/features/dashboard/tables/customerstable";
import { getCustomers } from "@icat/web/data/users";

export async function DashboardCustomersContent({ searchParams }: { searchParams: GetUsersBodyDto }) {
  const result = await getCustomers(searchParams);
  const customers = result.data;
  const pagination = result?.pagination;

  return <CustoemrsTable customers={customers} pagination={pagination} />;
}
