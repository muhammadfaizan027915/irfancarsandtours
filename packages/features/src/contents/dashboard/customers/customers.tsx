import { GetUsersBodyDto } from "@icat/contracts";
import { getCustomers } from "@icat/web/data/users";
import { CustoemrsTable } from "@icat/features/dashboard/tables/customerstable";

export async function DashboardCustomersContent({ searchParams }: { searchParams: GetUsersBodyDto }) {
  const result = await getCustomers(searchParams);
  const customers = result.data;
  const pagination = result?.pagination;

  return <CustoemrsTable customers={customers} pagination={pagination} />;
}
