import { GetUsersBodyDto } from "@icat/contracts";
import { CustoemrsTable } from "@icat/features/dashboard/tables/customerstable";
import { getCustomers } from "@icat/web/data/users";

type DashboardCustomersContentProps = {
  searchParams: GetUsersBodyDto;
};

export async function DashboardCustomersContent({
  searchParams,
}: DashboardCustomersContentProps) {
  const result = await getCustomers(searchParams);
  const customers = result.data;
  const pagination = result?.pagination;

  return <CustoemrsTable customers={customers} pagination={pagination} />;
}
