import { GetComplaintsQueryDto } from "@icat/contracts";
import { ComplaintsTable } from "@icat/features/dashboard/tables/complaintstable";
import { getComplaints } from "@icat/web/data/complaints";

type DashboardComplaintsContentProps = {
  searchParams: GetComplaintsQueryDto;
};

export async function DashboardComplaintsContent({
  searchParams,
}: DashboardComplaintsContentProps) {
  const result = await getComplaints(searchParams);
  const data = result?.data;
  const pagination = result?.pagination;

  return <ComplaintsTable data={data} pagination={pagination} />;
}
