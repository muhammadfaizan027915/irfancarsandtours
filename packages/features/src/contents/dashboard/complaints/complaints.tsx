import { GetComplaintsBodyDto } from "@icat/contracts";
import { ComplaintsTable } from "@icat/features/dashboard/tables/complaintstable";
import { getComplaints } from "@icat/web/data/complaints";

type DashboardComplaintsContentProps = {
  searchParams: GetComplaintsBodyDto;
};

export async function DashboardComplaintsContent({
  searchParams,
}: DashboardComplaintsContentProps) {
  const result = await getComplaints(searchParams);
  const complaints = result?.data;
  const pagination = result?.pagination;

  return <ComplaintsTable complaints={complaints} pagination={pagination} />;
}
