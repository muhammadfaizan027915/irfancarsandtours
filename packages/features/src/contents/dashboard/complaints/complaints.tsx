import { GetComplaintsQueryDto } from "@icat/contracts";
import { ComplaintsTable } from "@icat/features/dashboard/tables/complaintstable";
import { getComplaints } from "@icat/web/data/complaints";

export async function DashboardComplaintsContent({
  searchParams,
}: {
  searchParams: GetComplaintsQueryDto;
}) {
  const result = await getComplaints(searchParams);
  const data = result?.data;
  const pagination = result?.pagination;

  return <ComplaintsTable data={data} pagination={pagination} />;
}
