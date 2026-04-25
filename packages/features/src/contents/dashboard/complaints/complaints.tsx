import { GetComplaintsQueryDto } from "@icat/contracts";
import { getComplaints } from "@icat/web/data/complaints";
import { ComplaintsTable } from "@icat/features/dashboard/tables/complaintstable";

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
