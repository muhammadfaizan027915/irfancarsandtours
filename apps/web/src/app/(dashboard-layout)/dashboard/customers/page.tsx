import { GetUsersBodyDto } from "@icat/contracts";
import { CustoemrsTable } from "@icat/features/dashboard/tables/customerstable";
import { getCustomers } from "@icat/web/data/uesrs";

type CustomersPageProps = {
  searchParams: Promise<GetUsersBodyDto>;
};

export default async function CustomersPage({
  searchParams,
}: CustomersPageProps) {
  const { page, limit } = await searchParams;

  const result = await getCustomers({ page, limit });
  const customers = result.data;
  const pagination = result?.pagination;

  return <CustoemrsTable customers={customers} pagination={pagination} />;
}
