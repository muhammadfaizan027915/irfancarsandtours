import { CustoemrsTable } from "@icat/features";
import { getCustomers } from "@icat/web/data/uesrs";

export default async function DashboardPage() {
  const result = await getCustomers();
  const customers = result.data;
  
  return <CustoemrsTable customers={customers} />;
}
